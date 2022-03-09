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
            world.setMoney(world.getMoney() - ((product.getCout()*(1- Math.pow(product.getCroissance(), qtchange)))/1-product.getCroissance()));
            product.setQuantite(product.getQuantite()+qtchange);
        } else {
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

}
