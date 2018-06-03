package bookshop.Service;

import bookshop.Entity.UserInfo;

import net.sf.json.JSONObject;

public interface UserInfoService {
    public UserInfo getByName(String username);

    public JSONObject getJsonObject(UserInfo ui);

    public void saveUserInfo(UserInfo ui);

    public void updateUserInfo(UserInfo ui);
}
