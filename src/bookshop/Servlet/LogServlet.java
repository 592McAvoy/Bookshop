package bookshop.Servlet;

import bookshop.Entity.User;
import bookshop.Service.UserService;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;


/**
 * Servlet implementation class UserManagerServlet
 */
@WebServlet("/UserLog")
public class LogServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Autowired
	private UserService userService;

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    /**
	 * @see HttpServlet#HttpServlet()
	 */
	public LogServlet() {
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

            String un = (String) request.getParameter("un");
            String password = (String) request.getParameter("pwd");
            System.out.println("name；"+un+" pwd: "+password);

            User user = userService.getByName(un);

            String resp;
            if (user != null){
                if(user.getPwd().equals(password)){
                    System.out.println("correct pwd!");
                    if(user.getRole()==0){
                        resp = "USER";
                    }
                    else{ resp = "ADMIN"; }
                }
                else{resp = "WRONGPWD";}
            }else{                  /*user不存在*/
                resp = "NULL";
            }

            out.print(resp);

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

            System.out.println("addServlet invoke!");

            String username = (String) request.getParameter("user");
            String pwd = (String) request.getParameter("pwd");
            String email = (String) request.getParameter("email");
            String phone = (String) request.getParameter("phone");

            User user = userService.getByName(username);

            if (user != null){  /*user存在*/
                System.out.println("exist!\n");
                out.print("USERERROR");

            }else {
                User newuser = new User();
                newuser.setUsername(username);
                newuser.setPwd(pwd);
                newuser.setRole(0);
                newuser.setEmail(email);
                newuser.setPhone(phone);
                newuser.setState(0);
                //System.out.println(newuser);
                userService.saveUser(newuser);

                out.print("ADDUSER");
            }

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
