import React from 'react';
import emitter from "./event";

class UserInfo extends React.Component{
    constructor(props){
        super(props);

        this.changeEdit = this.changeEdit.bind(this);
        this.changeIntro = this.changeIntro.bind(this);
        this.submitIntro = this.submitIntro.bind(this);
    
        this.state={
            load:false,
            name:"",
            introduction:"",
            edit:false,
            orderList:[]            
        }
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            if(msg != "User"){
                this.setState({load:false})
            } else{
                this.setState({load:true});  
            }         
        });
        this.eventEmitter1 = emitter.addListener("User",(name)=>{
            this.setState({name:name});        
        });
        this.eventEmitter1 = emitter.addListener("Order",(order)=>{
            var list = this.state.orderList;
            list.push(order);
            this.setState({orderList:list}); 
            //console.log(this.state.orderList);      
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
        emitter.removeListener(this.eventEmitter1);
    }

    changeIntro(e){
        this.setState({introduction:e.target.value});
    }
    submitIntro(e){
        e.preventDefault();
        this.setState({edit:false});
    }
    renderIntro(){
        if(this.state.edit){
            return(
                <form onSubmit={this.submitIntro}>
                    <label>Introduction:{'        '}
                        <input type="text" value={this.state.introduction} 
                        onChange={this.changeIntro}/>
                    </label>
                </form>
            )
        }
        else{
            return(<p>Introduction:{'        '}{this.state.introduction}</p>);
        }
    }

    changeEdit(e){
        var edit = this.state.edit;
        this.setState({edit:!edit});
    }
    renderInfo(){
        const intro = this.renderIntro();
        return(
            <div className="usrInfo">
                <h1>Personal Homepage</h1>
                <div id="icon"></div>
                <p>UserName:{'      '}{this.state.name}</p>
                <div onDoubleClick={this.changeEdit}>
                    {intro}
                </div>
            </div>
        );

    }

    renderOrder(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>No.</th><th>TotalCost</th><th>Time</th><th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.orderList.map((row,idx)=>{
                            var date = row.time;
                            var time = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+"  "+date.getHours()+":"+date.getMinutes();
                            return(
                                <tr key={idx}>
                                    <td>#{idx+1}</td>
                                    <td>${row.totalCost}</td>
                                    <td>{time}</td>
                                    <td>
                                        <ul>
                                            {
                                                row.content.map((rr,idx)=>{
                                                    var title = "<<"+rr.title+">>";
                                                    var author = rr.author;
                                                    var price = "$"+rr.price;
                                                    return(
                                                        <li key={idx}>{title+" -- By "+rr.author+" ---- "+price+" * "+rr.amount+" = $"+rr.cost}</li>
                                                    )
                                                },this)
                                            }
                                        </ul>
                                    </td>
                                </tr>
                            );
                        },this)
                    }
                </tbody>
            </table>
        );
    }
    
    render(){
        if(!this.state.load){
            return <div></div>;
        }
        const info = this.renderInfo();
        const orderTable = this.renderOrder();
        return (
            <div className="UserInfo">
                {info}{orderTable}
            </div>
        );
    }
}

export default UserInfo