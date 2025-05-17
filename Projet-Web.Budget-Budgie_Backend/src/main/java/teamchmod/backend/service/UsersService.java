package teamchmod.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teamchmod.backend.model.Users;
import teamchmod.backend.repositories.UsersRepository;

@Service
public class UsersService {

    @Autowired
    UsersRepository usersRepository;

    /*Ta Anh*/
    public boolean login(String username, String mdp) {
        Users user = usersRepository.findByUsernameAndAndMdp(username, mdp);
        return user.getUsername().equals(username) && user.getMdp().equals(mdp);
    }

    /*Ta Anh*/
    public Users viewUser(int id) {
        return usersRepository.findById(id);
    }
    /*Ta Anh*/
    public Users createUser(Users user) {
        return usersRepository.save(user);
    }


}
