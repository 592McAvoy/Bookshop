package bookshop.Servlet;

import bookshop.Entity.Cart;
import bookshop.Service.CartService;

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
@WebServlet("/Cart")
public class CartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Autowired
    private CartService cartService;

    public void setCartService(CartService cartService) {
        this.cartService = cartService;
    }

    /**
     * @see HttpServlet#HttpServlet()
     */
    public CartServlet() {
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

            String username = (String) request.getParameter("name");

            JSONArray books = cartService.getJsonCarts(username);

            System.out.println(books.toString());
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

            System.out.println("addServlet invoke!");

            String username = (String) request.getParameter("name");
            Integer bookid = parseInt(request.getParameter("id"),10);
            Integer amount = parseInt(request.getParameter("amount"),10);

            Cart cart = cartService.getByNameAndId(username,bookid);

            if (cart != null){  /*更新*/
                Integer temp = cart.getAmount();
                temp += amount;
                cart.setAmount(temp);
                if(temp == 0){
                    cartService.deleteByNameAndId(username,bookid);
                }else {
                    cartService.updateCart(cart);
                }
            }else {
                Cart newcart = new Cart();
                newcart.setUsername(username);
                newcart.setAmount(amount);
                newcart.setBookid(bookid);
                cartService.saveCart(newcart);
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

