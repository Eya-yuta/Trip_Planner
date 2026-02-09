package triply.backend.service;

import triply.backend.model.User;

import java.util.List;

public interface UserServiceInterface {
    List<User> getAllUsers();

    User getUserById(String id);

    User createUser(User user);

    void deleteUser(String id);
}
