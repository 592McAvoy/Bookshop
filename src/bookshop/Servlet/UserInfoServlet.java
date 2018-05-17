package bookshop.Servlet;


import bookshop.Entity.UserInfo;
import bookshop.Dao.UserInfoDao;

import java.io.IOException;
import java.io.PrintWriter;

import net.sf.json.JSONObject;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/UserInfo")
public class UserInfoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserInfoServlet() {
        super();
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

            UserInfoDao dao = new UserInfoDao();
            UserInfo ui = dao.getByName(username);

            if(ui == null){
                out.print("null");
                out.flush();
                out.close();
                return;
            }

            JSONObject obj = new JSONObject();
            obj.put("bookDesc", ui.getBookDesc());
            obj.put("bookUrl", ui.getBookUrl());
            obj.put("iconUrl", ui.getIconUrl());
            obj.put("intro", ui.getIntro());

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

            UserInfoDao dao = new UserInfoDao();
            UserInfo ui = dao.getByName(username);

            if(ui == null){
                ui = new UserInfo();
                ui.setUsername(username);
                dao.save(ui);
            }

            if(op.equals("iconUrl")) {
                System.out.println("iconUrl");
                ui.setIconUrl(content);
                dao.update(ui);
            }
            else if(op.equals("bookUrl")){
                System.out.println("bookUrl");
                ui.setBookUrl(content);
                dao.update(ui);
            }
            else if(op.equals("bookDesc")){
                System.out.println("bookDesc");
                ui.setBookDesc(content);
                dao.update(ui);
            }
            else {
                System.out.println("userIntro");
                ui.setIntro(content);
                dao.update(ui);
            }

            UserInfo ui_t = dao.getByName(username);
            System.out.println(ui_t);

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

