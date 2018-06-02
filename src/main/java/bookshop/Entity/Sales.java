package bookshop.Entity;

public class Sales {
    private Integer id;

    private String category;
    private String title;
    private String author;
    private Integer price;
    private Integer amount;
    private String time;
    private String username;


    public Sales() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String c) {
        this.category = c;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer pp) { this.price = pp;}

    public Integer getAmount() { return amount;    }

    public void setAmount(Integer aa) {
        this.amount = aa;
    }

    public void setTime(String time){
        this.time = time;
    }
    public String getTime(){
        return time;
    }

    public void setUsername(String uu){
        this.username = uu;
    }
    public String getUsername(){
        return username;
    }


    @Override
    public String toString() {
        return "[Sales: title=" + title + ", category=" + category + ", author=" + author +" balabala]\n";
    }

}

