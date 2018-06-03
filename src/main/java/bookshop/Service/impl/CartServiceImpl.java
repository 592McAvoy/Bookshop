package bookshop.Service.impl;

import bookshop.Dao.BookDao;
import bookshop.Dao.CartDao;
import bookshop.Entity.Book;
import bookshop.Entity.Cart;
import bookshop.Service.CartService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class CartServiceImpl implements CartService {
    private BookDao bookDao;
    private CartDao cartDao;

    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    public void setCartDao(CartDao cartDao) {
        this.cartDao = cartDao;
    }

    public JSONArray getJsonCarts(String username){
        List<Cart> result = cartDao.findByName(username);
        Iterator<Cart> it = result.iterator();
        ArrayList<JSONObject> booksJson = new ArrayList<>();
        while (it.hasNext()) {
            Cart cart = it.next();
            Book book = bookDao.getById(cart.getBookid());
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

            booksJson.add(obj);
        }
        return JSONArray.fromArray(booksJson.toArray());
    }

    public Cart getByNameAndId(String name, Integer id){
        return cartDao.getByNameAndId(name, id);
    }

    public void deleteByNameAndId(String name, Integer id){
        cartDao.deleteByNameAndId(name, id);
    }

    public void updateCart(Cart cart){
        cartDao.update(cart);
    }

    public void saveCart(Cart cart) {
        cartDao.save(cart);
    }


}
