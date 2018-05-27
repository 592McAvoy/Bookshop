package bookshop.Service;

import bookshop.Entity.Sales;
import bookshop.Dao.SalesDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SalesService {
    private SalesDao dao;

    public void setDao(SalesDao dao) {
        this.dao = dao;
    }

    public JSONArray getJsonSales(){
        List<Sales> result = dao.findAll();
        Iterator<Sales> it = result.iterator();
        ArrayList<JSONObject> booksJson = new ArrayList<>();
        while (it.hasNext()) {
            Sales ss = it.next();
            JSONObject obj = new JSONObject();
            obj.put("category",ss.getCategory());
            obj.put("title",ss.getTitle());
            obj.put("author",ss.getAuthor());
            obj.put("price",ss.getPrice());
            obj.put("amount",ss.getAmount());
            obj.put("username",ss.getUsername());
            obj.put("time",ss.getTime());

            booksJson.add(obj);
        }
        return JSONArray.fromArray(booksJson.toArray());
    }

    public void saveSales(Sales s){
        dao.save(s);
    }
}
