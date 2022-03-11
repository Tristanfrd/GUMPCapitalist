package com.example.GUMPCapitalist;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;

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
        World updatedWorld = updateScore(world);
        saveWorldToXml(updatedWorld,username);
        return world;
    }

    public World updateScore(World world){
        long tempsEcoule = System.currentTimeMillis() - world.getLastupdate();
        double newScore = world.getScore();
        World updatedWorld = world;
        ProductsType produits = world.getProducts();
        for (ProductType p : produits.getProduct()){
            if(p.isManagerUnlocked()){
                long quotient = tempsEcoule/p.getVitesse(); // divisé par zéro et c'est faux! attention!
                long reste = tempsEcoule%p.getVitesse();
                newScore += p.getRevenu() * quotient;
                p.setTimeleft(p.getTimeleft()-reste);
            }else{
                if(p.getTimeleft() != 0 && p.getTimeleft()<tempsEcoule){
                    newScore += p.getRevenu();
                }else{
                    p.setTimeleft(p.getTimeleft()-tempsEcoule);
                }
            }
        }
        updatedWorld.setScore(newScore);
        updatedWorld.setLastupdate(System.currentTimeMillis());
        return updatedWorld;
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
            if (man.getName()==name){
                return man;
            }
        }
        return null;
    }

        // prend en paramètre le pseudo du joueur et le produit
        // sur lequel une action a eu lieu (lancement manuel de production ou // achat d’une certaine quantité de produit)
        // renvoie false si l’action n’a pas pu être traitée
    public Boolean updateProduct(String username, ProductType newproduct) throws JAXBException {
        // aller chercher le monde qui correspond au joueur
        World world = getWorld(username);
        PalliersType allUnlocks = world.getAllunlocks();
        ProductsType produits = world.getProducts();
        // trouver dans ce monde, le produit équivalent à celui passé en paramètre
        ProductType product = findProductById(world, newproduct.getId());
        PalliersType seuils = product.getPalliers();
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
            for (PallierType seuil : seuils.getPallier()){
                if (product.getQuantite() < seuil.getSeuil() && seuil.getSeuil() <= newproduct.getQuantite() && !(seuil.isUnlocked()) ){
                    if (seuil.getTyperatio().value() == TyperatioType.VITESSE.value()){
                        product.setTimeleft(product.getTimeleft()/  Double.valueOf(seuil.getRatio()).longValue());
                        product.setVitesse(product.getVitesse()/ Double.valueOf(seuil.getRatio()).intValue());
                    }else if (seuil.getTyperatio().value() == TyperatioType.GAIN.value()){
                        product.setRevenu(product.getRevenu()*seuil.getRatio());
                    }
                    seuil.setUnlocked(true);
                }
            }
            for (PallierType unlock : allUnlocks.getPallier()){
                int seuil = unlock.getSeuil();
                int compteurProduit = 0;
                int comparateurProduit = 0;
                for (ProductType produit : produits.getProduct()){
                    if (produit.getQuantite() >= seuil){
                        comparateurProduit +=1;
                    }
                    compteurProduit +=1;
                }
                if (comparateurProduit == compteurProduit && !(unlock.isUnlocked())){
                    for (ProductType produit : produits.getProduct()){
                        if (unlock.getTyperatio().value() == TyperatioType.VITESSE.value()){
                            produit.setTimeleft(product.getTimeleft()/Double.valueOf(unlock.getRatio()).longValue());
                            produit.setVitesse(product.getVitesse()/(Double.valueOf(unlock.getRatio()).intValue()));
                        }else if (unlock.getTyperatio().value() == TyperatioType.GAIN.value()){
                            produit.setRevenu(product.getRevenu()*unlock.getRatio());
                        }
                        unlock.setUnlocked(true);
                    }
                }
            }
            world.setMoney(world.getMoney() - ((product.getCout()*(1- Math.pow(product.getCroissance(), qtchange)))/1-product.getCroissance()));
            product.setQuantite(product.getQuantite()+qtchange);
        } else if (product.getQuantite()==1){
            world.setMoney(world.getMoney()+ product.getRevenu()* product.getQuantite()*(1+ world.getAngelbonus()/100* world.getActiveangels()));
            product.setTimeleft(product.getVitesse());
        // initialiser product.timeleft à product.vitesse // pour lancer la production
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
        // trouver dans ce monde, le manager équivalent à celui passé
        // en paramètre
        PallierType manager = findManagerByName(world, newmanager.getName());
        if (manager == null) {
            return false;
        }
        // débloquer ce manager
        // trouver le produit correspondant au manager
        ProductType product = findProductById(world, manager.getIdcible());
        if (product == null) {
            return false;
        }
        // débloquer le manager de ce produit
        // soustraire de l'argent du joueur le cout du manager
        // sauvegarder les changements au monde
        manager.setUnlocked(true);
        world.setMoney(world.getMoney() - manager.getSeuil());
        world.setLastupdate(System.currentTimeMillis());
        saveWorldToXml(world,username);
        return true;
    }
    public Boolean updateUpgrades(String username, PallierType newUpgrade) throws JAXBException {
        World world = getWorld(username);
        ProductType product = findProductById(world, newUpgrade.getIdcible());
        if (product == null) {
            return false;
        }
        if (world.getMoney()>= newUpgrade.getSeuil() && !(newUpgrade.isUnlocked())){
            if (newUpgrade.getTyperatio().value() == TyperatioType.VITESSE.value()){
                product.setTimeleft(product.getTimeleft()/Double.valueOf(newUpgrade.getRatio()).longValue());
                product.setVitesse(product.getVitesse()/(Double.valueOf(newUpgrade.getRatio()).intValue()));
            }else if (newUpgrade.getTyperatio().value() == TyperatioType.GAIN.value()){
                product.setRevenu(product.getRevenu()*newUpgrade.getRatio());
            }
            newUpgrade.setUnlocked(true);
        }
        world.setLastupdate(System.currentTimeMillis());
        saveWorldToXml(world,username);
        return true;
    }
    public World deleteWorld(String username)throws JAXBException{
        World worldReset = new World();
        try{
            World world = getWorld(username);
            double angesGagnes = 150 * Math.sqrt((world.getScore())/Math.pow(10,15)) - world.getTotalangels();
            double score = world.getScore();
            double angesActifs = world.getActiveangels()+angesGagnes;
            double totalAnges = world.getTotalangels()+angesGagnes;
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            InputStream inputWorldInitial = getClass().getClassLoader().getResourceAsStream("world.xml");
            worldReset = (World) u.unmarshal(inputWorldInitial);
            worldReset.setTotalangels(totalAnges);
            worldReset.setActiveangels(angesActifs);
            worldReset.setScore(score);
            saveWorldToXml(worldReset,username);
        }catch(Exception e){
        }
        return worldReset;
    }

    public Boolean updateAngelUpgrades(String username, PallierType newAngelUpgrade) throws JAXBException {
        World world = getWorld(username);
        if (world.getActiveangels()>= newAngelUpgrade.getSeuil() && !(newAngelUpgrade.isUnlocked())){
            world.setActiveangels(world.getActiveangels()-newAngelUpgrade.getSeuil());
            world.setAngelbonus(world.getAngelbonus()+ Double.valueOf(newAngelUpgrade.getRatio()).intValue());
            newAngelUpgrade.setUnlocked(true);
        }
        world.setLastupdate(System.currentTimeMillis());
        saveWorldToXml(world,username);
        return true;
    }

}
