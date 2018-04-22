package user;


import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import org.hibernate.Session;


/**
 * Servlet implementation class UserManagerServlet
 */
@WebServlet("/Userinfo")
public class UserinfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UserinfoServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("unchecked")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
		    //System.out.println("here!\n");
            HibernateUtil.getSessionFactory().getCurrentSession().beginTransaction();
            PrintWriter out = response.getWriter();
            response.setContentType("text/html;charset=utf-8");
            
            System.out.println("Servlet invoke!");

            String un = (String) request.getParameter("un");
            System.out.println(un);
            User user = (User)HibernateUtil.getSessionFactory()
                                .getCurrentSession().createQuery("from User where username = ? ")
                                .setParameter(0,un).uniqueResult();
            System.out.println(user);
            String pwd;
            if (user != null){
                pwd = user.getPwd();
            }else{                  /*user不存在*/
                pwd = "USERERROR";
            }

            out.print(pwd);

            out.flush();
            out.close();
            HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().commit();
        }
        catch (Exception ex) {
            HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().rollback();
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
            Session session = HibernateUtil.getSessionFactory().getCurrentSession();
            session.beginTransaction();
            PrintWriter out = response.getWriter();
            response.setContentType("text/html;charset=utf-8");

            System.out.println("addServlet invoke!");

            String username = (String) request.getParameter("user");
            String pwd = (String) request.getParameter("pwd");
            String email = (String) request.getParameter("email");
            String phone = (String) request.getParameter("phone");

            User user = (User)HibernateUtil.getSessionFactory()
                    .getCurrentSession().createQuery("from User where username = ? ")
                    .setParameter(0,username).uniqueResult();
            System.out.println(user);

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
                System.out.println(newuser);
                Serializable s =  session.save(newuser);
                System.out.println(s);
                out.print("ADDUSER");
            }
            HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().commit();
            out.flush();
            out.close();

        }
        catch (Exception ex) {
            HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().rollback();
            if ( ServletException.class.isInstance( ex ) ) {
                throw ( ServletException ) ex;
            }
            else {
                throw new ServletException( ex );
            }
        }
    }
}
