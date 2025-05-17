package teamchmod.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teamchmod.backend.model.Budget;
import teamchmod.backend.model.dto.BudgetDTO;
import teamchmod.backend.repositories.BudgetRepository;
import teamchmod.backend.repositories.TransactionRepository;
import java.util.*;

@Service
public class BudgetService {

    @Autowired
    BudgetRepository budgetRepository;
    @Autowired
    TransactionRepository transactionRepository;

    /*Patrick*/
    public List<BudgetDTO> getAllBudget() {
        List<Budget> list = budgetRepository.findAll();
        List<BudgetDTO> listDTO = new ArrayList<>();

        for (Budget b : list) {
            BudgetDTO bdto = new BudgetDTO();

            bdto.setId(b.getId());
            bdto.setCategorie(b.getCategorie());
            bdto.setType(b.getType());
            bdto.setDate(b.getDate());
            bdto.setMontant(b.getMontant());

            listDTO.add(bdto);
        }
        return listDTO;
    }

    /*Patrick*/
    public Set<String> getAllUniqueTypes() {
        List<Budget> list = budgetRepository.findAll();
        Set<String> typesList = new HashSet<>();

        for (Budget b : list) {
            typesList.add(b.getType());
        }
        return typesList;
    }

    /*Patrick*/
    public Set<String> getAllUniqueCategories() {
        List<Budget> list = budgetRepository.findAll();
        Set<String> categoriesList = new HashSet<>();

        for (Budget b : list) {
            categoriesList.add(b.getCategorie());
        }
        return categoriesList;
    }

    /*Patrick*/
    public Budget addBudget(String type) {
        Budget budget = new Budget();
        budget.setType(type);
        budgetRepository.save(budget);
        return budget;
    }

    /*Patrick*/
    public Budget modMontantBudget(double modMontant, int id) {
        Budget budget = budgetRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Budget # " + id + " introuvable."));
        budget.setMontant(modMontant);
        return budgetRepository.save(budget);
    }

    /*Patrick*/
    public Budget modCategorieBudget(String modCat, int id) {
        Budget budget = budgetRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Budget # " + id + " introuvable."));
        budget.setCategorie(modCat);
        return budgetRepository.save(budget);
    }

    /*Patrick*/
    public void deleteBudget(int id) {
        if (id != 1) {
            budgetRepository.deleteById(id);
        }
    }
}
