package bookshop.Entity;

public class UserInfo {
    private String username;

    private String iconUrl;
    private String bookUrl;
    private String bookDesc;
    private String Intro;

    public String getBookDesc() {
        return bookDesc;
    }

    public void setBookDesc(String bookDesc) {
        this.bookDesc = bookDesc;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getBookUrl() {
        return bookUrl;
    }

    public void setBookUrl(String bookUrl) {
        this.bookUrl = bookUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getIntro() {
        return Intro;
    }

    public void setIntro(String intro) {
        Intro = intro;
    }

    @Override
    public String toString() {
        return "[User: username=" + username + "\n iconUrl=" + iconUrl + "\n bookUrl=" + bookUrl +" balabala]\n]";
    }
}
