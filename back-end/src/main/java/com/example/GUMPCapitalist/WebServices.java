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

    @PutMapping(value = "/product", consumes = {
            "application/xml", "application/json"})
    public ProductType putProduct(@RequestHeader(value = "X-User", required = false) String username, @RequestBody ProductType produit) throws JAXBException {
        Boolean majFaite = services.updateProduct(username, produit);
        if (majFaite) {
            return produit;
        } else {
            return null;
        }
    }

    @PutMapping(value = "/manager", consumes = {"application/xml", "application/json"})
    public PallierType putManager(@RequestHeader(value = "X-User", required = false) String username, @RequestBody PallierType manager) throws JAXBException {
        services.updateManager(username, manager);
        return manager;

    }

    @PutMapping(value = "/upgrade", consumes = {
            "application/xml", "application/json"})
    public PallierType putUpgrade(@RequestHeader(value = "X-User", required = false) String username, @RequestBody PallierType upgrade) throws JAXBException {
        services.updateUpgrades(username, upgrade);
        return upgrade;
    }

    @DeleteMapping(value = "/world", consumes = {
            "application/xml", "application/json"})
    ResponseEntity<World> deleteWorld(@RequestHeader(value = "X-User", required = false) String username) throws JAXBException {
        World world = services.getWorld(username);
        services.deleteWorld(username);
        return ResponseEntity.ok(world);
    }

    @PutMapping(value = "/angelupgrade", consumes = {
            "application/xml", "application/json"})
    public PallierType angelUpgrade(@RequestHeader(value = "X-User", required = false) String username, @RequestBody PallierType angelUpgrade) throws JAXBException {
        services.updateAngelUpgrades(username, angelUpgrade);
        return angelUpgrade;
    }

}
