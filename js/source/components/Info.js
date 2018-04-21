import React from 'react';
import emitter from "./event";

class Info extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLog:false
        };
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Log",(msg)=>{
            if(msg == "Log in"){
                this.setState({isLog:true})
            } else if(msg == "Log out"){
                this.setState({isLog:false});  
            }         
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }

    render(){
        const cb = (msg) => {
            return ()=>{
                emitter.emit("Page",msg)
            }
        }
        if(this.state.isLog){
            return(
                <div className="Info">
                    <a href='#' onClick = {cb("Homepage")}>Homepage</a>
                    <a href='#' onClick = {cb("Shopping")}>Shopping Cart</a>
                    <a href='#' onClick = {cb("User")}>UserInfo</a>
                    <a href='#' onClick = {cb("Log")}>Log out</a>
                </div>
            );
        }
        else{
            return(
                <div className="Info">
                    <a href='#' onClick = {cb("Homepage")}>Homepage</a>
                    <a href='#' onClick = {cb("Log")}>Log in</a>
                </div>
            );
        }
    }
}

export default Info