package bookshop.Entity;

public class Order {
    private Integer id;

    private String username;
    private String time;
    private Integer cost;
    private String content;

    public Order(){}
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

    public Integer getCost() {  return cost; }

    public void setCost(Integer r) {
        this.cost = r;
    }

    public String getTime() {
        return time;
    }
    public void setTime(String t){this.time = t;}

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    @Override
    public String toString() {
        return "[Order: user=" + username + ", time=" + time+ ", cost=" + cost +" balabala]\n";
    }
}
