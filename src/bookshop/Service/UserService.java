package bookshop.Service;

import bookshop.Entity.User;
import bookshop.Dao.UserDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class UserService {
    private UserDao dao;

    public void setDao(UserDao userDao) {
        this.dao = userDao;
    }

    public JSONArray getJsonUsers(){
        List<User> result = dao.findAll();
        System.out.println("normal here!\n");
        Iterator<User> it = result.iterator();

        ArrayList<JSONObject> booksJson = new ArrayList<>();
        while (it.hasNext()) {
            User user = it.next();
            JSONObject obj = new JSONObject();
            obj.put("username",user.getUsername());
            obj.put("pwd",user.getPwd());
            obj.put("role",user.getRole());
            obj.put("email",user.getEmail());
            obj.put("phone",user.getPhone());
            obj.put("state",user.getState());

            booksJson.add(obj);
        }
        return JSONArray.fromArray(booksJson.toArray());
    }

    public User getByName(String username){
        return dao.getByName(username);
    }

    public void deleteUser(String username){
        dao.delete(username);
    }

    public void updateUser(User user){
        dao.update(user);
    }

    public void saveUser(User user){
        dao.save(user);
    }
}
