package bookshop.Servlet;

import bookshop.Entity.Sales;
import bookshop.Dao.SalesDao;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import static java.lang.Integer.parseInt;


/**
 * Servlet implementation class UserManagerServlet
 */
@WebServlet("/Sales")
public class SalesServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public SalesServlet() {
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

            System.out.println("This is a sales manager");


            SalesDao dao = new SalesDao();
            List<Sales> result = dao.findAll();
            System.out.println("normal here!\n");
            Iterator<Sales> it = result.iterator();

            ArrayList<JSONObject> booksJson = new ArrayList<JSONObject>();
            while (it.hasNext()) {
                Sales ss = (Sales) it.next();
                //System.out.println(book);
                JSONObject obj = new JSONObject();
                //obj.put("id",book.getId());
                obj.put("category",ss.getCategory());
                obj.put("title",ss.getTitle());
                obj.put("author",ss.getAuthor());
                obj.put("price",ss.getPrice());
                obj.put("amount",ss.getAmount());
                obj.put("username",ss.getUsername());
                obj.put("time",ss.getTime());

                System.out.println(obj.toString());
                booksJson.add(obj);
            }
            JSONArray books = JSONArray.fromArray(booksJson.toArray());


            System.out.println(books);

            out.println(books);
            out.flush();
            out.close();
            //HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().commit();
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


            SalesDao dao = new SalesDao();


            String catagory = (String) request.getParameter("category");
            String title = (String) request.getParameter("title");
            String author = (String) request.getParameter("author");
            Integer price = parseInt(request.getParameter("price"), 10);
            Integer amount = parseInt(request.getParameter("amount"), 10);
            String username = request.getParameter("username");
            String time = (String) request.getParameter("time");

            Sales ss = new Sales();
            ss.setCategory(catagory);
            ss.setTitle(title);
            ss.setAuthor(author);
            ss.setPrice(price);
            ss.setAmount(amount);
            ss.setUsername(username);
            ss.setTime(time);

            System.out.println(ss);
            dao.save(ss);

            out.print("UPDATESales");

            out.flush();
            out.close();

        } catch (Exception ex) {
            //HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().rollback();
            if (ServletException.class.isInstance(ex)) {
                throw (ServletException) ex;
            } else {
                throw new ServletException(ex);
            }
        }
    }
}




