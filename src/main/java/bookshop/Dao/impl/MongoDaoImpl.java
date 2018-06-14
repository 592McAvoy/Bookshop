package bookshop.Dao.impl;

import bookshop.Dao.MongoDAO;
import com.mongodb.*;


public class MongoDaoImpl implements MongoDAO {
    private String dbName;
    private String collectionName;

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public void changeCol(String col){
        this.collectionName = col;
    }

    //获得mongoDB数据库连接。
    private MongoClient mongo = new MongoClient("localhost", 27017);

    public BasicDBObject getFileByUser(String user){
        BasicDBObject obj = null;
        try {
            //获得库
            DB db= mongo.getDB(dbName);
            DBCollection col = db.getCollection(collectionName);

            DBObject query = new BasicDBObject("user", user);
            obj = (BasicDBObject) col.findOne(query);

        } catch (Exception e) {
            e.printStackTrace();
        }
        //返回数据
        return obj;
    }

    public String saveFile(String user, String img){
        String id = null;
        try {
            //每个系统用一个库
            DB db= mongo.getDB(dbName);
            DBCollection col = db.getCollection(collectionName);
            if(getFileByUser(user) != null){
                deleteFileByUser(user);
            }
            BasicDBObject obj = new BasicDBObject("user",user)
                    .append("type","img")
                    .append("content",img);
            col.insert(obj);
            System.out.println(obj.toString());
            id = obj.getString("_id");

        } catch (Exception e) {
            e.printStackTrace();
        }
        return id;
    }

    public void deleteFileByUser(String user){
        try {
            //获得库
            DB db = mongo.getDB(dbName);
            DBCollection col = db.getCollection(collectionName);
            DBObject query = new BasicDBObject("user", user);
            col.remove(query);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }


}
