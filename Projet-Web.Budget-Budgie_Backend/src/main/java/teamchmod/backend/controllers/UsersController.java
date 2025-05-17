package teamchmod.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import teamchmod.backend.model.Users;
import teamchmod.backend.service.UsersService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UsersController {

    @Autowired
    UsersService usersService;

    /*Ta Anh*/
    @PostMapping("/signin/{username}/{mdp}")
    public boolean signin(@PathVariable String username, @PathVariable String mdp) {
        return usersService.login(username, mdp);
    }
    /*Ta Anh*/
    @GetMapping("/viewUser/{id}")
    public Users getUser(@PathVariable int id) {
        return usersService.viewUser(id);
    }
    /*Ta Anh */
    @PostMapping("/createUser")
    public Users createUser(@RequestBody Users user) {
        return usersService.createUser(user);
    }
}
