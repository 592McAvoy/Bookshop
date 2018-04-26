package bookshop.Entity;

public class Cart {
    private Integer id;

    private String username;
    private Integer bookid;
    private Integer amount;

    public Cart(){}
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String un) {
        this.username = un;
    }

    public Integer getBookid() {  return bookid; }

    public void setBookid(Integer r) {
        this.bookid = r;
    }

    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer a){this.amount = a;}
}
