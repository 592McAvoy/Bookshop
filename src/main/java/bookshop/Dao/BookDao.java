package bookshop.Dao;

import bookshop.Entity.Book;

import java.util.List;

public interface BookDao {
    /*
     * 保存
     */
    public void save(Book book);

    /*
     * 更新
     */
    public void update(Book book);

    /*
     * 删除
     */
    public void delete(Integer id);
    /*
     * 根据id查询一个Book数据
     */
    public Book getById(Integer id);

    /*
     * 查询所有
     */
    public List<Book> findAll();


}
