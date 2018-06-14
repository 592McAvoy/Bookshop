package bookshop.Servlet;


import bookshop.Service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;


import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * @author BieHongLi
 * @version 创建时间：2017年3月4日 下午5:29:03
 * 注意：上传文件必须添加@MultipartConfig()可以设置上传文件的大小
 */
@WebServlet("/dealImg")
@MultipartConfig
public class UploadServlet extends HttpServlet{

    private static final long serialVersionUID = 1L;

    @Autowired
    private UploadService uploadService;

    public void setUploadService(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    public void init(ServletConfig config) throws ServletException {
        SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
                config.getServletContext());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            PrintWriter out = response.getWriter();
            response.setContentType("text/html;charset=UTF-8");

            String base64img = request.getParameter("file");
            String username = request.getParameter("username");
            String colName = request.getParameter("type");

            uploadService.changeCol(colName);

            System.out.println(base64img);

            uploadService.saveInDB(username,base64img);

            out.flush();
            out.close();

        } catch (Exception ex) {
            ex.printStackTrace();
            if ( ServletException.class.isInstance( ex ) ) {
                throw ( ServletException ) ex;
            }
            else {
                throw new ServletException( ex );
            }
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            //OutputStream sos = response.getOutputStream();
            PrintWriter out = response.getWriter();
            response.setContentType("text/html;charset=UTF-8");


            String username = request.getParameter("username");
            String colName = request.getParameter("type");

            uploadService.changeCol(colName);

            String content = uploadService.getImg(username);

            out.print(content);
            out.flush();
            out.close();

        } catch (Exception ex) {
            ex.printStackTrace();
            if ( ServletException.class.isInstance( ex ) ) {
                throw ( ServletException ) ex;
            }
            else {
                throw new ServletException( ex );
            }
        }

    }

}
