import React from 'react';
import emitter from "./event";

class Info extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLog:false,
            isAdmin:false
        };
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Log",(msg)=>{
            if(msg == "Log in"){
                this.setState({isLog:true})
            } else if(msg == "Log out"){
                this.setState({
                    isLog:false,
                    isAdmin:false
                });
            }         
        });
        this.eventEmitter1 = emitter.addListener("Admin",(msg)=>{
            if(msg == "Admin"){
                this.setState({isAdmin:true})
            } else{
                this.setState({isAdmin:false});
            }
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
        emitter.removeListener(this.eventEmitter1);
    }

    render(){
        const cb = (msg) => {
            return ()=>{
                emitter.emit("Page",msg)
            }
        }
        if(this.state.isAdmin){
            return(
                <div className="Info">
                    <a href='#' onClick = {cb("ManageBook")}>Manage Book</a>
                    <a href='#' onClick = {cb("ManageUser")}>Manage User</a>
                    <a href='#' onClick = {cb("SalesStatistics")}>Sales Statistics</a>
                    <a href='#' onClick = {cb("Log")}>Log out</a>
                </div>
            );
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