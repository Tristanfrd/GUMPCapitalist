package com.example.GUMPCapitalist;

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

    }
