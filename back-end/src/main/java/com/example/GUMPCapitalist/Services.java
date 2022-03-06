package com.example.GUMPCapitalist;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import static javax.xml.bind.JAXBContext.newInstance;

public class Services {

    World readWorldFromXml(String username) throws JAXBException {
        World world = new World();
        try {
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            InputStream inputWorldUser = getClass().getClassLoader().getResourceAsStream(username+"-world.xml");
            world = (World) u.unmarshal(inputWorldUser);
        } catch (Exception e) {
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            InputStream inputWorldInitial = getClass().getClassLoader().getResourceAsStream("world.xml");
            world = (World) u.unmarshal(inputWorldInitial);
        }
        return world;
    }

    void saveWorldToXml(World world){
        try{
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Marshaller m = cont.createMarshaller();
            OutputStream output = new FileOutputStream("world.xml");
            m.marshal(world, output);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    World getWorld(String username) throws JAXBException {
        World world = readWorldFromXml(username);
        return world;
    }
}
