import React from 'react';
import emitter from "./event";

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
            userName:"my friend",
            password:"",
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
        alert("begin check log!\n");
        /*
        $.ajax({
            url: "UserLog",
            async: false,
            data: "un="+this.state.userName,
            type: "get",
            success: function(pwd){
                alert("Response!");

                pwd = pwd.replace( /^\s+|\s+$/g, "" );
                if(this.state.password.trim()==pwd.trim()){
                    alert("correct password!\n");
                    this.handleLog();
                }else if(pwd.trim()=="USERERROR"){
                    alert("user doesn't exist!")
                }else{
                    alert("false password!");
                }
            }.bind(this)
        });*/

        var xmlhttp;

        if (window.XMLHttpRequest) {
           xmlhttp = new XMLHttpRequest();
        } else {
           xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        this.serverRequest = (xmlhttp.onreadystatechange = function() {
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               alert("Response!");
               var pwd = xmlhttp.responseText+"";
               pwd = pwd.replace( /^\s+|\s+$/g, "" );
               if(this.state.password.trim()==pwd.trim()){
                   alert("correct password!\n");
                   this.handleLog();
               }else if(pwd.trim()=="USERERROR"){
                   alert("user doesn't exist!")
               }else{
                   alert("false password!");
               }
           }
        }.bind(this));
        xmlhttp.open("GET", "UserLog?un="+this.state.userName, false);
        //console.log(xmlhttp);
        xmlhttp.send();

    }
    handleLog(){
        //alert("I am called!");
        if(this.state.register){
            console.log("validInfo: "+this.state.validInfo);
            if(!this.state.validInfo){
                console.log("invalid validinfo");
                return;
            }
        }

        this.setState({
            logIn:true,
            register:false
        });
        //console.log("1");
        const cb = (msg) => {
            emitter.emit("Log",msg)
        }
        cb("Log in");
        alert("Welcome "+this.state.userName);
        //console.log("2");
        const ca = (msg) => {
            emitter.emit("Page",msg)
        }
        ca("Homepage");
        //console.log("3");
        const cn = (msg) => {
            emitter.emit("User",msg)
        }
        cn(this.state.userName);
        //alert("log end! success!");
    }

    checkRegister(e){
        e.preventDefault();
        alert("begin check Register!\n");
        /*
        $.ajax({
            url: "UserLog",
            async: false,
            data: "user="+this.state.userName+"&pwd="+this.state.password+"&email="+this.state.emailAddr+"&phone="+this.state.phoneNum,
            type: "post",
            success: function(pwd){
                alert("regResponse!");
                //var pwd = xmlhttp.responseText+"";
                pwd = pwd.replace( /^\s+|\s+$/g, "" );
                if(pwd.trim()=="ADDUSER"){
                    alert("add!");
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
            }.bind(this)
        });*/

        var xmlhttp;

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        this.serverRequest = (xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                alert("regResponse!");
                var pwd = xmlhttp.responseText+"";
                pwd = pwd.replace( /^\s+|\s+$/g, "" );
                if(pwd.trim()=="ADDUSER"){
                    alert("add!");
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
            userName:"my friend",
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
        if (email.indexOf("@") > 1) {
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
                        UserName:<input type="text" value={this.state.userName} 
                        onChange={this.changeUsr} placeholder="..."/>
                        <span id="s1">{this.state.validUser?"":"user already exists"}</span>
                    </label>
                    <br/>
                    <label>
                        Password:<input type="text" value={this.state.password} 
                        onChange={this.changePassword} placeholder="..."/>
                        <span id="s2">{this.state.validPwd?"":"please combine letters with numbers"}</span>
                    </label>
                    <br/>
                    <label>
                        PhoneNumber:<input type="text" value={this.state.phoneNum} 
                        onChange={this.changePhoneNum} placeholder="..."
                        onKeyUp={this.dealNum}/>
                        <span id="s3">{this.state.validPhone?"":"invalid phone number"}</span>
                    </label>
                    <br/>
                    <label>
                        EmailAddr:<input type="text" value={this.state.emailAddr} 
                        onChange={this.changeEmailAddr} placeholder="..."/>
                        <span id="s4">{this.state.validEmail?"":"invalid email address"}</span>
                    </label>
                    <br/>
                    <input type="submit" value="Register"
                           disabled={!(this.state.validEmail&&this.state.validPhone&&this.state.validPwd)}/>
                </form>
            </div>
            );
        }
        return(
            <div>
                <p>New user please 
                    <button onClick={this.handleRegister}> click here</button>
                to register</p>
                <form onSubmit={this.checkLog}>
                    <label>
                        UserName:<input type="text" value={this.state.userName} 
                        onChange={this.changeUsr} placeholder="..."/>
                    </label>
                    <br/>
                    <label>
                        Password:<input type="text" value={this.state.password} 
                        onChange={this.changePassword} placeholder="..."/>
                    </label>
                    <br/>
                    <input type="submit" value="Log In"/>                    
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