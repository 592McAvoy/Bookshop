package bookshop.Servlet;

import bookshop.Dao.BookDao;
import bookshop.Entity.Book;
import bookshop.Entity.Order;
import bookshop.Dao.OrderDao;

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
@WebServlet("/Order")
public class OrderServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrderServlet() {
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

            System.out.println("OrderServlet invoke!");

            String username = (String) request.getParameter("name");
            //Integer bookid = parseInt(request.getParameter("id"),10);

            OrderDao dao = new OrderDao();
            List<Order> result = dao.findByName(username);
            BookDao bdao = new BookDao();
            System.out.println("normal here!\n");
            Iterator<Order> it = result.iterator();

            ArrayList<JSONObject> booksJson = new ArrayList<JSONObject>();
            while (it.hasNext()) {
                Order order = (Order) it.next();

                JSONObject obj = new JSONObject();
                obj.put("id",order.getId());
                obj.put("time",order.getTime());
                obj.put("totalCost",order.getCost());
                obj.put("content",order.getContent());

                System.out.println(obj.toString());
                booksJson.add(obj);
            }
            JSONArray books = JSONArray.fromArray(booksJson.toArray());

            System.out.println(books.toString());
            out.println(books);
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

            System.out.println("addServlet invoke!");

            String username = (String) request.getParameter("name");
            Integer cost = parseInt(request.getParameter("cost"), 10);
            String time = request.getParameter("time");
            String content = request.getParameter("content");
            System.out.println("content: "+content);

            OrderDao dao = new OrderDao();

            Order order = new Order();
            order.setContent(content);
            order.setUsername(username);
            order.setCost(cost);
            order.setTime(time);

            System.out.println(order);
            dao.save(order);




            //HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().commit();
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


