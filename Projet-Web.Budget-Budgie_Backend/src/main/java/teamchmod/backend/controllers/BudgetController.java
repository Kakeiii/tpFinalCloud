package teamchmod.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import teamchmod.backend.model.Budget;
import teamchmod.backend.model.dto.BudgetDTO;
import teamchmod.backend.service.BudgetService;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin()
public class BudgetController {

    @Autowired
    BudgetService budgetService;

    /*Patrick*/
    @GetMapping("/getBudget")
    public List<BudgetDTO> getAll() {
        return budgetService.getAllBudget();
    }

    /*Patrick*/
    @GetMapping("/getUniqueTypes")
    public Set<String> getUniqueTypes() {
        return budgetService.getAllUniqueTypes();
    }

    /*Patrick*/
    @GetMapping("/getUniqueCategories")
    public Set<String> getUniqueCategories() {
        return budgetService.getAllUniqueCategories();
    }

    /*Patrick*/
    @PostMapping("/addBudget/{type}")
    public Budget addBudget(@PathVariable String type) {
        return budgetService.addBudget(type);
    }

    /*Patrick*/
    @PutMapping("/modMontantBudget/{id}")
    public Budget modMontantBudget(@RequestBody BudgetDTO modBudget, @PathVariable int id) {
        double modMontant = modBudget.getMontant();
        return budgetService.modMontantBudget(modMontant, id);
    }

    /*Patrick*/
    @PutMapping("/modCategorieBudget/{id}")
    public Budget modCategorieBudget(@RequestBody BudgetDTO modBudget, @PathVariable int id) {
        String modCat = modBudget.getCategorie();
        return budgetService.modCategorieBudget(modCat, id);
    }


    /*Patrick*/
    @DeleteMapping("/deleteBudget/{id}")
    public void deleteBudget(@PathVariable int id) {
        budgetService.deleteBudget(id);
    }
}
