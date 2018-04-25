package bookshop.Servlet;

import bookshop.Entity.Book;
import bookshop.Util.HibernateUtil;
import bookshop.Dao.BookDao;

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



/**
 * Servlet implementation class UserManagerServlet
 */
@WebServlet("/getBook")
public class BookServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public BookServlet() {
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

            System.out.println("This is a book manager");


            BookDao dao = new BookDao();
            List<Book> result = dao.findAll();
            System.out.println("normal here!\n");
            Iterator<Book> it = result.iterator();

            ArrayList<JSONObject> booksJson = new ArrayList<JSONObject>();
            while (it.hasNext()) {
                Book book = (Book) it.next();
                //System.out.println(book);
                JSONObject obj = new JSONObject();
                obj.put("category",book.getCategory());
                obj.put("title",book.getTitle());
                obj.put("auther",book.getAuther());
                obj.put("price",book.getPrice());
                obj.put("publish",book.getPublish());
                obj.put("stock",book.getStock());
                obj.put("img",book.getImg());

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

}

