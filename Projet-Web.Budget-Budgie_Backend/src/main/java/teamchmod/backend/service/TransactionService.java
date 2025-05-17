package teamchmod.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teamchmod.backend.model.Budget;
import teamchmod.backend.model.Transactions;
import teamchmod.backend.model.dto.BudgetDTO;
import teamchmod.backend.model.dto.TransactionsDTO;
import teamchmod.backend.repositories.BudgetRepository;
import teamchmod.backend.repositories.TransactionRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    BudgetRepository budgetRepository;

    /*Ta Anh & Patrick*/
    public List<TransactionsDTO> getAllTransactions() {
        List<Transactions> list = transactionRepository.findAll();
        List<TransactionsDTO> listDTO = new ArrayList<>();

        for (Transactions t : list) {
            BudgetDTO budgetDTO = new BudgetDTO();
            TransactionsDTO tdto = new TransactionsDTO();

            budgetDTO.setId(t.getBudget().getId());
            budgetDTO.setType(t.getBudget().getType());
            budgetDTO.setCategorie(t.getBudget().getCategorie());

            tdto.setId(t.getId());
            tdto.setBudget(budgetDTO);
            tdto.setDetail(t.getDetail());
            tdto.setDate(t.getDate());
            tdto.setMontant(t.getMontant());
            listDTO.add(tdto);
        }
        return listDTO;
    }

    /*Ta Anh & Patrick*/
    public Transactions addTransaction() {
        Transactions transactions = new Transactions();
        LocalDate today =LocalDate.now();
        transactions.setDate(String.valueOf(today));
        Budget budget = new Budget();
        budget.setId(1);
        transactions.setBudget(budget);
        transactionRepository.save(transactions);
        return transactions;
    }

    /*Patrick*/
    public HashMap<String, Double> getTotalByCategorie() {
        List<Transactions> list = transactionRepository.findAll();
        HashMap<String, Double> mapTotaux = new HashMap<>();

        for (Transactions t : list) {
            if (mapTotaux.containsKey(t.getBudget().getCategorie())) {
                mapTotaux.put(t.getBudget().getCategorie(), mapTotaux.get(t.getBudget().getCategorie()) + t.getMontant());
            }
            else {
                mapTotaux.put(t.getBudget().getCategorie(), t.getMontant());
            }
        }
        return mapTotaux;
    }

    /*Ta Anh*/
    public Transactions modTransactionMontant(Double montant, int id) {
        Transactions transactions = transactionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transactions # " + id + " introuvable."));
        transactions.setMontant(montant);
        return transactionRepository.save(transactions);
    }

    /*Ta Anh*/
    public Transactions modTransactionDetail(String detail, int id) {
        Transactions transactions = transactionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transactions # " + id + " introuvable."));
        transactions.setDetail(detail);
        return transactionRepository.save(transactions);
    }

    /*Ta Anh*/
    public Transactions modTransactionDate(String date, int id) {
        Transactions transactions = transactionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transactions # " + id + " introuvable."));
        transactions.setDate(date);
        return transactionRepository.save(transactions);
    }

    /*Patrick*/
    public Transactions modTransactionCategorie(int budgetId, int id) {
        Transactions transactions = transactionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transaction # " + id + " introuvable."));
        Budget budget = budgetRepository.findById(budgetId)
            .orElseThrow(() -> new EntityNotFoundException("Budget # " + id + " introuvable."));

        transactions.setBudget(budget);

        return transactionRepository.save(transactions);
    }

    /*Patrick*/
    public void deleteTransaction(int id) {
        transactionRepository.deleteById(id);
    }
}
