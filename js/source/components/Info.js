import React from 'react';
import emitter from "./event";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';


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
                <Menu className="Info">
                    <Menu.Item href='#' onClick = {cb("ManageBook")}>Manage Book</Menu.Item>
                    <Menu.Item href='#' onClick = {cb("ManageUser")}>Manage User</Menu.Item>
                    <Menu.Item href='#' onClick = {cb("SalesStatistics")}>Sales Statistics</Menu.Item>
                    <Menu.Item href='#' onClick = {cb("Log")}>Log out</Menu.Item>
                </Menu>
            );
        }
        if(this.state.isLog){
            return(
                <Menu mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }} className="Info">
                    <Menu.Item href='#' onClick = {cb("Homepage")}>Homepage</Menu.Item>
                    <Menu.Item href='#' onClick = {cb("Shopping")}>Shopping Cart</Menu.Item>
                    <Menu.Item href='#' onClick = {cb("User")}>UserInfo</Menu.Item>
                    <Menu.Item href='#' onClick = {cb("Log")}>Log out</Menu.Item>
                </Menu>
            );
        }
        else{
            return(
                <Menu mode="horizontal"
                      defaultSelectedKeys={['2']}
                      style={{ lineHeight: '64px' }} className="Info">
                    <Menu.Item href='#' onClick = {cb("Homepage")}>Homepage</Menu.Item>
                    <Menu.Item href='#' onClick = {cb("Log")}>Log in</Menu.Item>
                </Menu>
            );
        }
    }
}

export default Info