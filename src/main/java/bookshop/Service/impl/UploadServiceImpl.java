package bookshop.Service.impl;

import bookshop.Service.UploadService;
import bookshop.Dao.MongoDAO;
import com.mongodb.BasicDBObject;


import javax.servlet.http.Part;
import java.io.File;


public class UploadServiceImpl implements UploadService {
    private MongoDAO dao;

    public void setDao(MongoDAO dao) {
        this.dao = dao;
    }

    public void changeCol(String col){
        dao.changeCol(col);
    }

    public String saveInDir(Part part){
        try {
            //获取上传文件的目录
            //String root=request.getServletContext().getRealPath("/upload");
            String root = "C:\\Users\\lyc\\Desktop\\BookShop\\src\\main\\webapp\\upload";
            //String root = "C:\\Users\\lyc\\Desktop\\upload";
            System.out.println("测试上传文件的路径：" + root);
            File dir = new File(root);
            if (!dir.exists()) {
                dir.mkdir();//如果目录不存在，则创建
            }

            //获取文件的后缀
            String str = part.getSubmittedFileName();//获取上传文件名
            System.out.println("测试获取文件的名称：" + str);

            //生成一个新的文件名，不重复，数据库存储的就是这个文件名，不重复的
            // String randname = UUID.randomUUID().toString()+str;
            String randname = str;
            String filename = root + "\\" + randname;
            System.out.println("测试产生新的文件名：" + filename);

            //上传文件到指定目录，不想上传文件就不调用这个
            part.write(filename);

            String url = "upload/" + randname;
            System.out.println("测试URL: " + url);

            return url;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            return "error";
        }
    }

    public void saveInDB(String user, String img) {

        String id = dao.saveFile(user,img);

        System.out.println("id = "+id);

    }

    public String getImg(String user){
        String content = null;
        BasicDBObject obj = dao.getFileByUser(user);
        if(obj != null){
            content = obj.getString("content");
        }
        System.out.println("content = "+content);
        return content;
    }
}
