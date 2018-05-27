import React from 'react';
import emitter from "./event";
import { Table } from 'react-bootstrap';
import { Button, Icon} from 'antd';
const ButtonGroup = Button.Group;

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
            name:""
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
        this.eventEmitter1 = emitter.addListener("User",(name)=>{
            this.setState({name:name});
            $.ajax({
                url: "Cart",
                async: true,
                data:{name:name},
                type: "get",
                success: function(data){
                    //alert("cartResponse!");
                    this.setState({
                        list: JSON.parse(data),
                    });
                }.bind(this)
            });
        });
        this.eventEmitter2 = emitter.addListener("Add",(item)=>{
            if(this.state.name == ""){
                return;
            }
            var list = this.state.list;
            var idx = list.indexOf(item);
            //var record = this.state.record;
            if( idx > -1){
                if(list[idx].amount >= list[idx].stock){
                    alert("stock shortage!")
                    return;
                }else{
                    list[idx].amount += 1;
                }
            }
            else{
                list.push(item);
                list[list.indexOf(item)].amount = 1;
            }
            $.ajax({
                url: "Cart",
                async: true,
                data:{
                    name:this.state.name,
                    id:item.id+"",
                    amount:"1"
                },
                type: "post",
                success: function(data){
                    //alert("addResponse!");
                }.bind(this)
            });

            //this.setState({record:record});
            this.setState({list:list});
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
        emitter.removeListener(this.eventEmitter1);
        emitter.removeListener(this.eventEmitter2);
    }

    totalCost(){
        //var record = this.state.record;
        var list = this.state.list;
        var len = list.length;
        var sum = 0;
        for(var i=0;i<len;i++){
            sum += list[i].amount * list[i].price;
        }
        return sum;
    }
    icrNum(e){
        var idx = parseInt(e.target.dataset.row,10);
        //var record = this.state.record;
        var list = this.state.list;
        var n = list[idx].amount;
        n += 1;
        //record[idx] += 1;
        if(n > list[idx].stock){
            alert("stock shortage!")
            return;
        }
        $.ajax({
            url: "Cart",
            async: true,
            data:{
                name:this.state.name,
                id:list[idx].id+"",
                amount:"1"
            },
            type: "post",
            success: function(data){
                //alert("addResponse!");
            }.bind(this)
        });
        list[idx].amount += 1;
        this.setState({list:list})
    }
    dcrNum(e){
        var idx = parseInt(e.target.dataset.row,10);
        var list = this.state.list;
        //var record = this.state.record;
        $.ajax({
            url: "Cart",
            async: true,
            data:{
                name:this.state.name,
                id:list[idx].id+"",
                amount:"-1"
            },
            type: "post",
            success: function(data){
                //alert("dcrResponse!");
            }.bind(this)
        });

        var n = list[idx].amount;
        if(n>1){
            n -= 1;
            list[idx].amount -= 1;
        }
       else{
           //record.splice(idx,1);
           list.splice(idx,1);
       }

        this.setState({
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

        var order = Object();
        order.time = date.getFullYear()+"/"+(1+date.getMonth())+"/"+date.getDate()+"  "+date.getHours()+":"+date.getMinutes();
        order.totalCost = sum;

        var list = this.state.list;
        var len = list.length;
        for(var i=0;i<len;i++){
            var item = Object();
            item.bookid = list[i].id;
            item.title = list[i].title;
            item.author = list[i].author;
            item.price = list[i].price;
            item.amount = list[i].amount;
            item.cost = list[i].price * list[i].amount;
            content.push(item);
            $.ajax({
                url: "Sales",
                async: true,
                data:{
                    username:this.state.name,
                    time:order.time,
                    category:list[i].category,
                    title:item.title,
                    author:item.author,
                    price:item.price,
                    amount:item.amount
                },
                type: "post",
                success: function(data){
                    //alert("addSalesResponse!");
                }.bind(this)
            });
        }

        order.content = content;

        $.ajax({
            url: "Order",
            async: true,
            data:{
                name:this.state.name,
                time:order.time,
                cost:order.totalCost,
                content:JSON.stringify(order.content)
            },
            type: "post",
            success: function(data){
                //alert("addOrderResponse!");
            }.bind(this)
        });

        const co = (order) => {
            emitter.emit("Order",order)
        }
        co(order);
    }
    renderList(){
        return(
            <div>
                <Table striped bordered condensed hover>
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
                                    <td>{row.amount}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button type="primary" data-row={idx} onClick={this.icrNum}>
                                                <Icon type="plus" />Add
                                            </Button>
                                            <Button type="dashed" data-row={idx} onClick={this.dcrNum}>
                                                <Icon type="minus" />
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                )
                            },this)
                        }
                    </tbody>
                </Table>
                <p>Total Cost:{"     $"}{this.totalCost()}</p>
                <br/>
                <Button id="bb" type="primary" onClick={this.generateOrder}>Gengerate Order
                    <Icon type="double-right" /></Button>
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