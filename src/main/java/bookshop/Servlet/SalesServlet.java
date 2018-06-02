package bookshop.Servlet;

import bookshop.Entity.Sales;
import bookshop.Service.SalesService;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import static java.lang.Integer.parseInt;


/**
 * Servlet implementation class UserManagerServlet
 */
@WebServlet("/Sales")
public class SalesServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Autowired
    private SalesService salesService;

    public void setSalesService(SalesService salesService) {
        this.salesService = salesService;
    }

    /**
     * @see HttpServlet#HttpServlet()
     */
    public SalesServlet() {
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

            JSONArray books = salesService.getJsonSales();

            out.println(books);
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

            System.out.println("PostServlet invoke!");

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

            salesService.saveSales(ss);

            out.print("UPDATESales");

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




