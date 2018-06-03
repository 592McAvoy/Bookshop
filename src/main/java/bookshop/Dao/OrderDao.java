package bookshop.Dao;


import java.util.List;
import bookshop.Entity.Order;

public interface OrderDao {

    /*
     * 保存
     */
    public void save(Order order);

    /*
     * 更新
     */
    public void update(Order order);

    /*
     * 删除
     */
    public void delete(Integer id);


    /*
     * 查询所有
     */
    public List<Order> findByName(String name);

}
