package com.example.GUMPCapitalist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.JAXBException;

@SpringBootApplication
public class GumpCapitalistApplication {

	public static void main(String[] args) throws JAXBException {
		SpringApplication.run(GumpCapitalistApplication.class, args);

		World world = new World();
		Services service = new Services();
		world = service.readWorldFromXml("Jules");
		System.out.println(world);
	}

}
