import React from 'react';
import emitter from "./event";

class BookTable extends React.Component{
    constructor(props){
        super(props);

        this.changeCategory = this.changeCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSeniorSearch = this.handleSeniorSearch.bind(this);
        this.changeSelectIdx = this.changeSelectIdx.bind(this);
        this.changeLow = this.changeLow.bind(this);
        this.changeHigh = this.changeHigh.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.clearSelect = this.clearSelect.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.addItem = this.addItem.bind(this);

        this.state = {
            load:true,
            data: this.props.initialData,
            preData:null,
            category:"Poem",
            searchIdx:"",
            seniorSearch:false,
            selectIdx:"price",
            low:0,
            high:9999,
            sortIdx:null,
            descending:false,
            isLog:false
        };
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            if(msg != "Homepage"){
                this.setState({load:false})
            } else{
                this.setState({load:true});  
            }         
        });
        this.eventEmitter1 = emitter.addListener("Log",(msg)=>{
            if(msg == "Log in"){
                this.setState({isLog:true})
            } else if(msg == "Log out"){
                this.setState({isLog:false});  
            }         
        });

        $.ajax({
            url: "getBook",
            async: true,
            type: "get",
            success: function(data){
                alert("bookResponse!");
                this.setState({
                    data: JSON.parse(data),
                });
            }.bind(this)
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
        emitter.removeListener(this.eventEmitter1);
    }
    
    changeCategory(e){
        var newCate = e.target.firstChild.data;//.firstChild是一个文本节点，要获取里面的文本内容要用.data
        this.setState({category:newCate});
    }
    renderCategory(){
        return(
            <div className="Category">
                <ul onClick={this.changeCategory}>                
                    {
                        this.props.category.map(function(item,idx){
                            return  <li key={idx}>{item}</li>;
                        },this)
                    }
                </ul>
            </div>
        );
    }

    
    handleChange(e){
        var newIdx = e.target.value;
        this.setState({searchIdx:newIdx});
    }
    handleSeniorSearch(e){
        var s = !this.state.seniorSearch;
        this.setState({
            seniorSearch:s
        })
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.preData == null){
            this.state.preData = this.state.data;
        }
        var oldData = this.state.preData;
        var searchData = oldData.filter(function(row){
            var idx = this.state.searchIdx;
            return(
                (row.title.indexOf(idx)>-1)||(row.auther.indexOf(idx)>-1)
            );
        },this);
        this.setState({data:searchData});
    }
    changeSelectIdx(e){
        this.setState({selectIdx:e.target.value});
    }
    changeLow(e){
        this.setState({low:e.target.value})
    }
    changeHigh(e){
        this.setState({high:e.target.value})
    }
    handleSelect(e){
        e.preventDefault();
        if(this.state.preData == null){
            this.state.preData = this.state.data;
        }
        var oldData = this.state.data;
        var selectData = null;
        var idx = this.state.selectIdx;
        var low = Number(this.state.low);
        var high = Number(this.state.high);
        
        if(idx === "price"){
            selectData = oldData.filter(function(row){
                return (low <= Number(row.price) && Number(row.price)<= high);
            },this);
        }
        else{
            selectData = oldData.filter(function(row){
                return (low <= Number(row.publish) && Number(row.publish)<= high);
            },this);
        }
        this.setState({data:selectData});
    }
    clearSelect(e){
        if(this.state.preData == null){
            return;
        }
        this.setState({
            low:0,
            high:9999,
            data:this.state.preData,
            preData:null
        })
    }
    renderSeniorSearch(){
        if(this.state.seniorSearch){
            return(
                <form id='f2' onSubmit={this.handleSelect}>
                    <select value={this.state.selectIdx} onChange={this.changeSelectIdx}>
                        <option value="price">Price</option>
                        <option value="publish">Publish</option>
                    </select>
                    <input id='min' type="text" placeholder=".." value={this.state.low}
                    onChange={this.changeLow}/>
                    <label>~</label>
                    <input id='max' type="text" placeholder=".." value={this.state.high}
                    onChange={this.changeHigh}/>
                    <input type="submit" value="OK" />
                    <button onClick={this.clearSelect}>Clear</button>
                </form>
            );
        }
        else{
            return <span></span>;
        }
    }
    renderSearch(){
        const senior = this.renderSeniorSearch();
        return (
            <div className="searchTool">
                <form id='f1' onSubmit={this.handleSubmit}>
                    <input id='i1' type="text" placeholder="..." value={this.state.searchIdx} 
                    onChange={this.handleChange} />
                    <input id='i2' type="submit" value="Search" />
                    <button onClick={this.handleSeniorSearch}>{this.state.seniorSearch?"/\\":"\\/"}</button>
                </form> 
                {senior}
            </div>
                       
          );
    }

    handleSort(e){
        var idx = e.target.cellIndex;
        var attr = this.props.headers[idx];
        var desc = this.state.descending;
        var oldData = this.state.data;
        var sortData = oldData.sort(function(a,b){
            return desc?a[attr] < b[attr]:a[attr] > b[attr];
        },this);
        desc = !desc;
        this.setState({
            data:sortData,
            descending:desc,
            sortIdx:idx
        });
    }
    addItem(e){
        if(!this.state.isLog){
            alert("Please log in first!"); 
            const cb = (msg) => {
                    emitter.emit("Page",msg)
            }
            cb("Log");                       
        }
        var idx = parseInt(e.target.dataset.row,10);
        var data = this.state.data;
        var item = data[idx];
        const cb = (item) => {
            emitter.emit("Add",item)
        }
        cb(item);
    }
    renderTable(){
        return(
            <table>
                <thead onClick={this.handleSort}>
                    <tr> 
                        {
                            this.props.headers.map(function(header,idx){
                                var temp = "";
                                if(this.state.sortIdx == idx){
                                    temp += this.state.descending ? ' \u2191' : ' \u2193';
                                }
                                return <th key={idx}>{header}{temp}</th>;
                            },this)
                        }                    
                    </tr>
                </thead>
                <tbody>
                    {   
                        this.state.data.map(function(row,idx){                          
                            if(this.state.category != row.category){
                                return;
                            }
                            return(
                                <tr key={idx}>
                                    <td>{row.title}</td>
                                    <td>{row.auther}</td>
                                    <td>{"$"}{row.price}</td>
                                    <td>{row.publish}</td>
                                    <td><a data-row={idx} href='#' onClick={this.addItem}>Add</a></td>
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
        const cate = this.renderCategory();
        const table = this.renderTable();
        const search = this.renderSearch();
        return(
            <div className="BookTable">
                {cate}{search}{table}
            </div>
        );
    }

   
}

export default BookTable