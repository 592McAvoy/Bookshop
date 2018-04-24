import React from 'react';
import emitter from "./event";

class ManageBook extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            load:false
        };
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            if(msg == "ManageBook"){
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
                <div className="ManageBook">
                    book manager
                </div>
            );
        }
        else{
            return(<div></div>)
        }
    }
}

export default ManageBook