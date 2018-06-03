package bookshop.Service;


import bookshop.Entity.Cart;
import net.sf.json.JSONArray;

public interface CartService {

    public JSONArray getJsonCarts(String username);

    public Cart getByNameAndId(String name, Integer id);

    public void deleteByNameAndId(String name, Integer id);

    public void updateCart(Cart cart);

    public void saveCart(Cart cart);



}
