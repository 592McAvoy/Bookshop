import React from 'react';
import emitter from "./event";
import { Button, Icon } from 'antd';
import { Layout, Menu, Form, Input } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
const InputGroup = Input.Group;
import { Table } from 'react-bootstrap';

class BookTable extends React.Component{
    constructor(props){
        super(props);

        this.changeCategory = this.changeCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSeniorSearch = this.handleSeniorSearch.bind(this);
        this.changeSelectIdx = this.changeSelectIdx.bind(this);
        this.changeLow = this.changeLow.bind(this);
        this.changeHigh = this.changeHigh.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.clearSelect = this.clearSelect.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.addItem = this.addItem.bind(this);
        this.doFresh = this.doFresh.bind(this);
        this.display = this.display.bind(this);

        this.state = {
            load:true,
            data: [],
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
                //alert("bookResponse!");
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
        //var newCate = e.target.firstChild.data;//.firstChild是一个文本节点，要获取里面的文本内容要用.data
        var idx = parseInt(e.key,10);
        var newCate = this.props.category[idx];
        this.setState({category:newCate});
    }
    renderCategory(){
        return(
            <Sider className="Category">
                <Menu mode="inline"
                      defaultSelectedKeys={['']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%', borderRight: 0 }}
                      onClick={this.changeCategory}>
                    {
                        this.props.category.map(function(item,idx){
                            return  <Menu.Item key={idx} data-row={idx} >
                                {item}</Menu.Item>;
                        },this)
                    }
                </Menu>
            </Sider>
        );
    }

    doFresh(e){
        e.preventDefault();
        $.ajax({
            url: "getBook",
            async: true,
            type: "get",
            success: function(data){
                //alert("bookResponse!");
                this.setState({
                    data: JSON.parse(data),
                });
            }.bind(this)
        });
    }

    handleSeniorSearch(e){
        var s = !this.state.seniorSearch;
        this.setState({
            seniorSearch:s
        })
    }
    handleSubmit(value){
        if(this.state.preData == null){
            this.state.preData = this.state.data;
        }
        var oldData = this.state.preData;
        var searchData = oldData.filter(function(row){
            //var idx = this.state.searchIdx;
            var idx = value;
            return(
                (row.title.indexOf(idx)>-1)||(row.author.indexOf(idx)>-1)
            );
        },this);
        this.setState({data:searchData});
    }
    changeSelectIdx(value){
        this.setState({selectIdx:value});
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
                <form id='f2'>
                    <InputGroup compact>
                        <Select defaultValue="price" onChange={this.changeSelectIdx}>
                            <Option value="price">Price</Option>
                            <Option value="publish">Publish</Option>
                        </Select>
                        <Input id='min' type="text" value={this.state.low}
                        onChange={this.changeLow} style={{ width: 100, textAlign: 'center' }} placeholder="Minimum"/>
                        <Input style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                        <Input id='max' type="text" value={this.state.high}
                        onChange={this.changeHigh} style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum"/>
                        <Button onClick={this.handleSelect}><Icon type="check" /></Button>
                        <Button onClick={this.clearSelect}>Clear</Button>
                    </InputGroup>
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
                    <Search id='i1' type="text" placeholder="..." value={this.state.searchIdx}
                    onSearch={this.handleSubmit}
                    enterButton />
                    <Button onClick={this.handleSeniorSearch}>{this.state.seniorSearch?"/\\":"\\/"}</Button>
                    <Button onClick={this.doFresh}><Icon type="sync" /></Button>
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
            return;
        }
        var idx = parseInt(e.target.dataset.row,10);
        var data = this.state.data;
        var item = data[idx];
        const cb = (item) => {
            emitter.emit("Add",item)
        }
        cb(item);
    }
    display(e){
        var idx = parseInt(e.target.dataset.row,10);
        var data = this.state.data;
        var item = data[idx];
        var log = this.state.isLog;
        const cb = (item,log) => {
            emitter.emit("display",item,log)
        }
        cb(item,log);
        this.setState({load:false});
    }

    renderTable(){
        return(
            <Content>
            <Table striped bordered condensed hover>
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
                                    <td>{row.author}</td>
                                    <td>{"$"}{row.price}</td>
                                    <td>{row.publish}</td>
                                    <td>
                                        <Button type="primary" onClick={this.addItem} data-row={idx}>
                                            <Icon type="plus" />Add</Button>
                                        <Button type="primary" onClick={this.display} data-row={idx}>
                                            <Icon type="right" /></Button>
                                    </td>
                                </tr>
                            );
                        },this)
                   }
                </tbody>
            </Table>
            </Content>
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
            <Layout className="BookTable">
                    {cate}
                <Layout float="right">{search}{table}</Layout>
            </Layout>
        );
    }

   
}

export default BookTable