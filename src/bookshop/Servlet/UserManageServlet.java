package bookshop.Servlet;

import bookshop.Entity.User;
import bookshop.Dao.UserDao;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static java.lang.Integer.parseInt;

@WebServlet("/manageUser")
public class UserManageServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserManageServlet() {
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

            System.out.println("Servlet invoke!");


            UserDao dao = new UserDao();
            List<User> result = dao.findAll();
            System.out.println("normal here!\n");
            Iterator<User> it = result.iterator();

            ArrayList<JSONObject> booksJson = new ArrayList<JSONObject>();
            while (it.hasNext()) {
                User user = (User)it.next();
                //System.out.println(book);
                JSONObject obj = new JSONObject();
                obj.put("username",user.getUsername());
                obj.put("pwd",user.getPwd());
                obj.put("role",user.getRole());
                obj.put("email",user.getEmail());
                obj.put("phone",user.getPhone());
                obj.put("state",user.getState());

                System.out.println(obj.toString());
                booksJson.add(obj);
            }
            JSONArray users = JSONArray.fromArray(booksJson.toArray());

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

            UserDao dao = new UserDao();

            if(op.equals("delete")) {
                System.out.println("delete");
                dao.delete(username);
                System.out.println("delete success");
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
                    dao.update(newuser);
                }
                else if(op.equals("insert")){
                    dao.save(newuser);
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
