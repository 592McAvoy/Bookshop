package bookshop.Service;

import bookshop.Dao.BookDao;
import bookshop.Entity.Book;

import net.sf.json.JSONArray;

public interface BookService {

    public JSONArray getJsonBooks();

    public void deleteBook(int id);

    public void updateBook(Book book);

    public void saveBook(Book book);
}
