package bookshop.Service;

import bookshop.Entity.UserInfo;
import bookshop.Dao.UserInfoDao;
import net.sf.json.JSONObject;

public class UserInfoService {
    private UserInfoDao dao;

    public void setDao(UserInfoDao dao) {
        this.dao = dao;
    }

    public UserInfo getByName(String username){
        return dao.getByName(username);
    }

    public JSONObject getJsonObject(UserInfo ui){
        JSONObject obj = new JSONObject();
        obj.put("bookDesc", ui.getBookDesc());
        obj.put("bookUrl", ui.getBookUrl());
        obj.put("iconUrl", ui.getIconUrl());
        obj.put("intro", ui.getIntro());

        return obj;
    }

    public void saveUserInfo(UserInfo ui){
        dao.save(ui);
    }

    public void updateUserInfo(UserInfo ui){
        dao.update(ui);
    }
}
