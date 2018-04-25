import React from 'react';
import emitter from "./event";

class ManageBook extends React.Component{
    constructor(props){
        super(props);

        this.changeId = this.changeId.bind(this);
        this.changeCate = this.changeCate.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeAuthor = this.changeAuthor.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changePublish = this.changePublish.bind(this);
        this.changeStock = this.changeStock.bind(this);
        this.changeImg = this.changeImg.bind(this);
        this.doModify = this.doModify.bind(this);
        this.doEdit = this.doEdit.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.doAdd = this.doAdd.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.changeSelectIdx = this.changeSelectIdx.bind(this);
        this.search = this.search.bind(this);
        this.fresh = this.fresh.bind(this);

        this.state = {
            load:false,
            edit:false,
            editrow:0,
            data:[],
            header:["id","category","title","author","price","publish","stock","img"],
            id:0,
            category:"",
            title:"",
            author:"",
            price:0,
            publish:0,
            stock:0,
            img:"",
            selectIdx:"Id",
            searchIdx:0,
            predata:null
        };
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            console.log(msg);
            if(msg === "ManageBook"){
                this.setState({load:true})
            } else {
                this.setState({
                    load:false
                });
            }
        });

        $.ajax({
            url: "manageBook",
            async: true,
            type: "get",
            success: function(data){
                alert("manageBookGetResponse!");
                this.setState({
                    data: JSON.parse(data),
                });
            }.bind(this)
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);

    }

    doEdit(e){
        var row = parseInt(e.target.dataset.row, 10);
        var data = this.state.data[row];
        this.setState({
            edit:true,
            editrow:row,
            id:data.id,
            category:data.category,
            title:data.title,
            author:data.author,
            price:data.price,
            publish:data.publish,
            stock:data.stock,
            img:data.img
        });
    }
    changeId(e){
        var id = e.target.value;
        this.setState({id:id});
    }
    changeCate(e){
        var cate = e.target.value;
        this.setState({category:cate});
    }
    changePrice(e){
        var r = parseInt(e.target.value,10);
        this.setState({price:r});
    }
    changeAuthor(e){
        var p = e.target.value;
        this.setState({author:p});
    }
    changeTitle(e){
        var a = e.target.value;
        this.setState({title:a});
    }
    changePublish(e){
        var s = parseInt(e.target.value,10);
        this.setState({publish:s});
    }
    changeStock(e){
        var s = parseInt(e.target.value,10);
        this.setState({stock:s});
    }
    changeImg(e){
        var a = e.target.value;
        this.setState({img:a});
    }
    doModify(e){
        $.ajax({
            url: "manageBook",           
            async: true,
            type: "post",
            data:{
                operation:"update",
                id:this.state.id+"",
                category:this.state.category,
                title:this.state.title,
                author:this.state.author,
                price:this.state.price+"",
                publish:this.state.publish+"",
                stock:this.state.stock+"",
                img:this.state.img
            },
            success: function(){
                alert("manageBookModifyResponse!");

            }.bind(this)
        });

        var data = this.state.data;
        var row = {};
        row.id=this.state.id;
        row.category=this.state.category;
        row.title=this.state.title;
        row.author=this.state.author;
        row.price=this.state.price;
        row.publish=this.state.publish;
        row.stock=this.state.stock;
        row.img=this.state.img;
        data[this.state.editrow] = row;

        this.setState({
            edit:false,
            data:data
        })
    }
    doDelete(e){
        var data = this.state.data;
        var idx = parseInt(e.target.dataset.row, 10);
        var row = data[idx];

        $.ajax({
            url: "manageBook",
            async: true,
            type: "post",
            data:{
                operation:"delete",
                id:row.id+"",
            },
            success: function(){
                alert("manageBookDeleteResponse!");

            }.bind(this)
        });

        data.splice(idx,1);
        this.setState({
            data:data
        })
    }
    doAdd(e){
        e.preventDefault();
        $.ajax({
            url: "manageBook",
            async: true,
            type: "post",
            data:{
                operation:"insert",
                id:this.state.id+"",
                category:this.state.category,
                title:this.state.title,
                author:this.state.author,
                price:this.state.price+"",
                publish:this.state.publish+"",
                stock:this.state.stock+"",
                img:this.state.img
            },
            success: function(){
                alert("manageBookAddResponse!");

            }.bind(this)
        });
        var data = this.state.data;
        var row = {};
        row.id=this.state.id;
        row.category=this.state.category;
        row.title=this.state.title;
        row.author=this.state.author;
        row.price=this.state.price;
        row.publish=this.state.publish;
        row.stock=this.state.stock;
        row.img=this.state.img;
        if(data.indexOf(row)<0) {
            data.push(row);
        }
        this.setState({
            data:data
        })
    }
    changeSearch(e){
        var idx = e.target.value;
        this.setState({searchIdx:idx});
    }
    search(e){
        e.preventDefault();
        var data;
        var select = this.state.selectIdx;
        var idx = this.state.searchIdx;

        if(this.state.predata == null){
            console.log("predata: "+this.state.predata);
            data = this.state.data;
            this.setState({predata:data});
        }else{
            data = this.state.predata;
        }
        console.log("data: "+data);
        if(idx !== ""){
            if(select === "Id") {
                var id = parseInt(idx,10);
                var newdata = data.filter(function (row) {
                    return row.id == id;
                }, this);
            }
            else{
                var newdata = data.filter(function (row) {
                    return row.title.indexOf(idx)>-1;
                }, this);
            }
            this.setState({data:newdata});
        }
        else{
            console.log("reach here");
            var data = this.state.predata;
            if(data!=null) {
                this.setState({
                    data: data,
                    predata: null
                })
            }
        }
    }
    fresh(e){
        e.preventDefault();
        $.ajax({
            url: "manageBook",
            async: true,
            type: "get",
            success: function(data){
                alert("manageBookFreshResponse!");
                this.setState({
                    data: JSON.parse(data),
                });
            }.bind(this)
        });
    }
    changeSelectIdx(e){
        this.setState({selectIdx:e.target.value});
    }

    renderSearch(){
        console.log("renderSearch")
        return(
            <form>
                <select value={this.state.selectIdx} onChange={this.changeSelectIdx}>
                    <option value="Id">Id</option>
                    <option value="Title">Title</option>
                </select>
                <label>
                    {this.state.selectIdx+": "}<input type="text" value={this.state.searchIdx} onChange={this.changeSearch}/>
                </label>
                <button onClick={this.search}>search</button>

            </form>
        );
    }
    renderAdd(){
        return(
            <form >
                <label>
                    category:<input type="text" value={this.state.category}
                                 onChange={this.changeCate}/>
                </label>
                <label>
                    title:<input type="text" value={this.state.title}
                                 onChange={this.changeTitle}/>
                </label>
                <label>
                    author:<input type="text" value={this.state.author}
                                 onChange={this.changeAuthor}/>
                </label>
                <label>
                    price:<input type="text" value={this.state.price}
                                 onChange={this.changePrice}/>
                </label>
                <label>
                    publish:<input type="text" value={this.state.publish}
                                 onChange={this.changePublish}/>
                </label>
                <label>
                    stock:<input type="text" value={this.state.stock}
                                   onChange={this.changeStock}/>
                </label>
                <label>
                    img:<input type="text" value={this.state.img}
                                   onChange={this.changeImg}/>
                </label>
                <button onClick={this.doAdd}>add</button>
            </form>

        );
    }
    renderTable(){
        return(
            <table>
                <thead>
                <tr>
                    {
                        this.state.header.map(function(title,idx){
                            return <th key={idx}>{title}</th>;
                        },this)
                    }
                    <th><button onClick={this.fresh}>fresh</button></th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.data.map(function(row,idx){
                        if(this.state.edit && (this.state.editrow === idx)){
                            return (
                                <tr key={idx}>
                                    <td>
                                        <input type="text" value={this.state.id}
                                                  onChange={this.changeId}/>
                                    </td>
                                    <td>
                                        <input type="text" value={this.state.category}
                                                        onChange={this.changeCate}/>
                                    </td>
                                    <td>
                                        <input type="text" value={this.state.title}
                                                     onChange={this.changeTitle}/>
                                    </td>
                                    <td>
                                       <input type="text" value={this.state.author}
                                                      onChange={this.changeAuthor}/>
                                    </td>
                                    <label>
                                        <input type="text" value={this.state.price}
                                                     onChange={this.changePrice}/>
                                    </label>
                                    <td>
                                        <input type="text" value={this.state.publish}
                                                       onChange={this.changePublish}/>
                                    </td>
                                    <td>
                                        <input type="text" value={this.state.stock}
                                                     onChange={this.changeStock}/>
                                    </td>
                                    <td>
                                        <input type="text" value={this.state.img}
                                                   onChange={this.changeImg}/>
                                    </td>
                                    <td>
                                        <button data-row={idx} onClick={this.doModify}>OK</button>
                                    </td>
                                </tr>
                            );
                        }
                        else {
                            return (
                                <tr key={idx} data-row={idx} onDoubleClick={this.doEdit}>
                                    <td data-row={idx}>{row.id}</td>
                                    <td data-row={idx}>{row.category}</td>
                                    <td data-row={idx}>{row.title}</td>
                                    <td data-row={idx}>{row.author}</td>
                                    <td data-row={idx}>{row.price}</td>
                                    <td data-row={idx}>{row.publish}</td>
                                    <td data-row={idx}>{row.stock}</td>
                                    <td data-row={idx}>{row.img}</td>
                                    <td>
                                        <button data-row={idx} onClick={this.doDelete}>delete</button>
                                    </td>
                                </tr>
                            );
                        }
                    },this)
                }
                </tbody>
            </table>
        );
    }

    render(){
        if(this.state.load){
            const table = this.renderTable();
            const search = this.renderSearch();
            const add = this.renderAdd();
            return(
                <div className="ManageBook">
                    {search}
                    <br/>
                    {add}
                    {table}
                </div>
            );
        }
        else{
            return(<div></div>)
        }
    }
}

export default ManageBook