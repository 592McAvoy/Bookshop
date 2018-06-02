import React from 'react';
import emitter from "./event";
import { Table } from 'react-bootstrap';

class Statistics extends React.Component{
    constructor(props){
        super(props);

        this.changeAuthor = this.changeAuthor.bind(this);
        this.changeCate = this.changeCate.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.select = this.select.bind(this);

        this.state = {
            load:false,
            predata:null,
            data:[],
            header:["username","time","category","title","author","price","amount"],
            userIdx:"",
            timeIdx:"",
            authorIdx:"",
            cateIdx:""
        }
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            console.log(msg);
            if(msg === "SalesStatistics"){
                this.setState({load:true})
            } else {
                this.setState({
                    load:false
                });
            }
        });

        $.ajax({
            url: "Sales",
            async: true,
            type: "get",
            success: function(data){
                //alert("manageBookGetResponse!");
                this.setState({
                    data: JSON.parse(data),
                });
            }.bind(this)
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);

    }
    changeUser(e){
        var idx = e.target.value;
        this.setState({
            userIdx:idx
        });
    }
    changeAuthor(e){
        var idx = e.target.value;
        this.setState({
            authorIdx:idx
        });
    }
    changeCate(e){
        var idx = e.target.value;
        this.setState({
            cateIdx:idx
        });
    }
    changeTime(e){
        var idx = e.target.value;
        this.setState({
            timeIdx:idx
        });
    }
    select(e){
        //时间统计还未实现
        e.preventDefault();
        var data;
        if(this.state.predata == null){
            data = this.state.data;
            this.setState({predata:data});
        }else{
            data = this.state.predata;
        }

        var newdata = data.filter(function (row) {
            return ((row.username.indexOf(this.state.userIdx)>-1)&&(row.category.indexOf(this.state.cateIdx)>-1)&&(row.author.indexOf(this.state.authorIdx)>-1))
        }, this);
        this.setState({data:newdata});

    }
    totalAmount(){
        var data = this.state.data;
        var len = data.length;
        var sum = 0;
        for(var i=0;i<len;i++){
            sum += data[i].amount;
        }
        return sum;
    }
    totalSales(){
        var data = this.state.data;
        var len = data.length;
        var sum = 0;
        for(var i=0;i<len;i++){
            sum += data[i].amount * data[i].price;
        }
        return sum;
    }


    renderSelect(){
        return(
            <form>
                <label>
                    Statistics for user:
                    <input type="text" value={this.state.userIdx} onChange={this.changeUser}/>
                </label>
                <br/>
                <label>
                    Statistics for author:
                    <input type="text" value={this.state.authorIdx} onChange={this.changeAuthor}/>
                </label>
                <br/>
                <label>
                    Statistics for category:
                    <input type="text" value={this.state.cateIdx} onChange={this.changeCate}/>
                </label>
                <br/>
                <select value={this.state.timeIdx} onChange={this.changeTime}>
                    <option value="All">--</option>
                    <option value="ByWeek">Recent One Week</option>
                    <option value="ByMonth">Recent One Month</option>
                </select>
                <button onClick={this.select}>SELECT</button>
            </form>
        );
    }

    renderTable(){
        return(
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    {
                        this.state.header.map(function(title,idx){
                            return <th key={idx}>{title}</th>;
                        },this)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    this.state.data.map(function(row,idx) {
                        return (
                            <tr key={idx} data-row={idx} >
                                <td data-row={idx}>{row.username}</td>
                                <td data-row={idx}>{row.time}</td>
                                <td data-row={idx}>{row.category}</td>
                                <td data-row={idx}>{row.title}</td>
                                <td data-row={idx}>{row.author}</td>
                                <td data-row={idx}>{row.price}</td>
                                <td data-row={idx}>{row.amount}</td>
                            </tr>
                        );

                    },this)
                }
                </tbody>
            </Table>
        );
    }

    render(){
        if(this.state.load){
            const table = this.renderTable();
            const select = this.renderSelect();

            return(
                <div className="ManageBook">
                    {select}{table}
                    <p>Total Amount:{"     "}{this.totalAmount()}</p>
                    <p>Total Sales:{"     $"}{this.totalSales()}</p>
                </div>
            );
        }
        else{
            return(<div></div>)
        }
    }


}

export default Statistics