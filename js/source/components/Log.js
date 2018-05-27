import React from 'react';
import emitter from "./event";
import { Input, Icon, Button } from 'antd';
import { Alert } from 'antd';

class Log extends React.Component{
    constructor(props){
        super(props);

        this.checkLog = this.checkLog.bind(this);
        this.checkRegister = this.checkRegister.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeUsr = this.changeUsr.bind(this);
        this.changeEmailAddr = this.changeEmailAddr.bind(this);
        this.changePhoneNum = this.changePhoneNum.bind(this);
        this.dealNum = this.dealNum.bind(this);

        this.state={
            load:false,
            logIn:false,
            register:false,
            userName:"lyc",
            password:"cc0716",
            phoneNum:"",
            emailAddr:"",
            validUser:true,
            validPwd:false,
            validEmail:true,
            validPhone:true,
            validInfo:false
        };
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            if(msg != "Log"){
                this.setState({load:false})
            } else{
                this.setState({load:true});  
            }         
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }

    checkLog(e){
        e.preventDefault();
        //alert("begin check log!\n");

        var xmlhttp;

        if (window.XMLHttpRequest) {
           xmlhttp = new XMLHttpRequest();
        } else {
           xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        this.serverRequest = (xmlhttp.onreadystatechange = function() {
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               //alert("Response!");
               var resp = xmlhttp.responseText+"";
               resp = resp.replace( /^\s+|\s+$/g, "" );
               if(resp.trim()=="USER"){
                   //alert("USER!\n");
                   this.handleLog();
               }else if(resp.trim()=="NULL"){
                   alert("user doesn't exist!")
               }else if(resp.trim() == "WRONGPWD"){
                   alert("false password!");
               }else{
                   alert("Admin")
                   this.handleAdmin();
               }
           }
        }.bind(this));
        xmlhttp.open("GET", "UserLog?un="+this.state.userName+"&pwd="+this.state.password, false);
        //console.log(xmlhttp);
        xmlhttp.send();

    }
    handleLog(){
        if(this.state.register){
            if(!this.state.validInfo){
                console.log("invalid validinfo");
                return;
            }
        }
        this.setState({
            logIn:true,
            register:false
        });

        const cb = (msg) => {
            emitter.emit("Log",msg)
        }
        cb("Log in");

        alert("Welcome "+this.state.userName);

        const ca = (msg) => {
            emitter.emit("Page",msg)
        }
        ca("Homepage");

        const cn = (msg) => {
            emitter.emit("User",msg)
        }
        cn(this.state.userName);
    }
    handleAdmin(){
        this.setState({
            logIn:true,
            register:false
        });
        const ca = (msg) => {
            emitter.emit("Admin",msg)
        }
        ca("Admin");
    }

    checkRegister(e){
        e.preventDefault();
        //alert("begin check Register!\n");
        var xmlhttp;

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        this.serverRequest = (xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //alert("regResponse!");
                var pwd = xmlhttp.responseText+"";
                pwd = pwd.replace( /^\s+|\s+$/g, "" );
                if(pwd.trim()=="ADDUSER"){
                    //alert("add!");
                    this.setState({
                        validUser:true,
                        validInfo:true
                    }, ()=>{
                        this.handleLog(); //new
                    });

                }else {
                    alert("invalid user");
                    this.setState({validUser:false});
                }
            }
        }.bind(this));
        xmlhttp.open("POST", "UserLog", false);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        console.log(xmlhttp);
        xmlhttp.send("user="+this.state.userName+"&pwd="+this.state.password+"&email="+this.state.emailAddr+"&phone="+this.state.phoneNum);

    }
    handleRegister(){
        this.setState({
            register:true,
            userName:"",
            password:""
        });
    }
    handleLogOut(e){
        this.setState({
            logIn:false,
            register:false,
            userName:"",
            password:"",
            phoneNum:"",
            emailAddr:"",
            validUser:true,
            validPwd:false,
            validEmail:true,
            validPhone:true,
            validInfo:false
        });
        const cb = (msg) => {
            emitter.emit("Log",msg)
        }
        cb("Log out");
        const cn = (msg) => {
            emitter.emit("User",msg)
        }
        cn("");
    }

    changePassword(e){
        var pwd = e.target.value;
        this.setState({password:pwd});
        if(!this.state.register){
            return;
        }
        if(pwd.length>=6){
            var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
            var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
            if (regNumber.test(pwd) && regString.test(pwd)) {
                console.log('pwd：验证成功');
                this.setState({validPwd:true});
                return;
            }
        }
        this.setState({validPwd:false});
    }
    changeUsr(e){
        this.setState({userName:e.target.value});
    }
    dealNum(e){
        var ss = e.target.value;
        ss = ss.replace(/\D/g,'');
        this.setState({phoneNum:ss});
    }
    changePhoneNum(e){
        var phone = e.target.value;
        this.setState({phoneNum:phone});
        if(phone.length==11){
            console.log('phone：验证成功');
            this.setState({validPhone:true});
            return;

        }
        this.setState({validPhone:false});
    }
    changeEmailAddr(e) {
        var email = e.target.value;
        this.setState({emailAddr: email});
        var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if (myReg.test(email)) {
            console.log('email：验证成功');
            this.setState({validEmail: true});
            return;
        }
        this.setState({validEmail: false});
    }
    renderLog(){
        if(this.state.logIn){
            return (
                <div>
                <p>Welcome{" "}{this.state.userName}!</p>
                <button onClick={this.handleLogOut}> Log out</button>
                </div>
            );
        }
        if(this.state.register){
            return (
                <div>
                <form id='f1' onSubmit={this.checkRegister}>
                    <label>
                        UserName:
                        <Input
                            type="text"
                            value={this.state.userName}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={this.changeUsr}
                            placeholder="Enter your username"/>
                        {this.state.validUser?"":<Alert
                            message="user already exists"
                            type="error"
                            showIcon
                        />}
                    </label>
                    <br/>
                    <label>
                        Password:
                        <Input
                            type="text"
                            value={this.state.password}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={this.changePassword}
                            placeholder="..."/>
                        {this.state.validPwd?"":<Alert
                            message="please combine letters with numbers"
                            type="warning"
                            showIcon
                        />}
                    </label>
                    <br/>
                    <label>
                        PhoneNumber:
                        <Input
                            type="text"
                            value={this.state.phoneNum}
                            prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={this.changePhoneNum}
                            placeholder="Enter your phone number"
                            onKeyUp={this.dealNum}/>
                        {this.state.validPhone?"":
                            <Alert
                                description="invalid phone number"
                                type="warning"
                                showIcon
                            />}
                    </label>
                    <br/>
                    <label>
                        EmailAddr:
                        <Input
                            type="text"
                            value={this.state.emailAddr}
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={this.changeEmailAddr}
                            placeholder="..."/>
                        {this.state.validEmail?"":
                            <Alert
                                description="invalid email address"
                                type="warning"
                                showIcon
                            />}
                    </label>
                    <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                            disabled={!(this.state.validEmail&&this.state.validPhone&&this.state.validPwd)}>
                        Register
                    </Button>
                </form>
            </div>
            );
        }
        return(
            <div>
                <p>New user please 
                    <Button onClick={this.handleRegister}> click here</Button>
                to register</p>
                <form onSubmit={this.checkLog}>
                    <label>
                        UserName:
                        <Input
                            type="text"
                            value={this.state.userName}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={this.changeUsr}
                            placeholder="Enter your username"/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <Input
                            type="password"
                            value={this.state.password}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={this.changePassword}
                            placeholder="Enter your password"/>
                    </label>
                    <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </form>
            </div>
        );
    }

    render(){
        if(!this.state.load){
            return <div></div>;
        }
        const log = this.renderLog();
        return (
            <div className="Log">
                {log}
            </div>
        );
    }
}

export default Log