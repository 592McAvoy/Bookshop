package bookshop.Servlet;

import bookshop.Entity.Book;
import bookshop.Service.BookService;

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

@WebServlet("/manageBook")
public class BookManageServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Autowired
    private BookService bookService;

    public void setBookService(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * @see HttpServlet#HttpServlet()
     */
    public BookManageServlet() {
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

            JSONArray books = bookService.getJsonBooks();

            out.println(books);
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

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {

            PrintWriter out = response.getWriter();
            response.setContentType("text/html;charset=utf-8");

            System.out.println("PostServlet invoke!");

            String op = request.getParameter("operation");
            Integer id = parseInt(request.getParameter("id"), 10);

            if (op.equals("delete")) {
                bookService.deleteBook(id);
            } else {
                String catagory = (String) request.getParameter("category");
                String title = (String) request.getParameter("title");
                String author = (String) request.getParameter("author");
                Integer price = parseInt(request.getParameter("price"), 10);
                Integer publish = parseInt(request.getParameter("publish"), 10);
                Integer stock = parseInt(request.getParameter("stock"), 10);
                String img = (String) request.getParameter("img");

                Book book = new Book();
                book.setId(id);
                book.setCategory(catagory);
                book.setTitle(title);
                book.setAuthor(author);
                book.setPrice(price);
                book.setPublish(publish);
                book.setStock(stock);
                book.setImg(img);

                System.out.println(book);
                if (op.equals("update")) {
                    bookService.updateBook(book);
                } else if (op.equals("insert")) {
                    bookService.saveBook(book);
                }
            }


            out.print("UPDATEUSER");

            out.flush();
            out.close();

        } catch (Exception ex) {
            if (ServletException.class.isInstance(ex)) {
                throw (ServletException) ex;
            } else {
                throw new ServletException(ex);
            }
        }
    }
}

