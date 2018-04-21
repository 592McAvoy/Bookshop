import React from 'react';
import emitter from "./event";

class Log extends React.Component{
    constructor(props){
        super(props);

        this.handleLog = this.handleLog.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeUsr = this.changeUsr.bind(this);
        this.changeEmailAddr = this.changeEmailAddr.bind(this);
        this.changePhoneNum = this.changePhoneNum.bind(this);

        this.state={
            load:false,
            logIn:false,
            register:false,
            userName:"my friend",
            password:"",
            phoneNum:"",
            emailAddr:""
        }
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

    handleLog(e){
        e.preventDefault();
        this.setState({logIn:true});

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
    handleRegister(e){
        this.setState({register:true});
    }
    handleLogOut(e){
        this.setState({
            logIn:false,
            register:false
        });
        const cb = (msg) => {
            emitter.emit("Log",msg)
        }
        cb("Log out");
    }
    changePassword(e){
        this.setState({password:e.target.value});
    }
    changeUsr(e){
        this.setState({userName:e.target.value});
    }
    changePhoneNum(e){
        this.setState({phoneNum:e.target.value});
    }
    changeEmailAddr(e){
        this.setState({emailAddr:e.target.value});
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
                <form id='f1' onSubmit={this.handleLog}>
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
                    <label>
                        PhoneNumber:<input type="text" value={this.state.phoneNum} 
                        onChange={this.changePhoneNum} placeholder="..."/>
                    </label>
                    <br/>
                    <label>
                        EmailAddr:<input type="text" value={this.state.emailAddr} 
                        onChange={this.changeEmailAddr} placeholder="..."/>
                    </label>
                    <br/>
                    <input type="submit" value="Register"/>                    
                </form>
            </div>
            );
        }
        return(
            <div>
                <p>New user please 
                    <button onClick={this.handleRegister}> click here</button>
                to register</p>
                <form onSubmit={this.handleLog}>
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