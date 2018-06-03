package bookshop.Service;

import bookshop.Entity.Order;
import net.sf.json.JSONArray;


public interface OrderService {

    public JSONArray getJsonOrders(String username);

    public void saveOrder(Order order);

}
