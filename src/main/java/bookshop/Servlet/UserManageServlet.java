package bookshop.Servlet;

import bookshop.Entity.User;
import bookshop.Service.UserService;

import java.io.IOException;
import java.io.PrintWriter;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;


import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static java.lang.Integer.parseInt;

@WebServlet("/manageUser")
public class UserManageServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Autowired
    private UserService userService;

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserManageServlet() {
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

            System.out.println("Servlet invoke!");

            JSONArray users = userService.getJsonUsers();

            out.print(users);

            out.flush();
            out.close();

        }
        catch (Exception ex) {
            //HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().rollback();
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

            System.out.println("PostServlet invoke!");

            String op = request.getParameter("operation");
            String username = (String) request.getParameter("username");

            if(op.equals("delete")) {
                userService.deleteUser(username);
            }
            else {
                String pwd = (String) request.getParameter("pwd");
                Integer role = parseInt(request.getParameter("role"),10);
                String email = (String) request.getParameter("email");
                String phone = (String) request.getParameter("phone");
                Integer state = parseInt(request.getParameter("state"),10);

                User newuser = new User();
                newuser.setUsername(username);
                newuser.setPwd(pwd);
                newuser.setRole(role);
                newuser.setEmail(email);
                newuser.setPhone(phone);
                newuser.setState(state);

                System.out.println(newuser);
                if(op.equals("update")) {
                    userService.updateUser(newuser);
                }
                else if(op.equals("insert")){
                    userService.saveUser(newuser);
                }
            }


            out.print("UPDATEUSER");

            out.flush();
            out.close();

        }
        catch (Exception ex) {
            //HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().rollback();
            if ( ServletException.class.isInstance( ex ) ) {
                throw ( ServletException ) ex;
            }
            else {
                throw new ServletException( ex );
            }
        }
    }
}
