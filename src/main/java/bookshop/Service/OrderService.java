package bookshop.Service;

import bookshop.Entity.Order;
import bookshop.Dao.OrderDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class OrderService {
    private OrderDao orderDao;

    public void setOrderDao(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    public JSONArray getJsonOrders(String username){
        List<Order> result = orderDao.findByName(username);
        Iterator<Order> it = result.iterator();
        ArrayList<JSONObject> booksJson = new ArrayList<>();
        while (it.hasNext()) {
            Order order = it.next();

            JSONObject obj = new JSONObject();
            obj.put("id",order.getId());
            obj.put("time",order.getTime());
            obj.put("totalCost",order.getCost());
            obj.put("content",order.getContent());

            booksJson.add(obj);
        }
        return JSONArray.fromArray(booksJson.toArray());
    }

    public void saveOrder(Order order){
        orderDao.save(order);
    }


}
