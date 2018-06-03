package bookshop.Dao;


import bookshop.Entity.UserInfo;

public interface UserInfoDao {

    /*
     * 保存
     */
    public void save(UserInfo ui);

    /*
     * 更新
     */
    public void update(UserInfo ui);

    /*
     * 根据userName查询一个User数据
     */
    public UserInfo getByName(String name);

}
