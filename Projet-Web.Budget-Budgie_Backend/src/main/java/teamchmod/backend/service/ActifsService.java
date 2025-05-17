package teamchmod.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teamchmod.backend.model.Actifs;
import teamchmod.backend.model.dto.ActifsDTO;
import teamchmod.backend.repositories.ActifsRepository;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActifsService {

    @Autowired
    ActifsRepository actifsRepository;

    /*Patrick*/
    public List<ActifsDTO> getAllActifs() {
        List<Actifs> list = actifsRepository.findAll();
        List<ActifsDTO> listDTO = new ArrayList<>();

        for (Actifs a : list) {
            ActifsDTO adto = new ActifsDTO();

            adto.setId(a.getId());
            adto.setType(a.getType());
            adto.setNom(a.getNom());
            adto.setMontant(a.getMontant());
            adto.setMontant(a.getMontant());

            listDTO.add(adto);
        }
        return listDTO;
    }

    /*Patrick*/
    public Actifs addActif(String type) {
        Actifs actif = new Actifs();
        actif.setType(type);
        actifsRepository.save(actif);
        return actif;
    }

    /*Patrick*/
    public Actifs modActifNom(String modNom, int id) {
        Actifs actif = actifsRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Actif #" + id + " introuvable."));
        actif.setNom(modNom);
        return actifsRepository.save(actif);
    }

    /*Patrick*/
    public Actifs modActifMontant(double modMontant, int id) {
        Actifs actif = actifsRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Actif #" + id + " introuvable."));
        actif.setMontant(modMontant);
        return actifsRepository.save(actif);
    }

    /*Patrick*/
    public void deleteActif(int id) {
        actifsRepository.deleteById(id);
    }

    /*Patrick*/
    public String getValeurNette() {
        List<Actifs> list = actifsRepository.findAll();
        double total = 0;

        for (Actifs c : list) {
            total += c.getMontant();
        }
        return String.format("%.2f", total);
    }
}
