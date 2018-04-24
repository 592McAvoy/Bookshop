import React from 'react';
import emitter from "./event";

class ManageUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            load:false
        };
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            console.log(msg);
            if(msg == "ManageUser"){
                this.setState({load:true})
            } else {
                this.setState({
                    load:false
                });
            }
        });

    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);

    }

    render(){
        if(this.state.load){
            return(
                <div className="ManageUser">
                    user manager
                </div>
            );
        }
        else{
            return(<div></div>)
        }
    }
}

export default ManageUser