package bookshop.Service;

import bookshop.Entity.Sales;

import net.sf.json.JSONArray;

public interface SalesService {

    public JSONArray getJsonSales();

    public void saveSales(Sales s);
}
