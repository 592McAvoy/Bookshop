package bookshop.Dao;

import bookshop.Entity.Sales;
import bookshop.Util.HibernateUtil;

import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class SalesDao {

    public SalesDao(){}
    /*
     * 保存
     */
    public void save(Sales ss) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        try {
            Transaction tx = session.beginTransaction(); // 开启事务
            session.save(ss);
            tx.commit(); // 提交事务
        } catch (RuntimeException e) {
            session.getTransaction().rollback(); // 回滚事务
            throw e;
        } finally {
            session.close(); // 关闭session
        }
    }

    /*
     * 根据id查询一个Book数据

    public Book getById(Integer id) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            Book book = (Book) session.createQuery("from Book where id = ? ")
                    .setParameter(0,id).uniqueResult();// 操作
            tx.commit();
            return book;
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }*/

    /*
     * 查询所有
     */
    public List<Sales> findAll() {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();

            // 方式一：使用HQL语句
            List<Sales> list = session.createQuery("FROM Sales").list(); // 使用HQL查询

            tx.commit();
            return list;
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }


}
