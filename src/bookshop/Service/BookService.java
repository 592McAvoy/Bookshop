package bookshop.Service;

import bookshop.Dao.BookDao;
import bookshop.Entity.Book;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class BookService {
    private BookDao dao;

    public void setDao(BookDao dao) {
        this.dao = dao;
    }

    public JSONArray getJsonBooks(){
        List<Book> result = dao.findAll();
        Iterator<Book> it = result.iterator();

        ArrayList<JSONObject> booksJson = new ArrayList<>();
        while (it.hasNext()) {
            Book book = it.next();
            JSONObject obj = new JSONObject();
            obj.put("id",book.getId());
            obj.put("category",book.getCategory());
            obj.put("title",book.getTitle());
            obj.put("author",book.getAuthor());
            obj.put("price",book.getPrice());
            obj.put("publish",book.getPublish());
            obj.put("stock",book.getStock());
            obj.put("img",book.getImg());
            booksJson.add(obj);
        }
        return JSONArray.fromArray(booksJson.toArray());
    }

    public void deleteBook(int id){
        dao.delete(id);
    }

    public void updateBook(Book book){
        dao.update(book);
    }

    public void saveBook(Book book){
        dao.save(book);
    }
}
