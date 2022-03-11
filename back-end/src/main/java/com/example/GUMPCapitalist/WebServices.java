package com.example.GUMPCapitalist;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.JAXBException;

@RestController
    @RequestMapping("gumpcapitalist/generic")
    @CrossOrigin
    public class WebServices {
        Services services;
        public WebServices() {
            services = new Services();
        }

        @GetMapping(value = "world", produces = {
                "application/xml", "application/json"})
        public ResponseEntity<World> getWorld(@RequestHeader(value = "X-User",
                required = false) String username) throws JAXBException {
            World world = services.getWorld(username);
            return ResponseEntity.ok(world);
        }

        @PutMapping(value = "/product", produces = "application/json")
        public ProductType putProduct(@RequestHeader(value = "X-User", required = false) String username,@RequestBody ProductType produit) throws JAXBException{
            Boolean majFaite = services.updateProduct(username,produit);
            if (majFaite){
                return produit;
            }
            else{
                return null;
            }
        }

        @PutMapping(value = "/manager", produces = "application/json")
        public PallierType putManager (@RequestHeader(value = "X-User", required = false) String username,@RequestBody PallierType manager) throws JAXBException{
            Boolean majFaite = services.updateManager(username,manager);
            if (majFaite){
                return manager;
            }
            else{
                return null;
            }
        }
        @PutMapping(value = "/upgrade", produces = "application/json")
        public PallierType putUpgrade (@RequestHeader(value = "X-User", required = false) String username,@RequestBody PallierType upgrade) throws JAXBException{
            Boolean majFaite = services.updateUpgrades(username,upgrade);
            if (majFaite){
                return upgrade;
            }
            else{
                return null;
            }
        }

    @DeleteMapping(value="/world",produces = "application/json")
    ResponseEntity<World> deleteWorld(@RequestBody String username) throws JAXBException {
            World world = services.deleteWorld(username);
            return ResponseEntity.ok(world);
        }

    @PutMapping(value = "/angelupgrade", produces = "application/json")
    public PallierType angelUpgrade (@RequestHeader(value = "X-User", required = false) String username,@RequestBody PallierType angelUpgrade) throws JAXBException{
        Boolean majFaite = services.updateAngelUpgrades(username,angelUpgrade);
        if (majFaite){
            return angelUpgrade;
        }
        else{
            return null;
        }
    }

    }
