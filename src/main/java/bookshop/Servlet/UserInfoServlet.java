package bookshop.Servlet;


import bookshop.Entity.UserInfo;
import bookshop.Service.UserInfoService;

import java.io.IOException;
import java.io.PrintWriter;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;


import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/UserInfo")
public class UserInfoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Autowired
    private UserInfoService userInfoService;

    public void setUserInfoService(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserInfoServlet() {
        super();
    }

    public void init(ServletConfig config) throws ServletException {
        SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
                config.getServletContext());
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    @SuppressWarnings("unchecked")
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            PrintWriter out = response.getWriter();
            response.setContentType("text/html;charset=utf-8");

            System.out.println("UserInfoServlet invoke!");

            String username = (String) request.getParameter("username");

            UserInfo ui = userInfoService.getByName(username);

            if(ui == null){
                out.print("null");
                out.flush();
                out.close();
                return;
            }

            JSONObject obj = userInfoService.getJsonObject(ui);

            System.out.println(obj.toString());

            out.print(obj);

            out.flush();
            out.close();

        }
        catch (Exception ex) {
            if ( ServletException.class.isInstance( ex ) ) {
                throw ( ServletException ) ex;
            }
            else {
                throw new ServletException( ex );
            }
        }
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {

            PrintWriter out = response.getWriter();
            response.setContentType("text/html;charset=utf-8");

            System.out.println("UserInfoPostServlet invoke!");

            String op = request.getParameter("option");
            String username = (String) request.getParameter("username");
            String content = request.getParameter("content");

            System.out.println("content: "+content);

            UserInfo ui = userInfoService.getByName(username);

            if(ui == null){
                ui = new UserInfo();
                ui.setUsername(username);
                userInfoService.saveUserInfo(ui);
            }

            if(op.equals("iconUrl")) {
                //System.out.println("iconUrl");
                ui.setIconUrl(content);
                userInfoService.updateUserInfo(ui);
            }
            else if(op.equals("bookUrl")){
                //System.out.println("bookUrl");
                ui.setBookUrl(content);
                userInfoService.updateUserInfo(ui);
            }
            else if(op.equals("bookDesc")){
                //System.out.println("bookDesc");
                ui.setBookDesc(content);
                userInfoService.updateUserInfo(ui);
            }
            else {
                System.out.println("userIntro");
                ui.setIntro(content);
                userInfoService.updateUserInfo(ui);
            }

            out.print("UPDATEUSERInfo");

            out.flush();
            out.close();

        }
        catch (Exception ex) {
            if ( ServletException.class.isInstance( ex ) ) {
                throw ( ServletException ) ex;
            }
            else {
                throw new ServletException( ex );
            }
        }
    }
}

