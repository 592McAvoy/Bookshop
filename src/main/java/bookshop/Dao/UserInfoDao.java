package bookshop.Dao;

import org.hibernate.Session;
import org.hibernate.Transaction;
import java.util.List;

import bookshop.Entity.UserInfo;
import bookshop.Util.HibernateUtil;

public class UserInfoDao {

    public UserInfoDao(){}

    /*
     * 保存
     */
    public void save(UserInfo ui) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        try {
            Transaction tx = session.beginTransaction(); // 开启事务
            session.save(ui);
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
    public void update(UserInfo ui) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();

            session.update(ui);// 操作

            tx.commit();
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    /*
     * 根据userName查询一个User数据
     */
    public UserInfo getByName(String name) {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            UserInfo ui = (UserInfo) session.createQuery("from UserInfo where username = ? ")
                    .setParameter(0,name).uniqueResult();// 操作
            tx.commit();
            return ui;
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    

}
