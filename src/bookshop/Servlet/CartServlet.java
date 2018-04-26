package bookshop.Servlet;



import bookshop.Dao.BookDao;
import bookshop.Entity.Book;
import bookshop.Entity.Cart;
import bookshop.Dao.CartDao;

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
@WebServlet("/Cart")
public class CartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public CartServlet() {
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

            String username = (String) request.getParameter("name");
            //Integer bookid = parseInt(request.getParameter("id"),10);

            CartDao cdao = new CartDao();
            List<Cart> result = cdao.findByName(username);
            BookDao bdao = new BookDao();
            System.out.println("normal here!\n");
            Iterator<Cart> it = result.iterator();

            ArrayList<JSONObject> booksJson = new ArrayList<JSONObject>();
            while (it.hasNext()) {
                Cart cart = (Cart) it.next();
                Book book = (Book)bdao.getById(cart.getBookid());
                //System.out.println(book);
                JSONObject obj = new JSONObject();
                obj.put("id",book.getId());
                obj.put("category",book.getCategory());
                obj.put("title",book.getTitle());
                obj.put("author",book.getAuthor());
                obj.put("price",book.getPrice());
                obj.put("publish",book.getPublish());
                obj.put("stock",book.getStock());
                obj.put("img",book.getImg());
                obj.put("amount",cart.getAmount());

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
            Integer bookid = parseInt(request.getParameter("id"),10);
            Integer amount = parseInt(request.getParameter("amount"),10);

            CartDao dao = new CartDao();
            Cart cart = dao.getByNameAndId(username,bookid);
            System.out.println(cart);

            if (cart != null){  /*更新*/
                Integer temp = cart.getAmount();
                temp += amount;
                cart.setAmount(temp);
                if(temp == 0){
                    dao.deleteByNameAndId(username,bookid);
                }else {
                    dao.update(cart);
                }
            }else {
                Cart newcart = new Cart();
                newcart.setUsername(username);
                newcart.setAmount(amount);
                newcart.setBookid(bookid);

                System.out.println(newcart);
                dao.save(newcart);
            }

            //HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().commit();
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

