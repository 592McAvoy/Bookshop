package bookshop.Servlet;

import bookshop.Entity.Book;
import bookshop.Util.HibernateUtil;

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
            HibernateUtil.getSessionFactory().getCurrentSession().beginTransaction();
            PrintWriter out = response.getWriter();
            response.setContentType("text/html;charset=utf-8");

            System.out.println("This is a book manager");

            List<Book> result = HibernateUtil.getSessionFactory()
                    .getCurrentSession().createQuery("from Book").list();
            System.out.println("normal here!\n");
            Iterator<Book> it = result.iterator();

            ArrayList<JSONObject> booksJson = new ArrayList<JSONObject>();
            while (it.hasNext()) {
                Book book = (Book) it.next();
                System.out.println(book);
                JSONObject obj = new JSONObject();
                System.out.println("1\n");
                obj.put("category",book.getCategory());
                System.out.println("2\n");
                obj.put("title",book.getTitle());
                obj.put("auther",book.getAuther());
                System.out.println("3\n");
                obj.put("price",book.getPrice());
                obj.put("publish",book.getPublish());
                obj.put("stock",book.getStock());
                System.out.println("4\n");
                obj.put("img",book.getImg());

                System.out.println(obj.toString());
                booksJson.add(obj);
            }
            JSONArray books = JSONArray.fromArray(booksJson.toArray());


            System.out.println(books);

            out.println(books);
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

}

