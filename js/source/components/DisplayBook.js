import React from 'react';
import emitter from "./event";

class DisplayBook extends React.Component{
    constructor(props){
        super(props);

        this.addItem = this.addItem.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state = {
            load:false,
            log:false,
            book:null
        };
    }


    componentDidMount(){
        this.eventEmitter = emitter.addListener("display",(item,log)=>{
            this.setState({
                load:true,
                book:item,
                log:log
            });
        });
        this.eventEmitter1 = emitter.addListener("Page",(msg)=> {
            this.setState({load: false});
        });

    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
        emitter.removeListener(this.eventEmitter1);
    }

    addItem(e){
        if(!this.state.log){
            alert("Please log in first!");
            const cb = (msg) => {
                emitter.emit("Page",msg)
            }
            this.setState({load:false});
            cb("Log");
        }

        var book = this.state.book;

        const cb = (item) => {
            emitter.emit("Add",item)
        }
        cb(book);
    }
    goBack(e){
        const cb = (msg) => {
            emitter.emit("Page",msg)
        }
        this.setState({load:false});
        cb("Homepage");
    }
    render() {
        var book = this.state.book;
        if(!this.state.load){
            return <div></div>;
        }
        else{
            return(
                <div>
                    <img src={book.img} width="200px" height="400px"/>
                    <ul>
                        <li>{"Title "+book.title}</li>
                        <li>{"Author "+book.author}</li>
                        <li>{"Publish year "+book.publish}</li>
                        <li>{"Price: $"+book.price}</li>
                    </ul>
                    <button onClick={this.addItem}>Add</button>
                    <button onClick={this.goBack}>Go Back</button>
                </div>
            );
        }
    }
}

export default DisplayBook