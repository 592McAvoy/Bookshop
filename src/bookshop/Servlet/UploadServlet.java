package bookshop.Servlet;

import org.apache.commons.fileupload.servlet.ServletFileUpload;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 * @author BieHongLi
 * @version 创建时间：2017年3月4日 下午5:29:03
 * 注意：上传文件必须添加@MultipartConfig()可以设置上传文件的大小
 */
@WebServlet("/upload")
@MultipartConfig
public class UploadServlet extends HttpServlet{

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            PrintWriter out = response.getWriter();
            response.setContentType("text/html;charset=UTF-8");

            //检测是否为多媒体上传
            if (!ServletFileUpload.isMultipartContent(request)) {
                // 如果不是则停止
                //PrintWriter writer = response.getWriter();
                out.println("Error: 表单必须包含 enctype=multipart/form-data");
                out.flush();
                return;
            }


            //获取上传的文件
            Part part = request.getPart("file");
            if(part == null){
                System.out.println("null part!");
            }

            //获取请求的信息
            //String name=part.getHeader("content-disposition");
            System.out.println("ok here");//测试使用

            //获取上传文件的目录
            //String root=request.getServletContext().getRealPath("/upload");
            String root = "C:\\Users\\lyc\\Desktop\\BookShop\\WebContent\\upload";
            //String root = "C:\\Users\\lyc\\Desktop\\upload";
            System.out.println("测试上传文件的路径："+root);
            File dir = new File(root);
            if(!dir.exists()){
                dir.mkdir();//如果目录不存在，则创建
            }

            //获取文件的后缀
            String str = part.getSubmittedFileName();//获取上传文件名
            System.out.println("测试获取文件的名称："+str);

            //生成一个新的文件名，不重复，数据库存储的就是这个文件名，不重复的
           // String randname = UUID.randomUUID().toString()+str;
            String randname = str;
            String filename= root +"\\"+ randname;
            System.out.println("测试产生新的文件名："+filename);

            //上传文件到指定目录，不想上传文件就不调用这个
            part.write(filename);

            String url = "upload/"+randname;
            System.out.println("测试URL: "+url);
            out.print(url);
            out.flush();

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
