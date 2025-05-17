package teamchmod.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import teamchmod.backend.model.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    /*Ta Anh*/
    Users findByUsernameAndAndMdp(String username, String mdp);
    Users findById(int id);
}
