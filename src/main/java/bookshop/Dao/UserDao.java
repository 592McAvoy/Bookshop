package bookshop.Dao;


import java.util.List;
import bookshop.Entity.User;

public interface UserDao {


    /*
     * 保存
     */
    public void save(User user);

    /*
     * 更新
     */
    public void update(User user);

    /*
     * 删除
     */
    public void delete(String name);

    /*
     * 根据userName查询一个User数据
     */
    public User getByName(String name);

    /*
     * 查询所有
     */
    public List<User> findAll();


}
