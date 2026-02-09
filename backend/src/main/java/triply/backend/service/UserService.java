package triply.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import triply.backend.model.User;
import triply.backend.repository.UserRepo;

import java.util.List;

@Service
public class UserService implements UserServiceInterface {

    private final UserRepo userRepo;
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User getUserById(String id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }
}
