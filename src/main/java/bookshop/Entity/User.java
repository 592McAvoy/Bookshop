package bookshop.Entity;

public class User {

	private String username;

    private String pwd;
    private Integer role;
    private String email;
    private String phone;
    private Integer state;


    public User() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String un) {
        this.username = un;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
    
    public Integer getRole() {
        return role;
    }

    public void setRole(Integer r) {
        this.role = r;
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String p) {
        this.phone = p;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer r) {
        this.state = r;
    }

    @Override
    public String toString() {
        return "[User: username=" + username + ", pwd=" + pwd + ", role=" + role +" balabala]\n]";
    }


}
