package bookshop.Dao;

import bookshop.Entity.Sales;

import java.util.List;

public interface SalesDao {

    /*
     * 保存
     */

    public void save(Sales ss);


    /*
     * 查询所有
     */
    public List<Sales> findAll();


}
