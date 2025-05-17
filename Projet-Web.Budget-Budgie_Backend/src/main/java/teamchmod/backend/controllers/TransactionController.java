package teamchmod.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import teamchmod.backend.model.Transactions;
import teamchmod.backend.model.dto.TransactionsDTO;
import teamchmod.backend.service.TransactionService;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin()
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    /*Patrick*/
    @GetMapping("/getAllTransactions")
    public List<TransactionsDTO> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    /*Patrick*/
    @PostMapping("/addTransaction")
    public Transactions addTransaction() {
        return transactionService.addTransaction();
    }

    /*Patrick*/
    @GetMapping("/getTotalByCategorie")
    public HashMap<String, Double> getTotal() {
        return transactionService.getTotalByCategorie();
    }

    /*Patrick*/
    @DeleteMapping("/deleteTransaction/{id}")
    public void deleteTransaction(@PathVariable int id) {
        transactionService.deleteTransaction(id);
    }

    /*Ta Anh & Patrick*/
    @PutMapping("/modTransactionMontant/{id}")
    public Transactions modTransactionMontant(@RequestBody Transactions t, @PathVariable int id) {
        Double montant = t.getMontant();
        return transactionService.modTransactionMontant(montant, id);
    }

    /*Ta Anh & Patrick*/
    @PutMapping("/modTransactionDetail/{id}")
    public Transactions modTransactionDetail(@RequestBody Transactions t, @PathVariable int id) {
        String detail = t.getDetail();
        return transactionService.modTransactionDetail(detail, id);
    }

    /*Ta Anh & Patrick*/
    @PutMapping("/modTransactionDate/{id}")
    public Transactions modTransactionDate(@RequestBody Transactions t, @PathVariable int id) {
        String date = t.getDate();
        return transactionService.modTransactionDate(date, id);
    }

    /*Patrick*/
    @PutMapping("/modTransactionCategorie/{id}")
    public Transactions modTransactionCategorie(@RequestBody int budgetId, @PathVariable int id) {
        return transactionService.modTransactionCategorie(budgetId, id);
    }
}
