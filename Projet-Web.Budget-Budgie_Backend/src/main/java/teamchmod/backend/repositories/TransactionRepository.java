package teamchmod.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import teamchmod.backend.model.Transactions;

public interface TransactionRepository extends JpaRepository<Transactions, Integer> {
}
