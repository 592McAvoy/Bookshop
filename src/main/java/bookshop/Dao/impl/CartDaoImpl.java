package bookshop.Dao.impl;

import bookshop.Dao.CartDao;
import bookshop.Entity.Cart;
import bookshop.Util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class CartDaoImpl implements CartDao {
    public void save(Cart cart) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        try {
            Transaction tx = session.beginTransaction(); // 开启事务
            session.save(cart);
            tx.commit(); // 提交事务
        } catch (RuntimeException e) {
            session.getTransaction().rollback(); // 回滚事务
            throw e;
        } finally {
            session.close(); // 关闭session
        }
    }

    /*
     * 更新
     */
    public void update(Cart cart) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();

            session.update(cart);// 操作

            tx.commit();
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    /*
     * 删除
     */
    public void deleteByNameAndId(String name, Integer id) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();

            Object user = (Cart) session.createQuery("from Cart where username = ? and bookid = ?")
                    .setParameter(0, name)
                    .setParameter(1,id)
                    .uniqueResult(); // 要先获取到这个对象
            session.delete(user); // 删除的是实体对象

            tx.commit();
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    public Cart getByNameAndId(String name, Integer id) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            Cart cart = (Cart) session.createQuery("from Cart where username = ? and bookid = ?")
                    .setParameter(0,name)
                    .setParameter(1,id).uniqueResult();// 操作
            tx.commit();
            return cart;
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    /*
     * 查询所有
     */
    public List<Cart> findByName(String name) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();

            // 方式一：使用HQL语句
            List<Cart> list = session.createQuery("from Cart where username = ? ")
                    .setParameter(0, name)
                    .list();  // 使用HQL查询

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
