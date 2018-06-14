package bookshop.Service;

import javax.servlet.http.Part;

public interface UploadService {

    public String saveInDir(Part part);
    public void saveInDB(String user, String img);
    public String getImg(String user);
    public void changeCol(String col);
}
