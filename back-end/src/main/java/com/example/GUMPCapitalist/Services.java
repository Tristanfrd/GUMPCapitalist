package com.example.GUMPCapitalist;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;
import java.util.List;

import static javax.xml.bind.JAXBContext.newInstance;

public class Services {
    World readWorldFromXml(String username) throws JAXBException {
        World world = new World();
        try {
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            InputStream inputWorldUser = new FileInputStream(username+"-world.xml");
            world = (World) u.unmarshal(inputWorldUser);
        } catch (Exception e) {
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            InputStream inputWorldInitial = getClass().getClassLoader().getResourceAsStream("world.xml");
            world = (World) u.unmarshal(inputWorldInitial);
        }
        return world;
    }

    void saveWorldToXml(World world, String username){
        try{
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Marshaller m = cont.createMarshaller();
            OutputStream output = new FileOutputStream(username+"-world.xml");
            m.marshal(world, output);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    World getWorld(String username) throws JAXBException {
        World world = readWorldFromXml(username);
        updateScore(world);
        saveWorldToXml(world,username);
        return world;
    }

    public void updateScore(World world){
        long tempsEcoule = System.currentTimeMillis() - world.getLastupdate();
        double newScore = world.getScore();
        ProductsType produits = world.getProducts();
        for (ProductType p : produits.getProduct()){
            if(p.isManagerUnlocked()){
                long quotient = tempsEcoule/p.getVitesse(); // divisé par zéro et c'est faux! attention!
                long reste = tempsEcoule%p.getVitesse();
                if (quotient >0){
                    newScore += Math.round(p.getRevenu() *(p.getQuantite() +quotient)*(1+ (world.getAngelbonus()/100* world.getActiveangels())));
                    world.setScore(newScore);
                    p.setTimeleft(reste);
                }else{
                    p.setTimeleft(reste);
                }
            }else{
                if(p.getTimeleft() != 0 && p.getTimeleft()<tempsEcoule){
                    newScore += Math.round(p.getRevenu() *p.getQuantite()*(1+ (world.getAngelbonus()/100* world.getActiveangels())));
                    world.setScore(newScore);
                }else{
                    p.setTimeleft(p.getTimeleft()-tempsEcoule);
                }
            }
        }
        world.setMoney(world.getMoney()+newScore);
        world.setLastupdate(System.currentTimeMillis());
    }

    public ProductType findProductById(World world, int id) {
        ProductsType produits = world.getProducts();
        for (ProductType pdt : produits.product) {
            if (pdt.getId() == id) {
                return pdt;
            }
        }
        return null;
    }

    public PallierType findManagerByName(World world, String name){
        PalliersType managers = world.getManagers();
        for (PallierType man : managers.getPallier()){
            if (name.equals(man.getName())){
                return man;
            }
        }
        return null;
    }

    public PallierType findUpgradeByName(World world, String name) {
        PalliersType upgrades = world.getUpgrades();
        for (PallierType upgrade : upgrades.getPallier()) {
            if (name.equals(upgrade.getName())) {
                return upgrade;
            }
        }
        return null;
    }

    public PallierType findAngelByName(World world, String name) {
        PalliersType angels = world.getAngelupgrades();
        for (PallierType angel : angels.getPallier()) {
            if (name.equals(angel.getName())) {
                return angel;
            }
        }
        return null;
    }

    public double calculerCroissance (ProductType produit, int qte){
        double cout = produit.getCout() * ((1 - Math.pow(produit.getCroissance(), qte)) / (1 - produit.getCroissance()));
        return cout;
    }

    // prend en paramètre le pseudo du joueur et le produit
    // sur lequel une action a eu lieu (lancement manuel de production ou // achat d’une certaine quantité de produit)
    // renvoie false si l’action n’a pas pu être traitée
    public Boolean updateProduct(String username, ProductType newproduct) throws JAXBException {
        // aller chercher le monde qui correspond au joueur
        World world = getWorld(username);
        // trouver dans ce monde, le produit équivalent à celui passé en paramètre
        ProductType product = findProductById(world, newproduct.getId());
        if (product == null) {
            return false;
        }
        // calculer la variation de quantité. Si elle est positive c'est
        // que le joueur a acheté une certaine quantité de ce produit
        // sinon c’est qu’il s’agit d’un lancement de production.
        int qtchange = newproduct.getQuantite() - product.getQuantite();
        if (qtchange > 0) {
            // soustraire de l'argent du joueur le cout de la quantité
            // achetée et mettre à jour la quantité de product
            Double cout = calculerCroissance(product,qtchange);
            product.setQuantite(newproduct.getQuantite());
            world.setMoney(world.getMoney()-cout);
            product.setCout(product.getCout() * Math.pow(product.getCroissance(), qtchange));
            PalliersType palliersType = product.getPalliers();
            List<PallierType> liste_palliers = palliersType.getPallier();
            for (PallierType pallier: liste_palliers){
                if (product.getQuantite() >= pallier.getSeuil() && !pallier.isUnlocked()){
                    pallier.setUnlocked(true);
                    if (pallier.getTyperatio() == TyperatioType.VITESSE){
                        product.setVitesse((int) (product.getVitesse() / pallier.getRatio()));
                        product.setTimeleft((long) (product.getTimeleft() / pallier.getRatio()));
                    }
                    else if (pallier.getTyperatio() == TyperatioType.GAIN){
                        product.setRevenu(product.getRevenu() * pallier.getRatio());
                    }
                }
            }
        }else{
            // initialiser product.timeleft à product.vitesse // pour lancer la production
            product.setTimeleft(product.getVitesse());
            world.setMoney(world.getMoney()+ (product.getRevenu()* product.getQuantite()));
            world.setScore(world.getScore()+ world.getMoney());
            System.out.println("Quantité "+product.getQuantite()+"    Revenu "+product.getRevenu()+"    monnaie "+world.getMoney());
        }
        // sauvegarder les changements du monde
        world.setLastupdate(System.currentTimeMillis());
        saveWorldToXml(world,username);
        return true;
    }
    // prend en paramètre le pseudo du joueur et le manager acheté.
    // renvoie false si l’action n’a pas pu être traitée
    public Boolean updateManager(String username, PallierType newmanager) throws JAXBException {
        // aller chercher le monde qui correspond au joueur
        World world = getWorld(username);
        // trouver dans ce monde, le manager équivalent à celui passé
        // en paramètre
        PallierType manager = findManagerByName(world, newmanager.getName());
        if (manager == null) {
            System.out.println("manager non trouvé");
            return false;
        }
        // débloquer ce manager
        manager.setUnlocked(true);
        // trouver le produit correspondant au manager
        ProductType product = findProductById(world, manager.getIdcible());
        if (product == null) {
            return false;
        }
        // débloquer le manager de ce produit
        product.setManagerUnlocked(true);
        // soustraire de l'argent du joueur le cout du manager
        world.setMoney(world.getMoney() - manager.getSeuil());
        // sauvegarder les changements au monde
        world.setLastupdate(System.currentTimeMillis());
        saveWorldToXml(world, username);
        return true;
    }

    public void verifUpgrade(PallierType unlock, ProductType produit){
        unlock.setUnlocked(true);
        if (unlock.getTyperatio().value() == TyperatioType.VITESSE.value()){
            produit.setTimeleft(produit.getTimeleft()/Double.valueOf(unlock.getRatio()).longValue());
            produit.setVitesse(produit.getVitesse()/(Double.valueOf(unlock.getRatio()).intValue()));
        }else if (unlock.getTyperatio().value() == TyperatioType.GAIN.value()){
            produit.setRevenu(produit.getRevenu()*unlock.getRatio());
        }
    }

    public Boolean updateUpgrades(String username, PallierType newUpgrade) throws JAXBException {
        World world = getWorld(username);
        PallierType upgrade = findUpgradeByName(world, newUpgrade.getName());
        if(upgrade ==null){
            return false;
        }
        upgrade.setUnlocked(true);
        ProductType produit = findProductById(world, upgrade.getIdcible());
        if(produit == null){
            return false;
        }
        world.setMoney(world.getMoney()-upgrade.getSeuil());
        verifUpgrade(upgrade,produit);
        world.setLastupdate(System.currentTimeMillis());
        saveWorldToXml(world,username);
        return true;
    }
    public World deleteWorld(String username)throws JAXBException{
        World world = getWorld(username);
        double angesGagnes = Math.round(150 * Math.sqrt((world.getScore())/Math.pow(10,15)) - world.getTotalangels());
        double score = world.getScore();
        double angesActifs = world.getActiveangels()+angesGagnes;
        double totalAnges = world.getTotalangels()+angesGagnes;
        JAXBContext cont = JAXBContext.newInstance(World.class);
        Unmarshaller u = cont.createUnmarshaller();
        InputStream inputWorldInitial = getClass().getClassLoader().getResourceAsStream("world.xml");
        world = (World) u.unmarshal(inputWorldInitial);
        world.setTotalangels(totalAnges);
        world.setActiveangels(angesActifs);
        world.setScore(score);
        world.setMoney(0);
        System.out.println("Je passe là mais jsp où est le pb");
        saveWorldToXml(world,username);
        return world;
    }

    public Boolean updateAngelUpgrades(String username, PallierType newAngelUpgrade) throws JAXBException {
        World world = getWorld(username);
        PallierType angel = findAngelByName(world, newAngelUpgrade.getName());
        if(angel == null){
            return false;
        }
        angel.setUnlocked(true);
        double anges = world.getActiveangels()- angel.getSeuil();
        if (angel.getTyperatio().value() == TyperatioType.ANGE.value()){
            world.setAngelbonus(world.getAngelbonus()+Double.valueOf(angel.getRatio()).intValue());
        }else{
            updateUpgrades(username,angel);
        }
        world.setActiveangels(anges);
        world.setLastupdate(System.currentTimeMillis());
        saveWorldToXml(world,username);
        return true;
    }

}
