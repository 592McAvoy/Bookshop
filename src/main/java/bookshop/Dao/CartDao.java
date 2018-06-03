package bookshop.Dao;

import java.util.List;
import bookshop.Entity.Cart;

public interface CartDao {

    /*
     * 保存
     */
    public void save(Cart cart);

    /*
     * 更新
     */
    public void update(Cart cart);
    /*
     * 删除
     */
    public void deleteByNameAndId(String name, Integer id);

    public Cart getByNameAndId(String name, Integer id);

    /*
     * 查询所有
     */
    public List<Cart> findByName(String name);


}
