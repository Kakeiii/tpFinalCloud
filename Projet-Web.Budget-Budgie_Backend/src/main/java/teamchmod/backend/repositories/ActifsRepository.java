package teamchmod.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import teamchmod.backend.model.Actifs;

public interface ActifsRepository extends JpaRepository<Actifs, Integer> {
}
