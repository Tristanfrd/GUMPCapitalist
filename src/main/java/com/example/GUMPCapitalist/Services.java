package com.example.GUMPCapitalist;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import static javax.xml.bind.JAXBContext.newInstance;

public class Services {

    World readWorldFromXml() {
        World world = new World();
        try {
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            InputStream input = getClass().getClassLoader().getResourceAsStream("world.xml");
            world = (World) u.unmarshal(input);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return world;
    }

    void saveWorldToXml(World world){
        //OutputStream output = new FileOutputStream(file);
        try{
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Marshaller m = cont.createMarshaller();
            m.marshal(world, new File("world.xml"));
    } catch (Exception e) {
        e.printStackTrace();
    }
    }

    World getWorld(){
        World world = readWorldFromXml();
        return world;
    }
}
