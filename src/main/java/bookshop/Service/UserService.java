package bookshop.Service;

import bookshop.Entity.User;

import net.sf.json.JSONArray;


public interface UserService {

    public JSONArray getJsonUsers();

    public User getByName(String username);

    public void deleteUser(String username);

    public void updateUser(User user);

    public void saveUser(User user);
}
