package bookshop.Dao;

import com.mongodb.BasicDBObject;


public interface MongoDAO {
    public void changeCol(String col);

    public BasicDBObject getFileByUser(String user);

    public String saveFile(String user, String img);

    public void deleteFileByUser(String user);
}
