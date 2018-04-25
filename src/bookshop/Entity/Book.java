package bookshop.Entity;

public class Book {
    private Integer id;

    private String category;
    private String title;
    private String author;
    private Integer price;
    private Integer publish;
    private Integer stock;
    private String img;


    public Book() {}

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

    public Integer getPublish() { return publish;    }

    public void setPublish(Integer published) {
        this.publish = published;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer s) {
        this.stock = s;
    }

    public String getImg(){return img;}

    public void setImg(String img){this.img = img;}

    @Override
    public String toString() {
        return "[Book: title=" + title + ", category=" + category + ", author=" + author +" balabala]\n";
    }

}
