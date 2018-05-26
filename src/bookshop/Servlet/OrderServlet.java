package bookshop.Servlet;

import bookshop.Entity.Order;
import bookshop.Service.OrderService;

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
@WebServlet("/Order")
public class OrderServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Autowired
    private OrderService orderService;

    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrderServlet() {
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

            System.out.println("OrderServlet invoke!");

            String username = (String) request.getParameter("name");

            JSONArray books = orderService.getJsonOrders(username);

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

            String username = (String) request.getParameter("name");
            Integer cost = parseInt(request.getParameter("cost"), 10);
            String time = request.getParameter("time");
            String content = request.getParameter("content");

            Order order = new Order();
            order.setContent(content);
            order.setUsername(username);
            order.setCost(cost);
            order.setTime(time);

            System.out.println(order);
            orderService.saveOrder(order);


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


