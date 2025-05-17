package teamchmod.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import teamchmod.backend.model.Actifs;
import teamchmod.backend.model.dto.ActifsDTO;
import teamchmod.backend.service.ActifsService;
import java.util.List;

@RestController
@RequestMapping("/api/actifs")
@CrossOrigin()
public class ActifsController {

    // Ajouter user id une fois les logins sessions fonctionnels
    @Autowired
    ActifsService actifsService;

    /*Patrick*/
    @GetMapping("/getActifs")
    public List<ActifsDTO> getAll() {
        return actifsService.getAllActifs();
    }

    /*Patrick*/
    @GetMapping("/getValeurNette")
    public String getValeurNette() {
        return actifsService.getValeurNette();
    }

    /*Patrick*/
    @PostMapping("/addActif/{type}")
    public Actifs addActif(@PathVariable String type) {
        return actifsService.addActif(type);
    }

    /*Patrick*/
    // !! Méthodes de modifications: À refaire?
    //     en une seule méthode avec variables d'URL /{type}/{id}?
    @PutMapping("/modActifNom/{id}")
    public Actifs modActifNom(@RequestBody ActifsDTO modActif, @PathVariable int id) {
        String modNom = modActif.getNom();
        return actifsService.modActifNom(modNom, id);
    }

    /*Patrick*/
    @PutMapping("/modActifTotal/{id}")
    public Actifs modActifMontant(@RequestBody ActifsDTO modActif, @PathVariable int id) {
        double modMontant = modActif.getMontant();
        return actifsService.modActifMontant(modMontant, id);
    }

    /*Patrick*/
    @DeleteMapping("/deleteActif/{id}")
    public void deleteActif(@PathVariable int id) {
        actifsService.deleteActif(id);
    }
}