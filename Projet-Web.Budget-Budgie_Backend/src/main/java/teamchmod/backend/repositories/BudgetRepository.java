package teamchmod.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import teamchmod.backend.model.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Integer> {
}
