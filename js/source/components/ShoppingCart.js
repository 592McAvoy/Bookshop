import React from 'react';
import emitter from "./event";

class ShoppingCart extends React.Component{
    constructor(props){
        super(props);

        this.totalCost = this.totalCost.bind(this);
        this.icrNum = this.icrNum.bind(this);
        this.dcrNum = this.dcrNum.bind(this);
        this.generateOrder = this.generateOrder.bind(this);

        this.state={
            load:false,
            list:[],
            record:new Array(10),
        }
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            if(msg != "Shopping"){
                this.setState({load:false})
            } else{
                this.setState({load:true});  
            }         
        });
        this.eventEmitter2 = emitter.addListener("Add",(item)=>{
            var list = this.state.list;
            var idx = list.indexOf(item);
            var record = this.state.record;
            if( idx > -1){
                if(record[idx] >= list[idx].stock){
                    alert("stock shortage!")
                }else{
                    record[idx] += 1;
                }
            }
            else{
                list.push(item);
                record[list.indexOf(item)] = 1;
            }

            this.setState({record:record});
            this.setState({list:list});
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
        emitter.removeListener(this.eventEmitter2);
    }

    totalCost(){
        var record = this.state.record;
        var list = this.state.list;
        var len = list.length;
        var sum = 0;
        for(var i=0;i<len;i++){
            sum += record[i] * list[i].price;
        }
        return sum;
    }
    icrNum(e){
        var idx = parseInt(e.target.dataset.row,10);
        var record = this.state.record;
        var list = this.state.list;
        record[idx] += 1;
        if(record[idx] > list[idx].stock){
            alert("stock shortage!")
            return;
        }
        this.setState({record:record})
    }
    dcrNum(e){
        var idx = parseInt(e.target.dataset.row,10);
        var record = this.state.record;
        var list = this.state.list;
        if(record[idx]>1){
            record[idx] -= 1;
        }
       else{
           record.splice(idx,1);
           list.splice(idx,1);
       }
        this.setState({
            record:record,
            list:list
        })
        
    }
    generateOrder(e){
        var sum = this.totalCost();
        if(sum <= 0){
            return;
        }
        var date = new Date();        
        var content = [];

        var record = this.state.record;
        var list = this.state.list;
        var len = list.length;
        for(var i=0;i<len;i++){
            var item = Object();
            item.title = list[i].title;
            item.author = list[i].author;
            item.price = list[i].price;
            item.amount = record[i];
            item.cost = list[i].price * record[i];
            content.push(item);
        }

        var order = Object();
        order.time = date;
        order.totalCost = sum;
        order.content = content;

        const co = (order) => {
            emitter.emit("Order",order)
        }
        co(order);
    }
    renderList(){
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>title</th><th>price</th><th>amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.list.map((row,idx)=>{
                                return(
                                <tr key={idx}>
                                    <td>{row.title}</td>
                                    <td>{"$"}{row.price}</td>
                                    <td>{this.state.record[idx]}</td>
                                    <td>
                                        <button data-row={idx} onClick={this.icrNum}>+</button>
                                        <button data-row={idx} onClick={this.dcrNum}>-</button>
                                    </td>
                                </tr>
                                )
                            },this)
                        }
                    </tbody>
                </table>
                <p>Total Cost:{"     $"}{this.totalCost()}</p>
                <br/>
                <button id="bb" onClick={this.generateOrder}>->Gengerate Order</button>
            </div>
        )
    }
    render(){
        if(!this.state.load){
            return <div></div>;
        }
        const buyList = this.renderList();
        return (
            <div className="ShoppingCart">
                <h1>Your Shopping Cart</h1>
                {buyList}
            </div>
        );
    }
}

export default ShoppingCart