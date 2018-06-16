import React from 'react';
import emitter from "./event";
import { Row, Col } from 'antd';
import { Input, Card, Button, Icon} from 'antd';
import { Select} from 'antd';
const Option = Select.Option;
const Search = Input.Search;
const { TextArea } = Input;
const { Meta } = Card;
import { Table } from 'react-bootstrap';

class UserInfo extends React.Component{
    constructor(props){
        super(props);

        this.changeBookEdit = this.changeBookEdit.bind(this);
        this.changeBookDesc = this.changeBookDesc.bind(this);
        this.submitBookDesc = this.submitBookDesc.bind(this);
        this.changeIntroEdit = this.changeIntroEdit.bind(this);
        this.changeIntro = this.changeIntro.bind(this);
        this.submitIntro = this.submitIntro.bind(this);
        this.uploadIcon = this.uploadIcon.bind(this);
        this.changeIcon = this.changeIcon.bind(this);
        this.changeBook = this.changeBook.bind(this);
        this.uploadBook = this.uploadBook.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    
        this.state={
            load:false,
            name:"",
            introduction:"",
            introEdit:false,
            bookEdit:false,
            orderList:[]   ,
            iconFile:null,
            iconURL:"upload/04b62c0f-b4c4-464d-aedd-a97394dff4a81605170209347dd58bb4jw1f7weh4w1d3j20kz0dwgnr.jpg",
            bookFile:null,
            bookURL:"",
            bookDesc:"",
            selectIdx:"Title",
            preList:null
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
            if(name==""){
                this.setState({orderList:[]});
                return;
            }
            $.ajax({
                url: "Order",
                async: true,
                data:{name:name},
                type: "get",
                success: function(data){
                    //alert("orderResponse!");
                    this.setState({
                        orderList: JSON.parse(data),
                    });
                }.bind(this)
            });
            $.ajax({
                url: "UserInfo",
                async: true,
                data:{username:name},
                type: "get",
                success: function(data){
                    if(data == "null"){
                        this.setState({
                            bookDesc:"",
                            bookURL:"",
                            iconURL:"",
                            introduction:""
                        })
                        return;
                    }
                    var info = JSON.parse(data);
                    this.setState({
                        bookDesc:info.bookDesc,
                        introduction:info.intro
                    })
                }.bind(this)
            });
            $.ajax({
                url:"dealImg",
                method:"get",
                data:{
                    type:"icon",
                    username:name
                },
                success:function(data){
                    if(data != null){
                        this.setState({
                            iconURL:data
                        })
                    }
                }.bind(this),
                error:function(data){
                    alert("update failed");
                }.bind(this)
            });
            $.ajax({
                url:"dealImg",
                method:"get",
                data:{
                    type:"book",
                    username:name
                },
                success:function(data){
                    if(data != null) {
                        this.setState({
                            bookURL:data
                        })
                    }
                }.bind(this),
                error:function(data){
                    alert("update failed");
                }.bind(this)
            });
        });
        this.eventEmitter2 = emitter.addListener("Order",(order)=>{
            var list = this.state.orderList;
            list.push(order);
            this.setState({orderList:list}); 
            //console.log(this.state.orderList);      
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
        emitter.removeListener(this.eventEmitter1);
        emitter.removeListener(this.eventEmitter2);
    }

    changeIntro(e){
        this.setState({introduction:e.target.value});
    }
    submitIntro(e){
        e.preventDefault();
        $.ajax({
            url:"/UserInfo",
            method:"post",
            data:{
                option:"intro",
                username:this.state.name+"",
                content:this.state.introduction+""
            },
            success:function(data){
                console.log("update intro");
            }.bind(this),
            error:function(data){
                alert("update失败");
            }.bind(this)
        });
        this.setState({introEdit:false});
    }
    renderIntro(){
        if(this.state.introEdit){
            return(
                <form onSubmit={this.submitIntro}>
                    <label>Introduction:{'        '}
                        <TextArea rows={2} type="text" value={this.state.introduction}
                        onChange={this.changeIntro}/>
                    </label>
                    <Button onClick={this.submitIntro}><Icon type="check" /></Button>
                </form>
            )
        }
        else{
            return(<p>Introduction:{'        '}{this.state.introduction}</p>);
        }
    }
    changeIntroEdit(e){
        var edit = this.state.introEdit;
        this.setState({introEdit:!edit});
    }

    changeBookDesc(e){
        this.setState({bookDesc:e.target.value});
    }
    submitBookDesc(e){
        e.preventDefault()
        $.ajax({
            url:"/UserInfo",
            method:"post",
            data:{
                option:"bookDesc",
                username:this.state.name+"",
                content:this.state.bookDesc+""
            },
            success:function(data){
                console.log("update bookDesc");
            }.bind(this),
            error:function(data){
                alert("update失败");
            }.bind(this)
        });
        this.setState({bookEdit:false});
    }
    renderBookDesc(){
        if(this.state.bookEdit){
            return(
                <form onSubmit={this.submitBookDesc}>
                    <label>Book Description:{'        '}
                        <TextArea rows={4} type="text" value={this.state.bookDesc}
                               onChange={this.changeBookDesc}/>
                    </label>
                    <Button onClick={this.submitBookDesc}><Icon type="check" /></Button>
                </form>
            )
        }
        else{
            return(<p>Book Description:{'        '}{this.state.bookDesc}</p>);
        }
    }
    changeBookEdit(e){
        var edit = this.state.bookEdit;
        this.setState({bookEdit:!edit});
    }

    uploadIcon(e){
        e.preventDefault();
        //提交前先对文件进行检查，<input id="file" type="file">
        var file = this.state.iconFile;//获取上传控件中的文件列表
        console.log(file);
        if(file == null){//没有指定文件
            alert("请选择文件");
        }
        else{

            if(file.size>1024*500){//检查文件大小，这里限定了文件大小不超过500KB
                alert('文件太大');
            }
            else{
                var fileReader = new FileReader();
                var name = this.state.name;
                fileReader.onload = function(e){
                    const base64file = this.result;
                    $("#icon").attr("src",base64file);
                    $.ajax({
                        url:"/dealImg",
                        method:"post",
                        data:{
                            type:"icon",
                            file:base64file+"",
                            username:name+"",
                        },
                        success:function(data){
                            console.log("upload success");
                        }.bind(this),
                        error:function(data){
                            alert("upload failed");
                        }.bind(this)
                    });
                    //就是base64
                }
                fileReader.readAsDataURL(file);

            }
        }
    }
    uploadBook(e) {
        e.preventDefault();
        //提交前先对文件进行检查，<input id="file" type="file">
        var file = this.state.bookFile;//获取上传控件中的文件列表
        console.log(file);
        if (file == null) {//没有指定文件
            alert("请选择文件");
        }
        else {

            if (file.size > 1024 * 500) {//检查文件大小，这里限定了文件大小不超过500KB
                alert('文件太大');
            }
            else {
                var fileReader = new FileReader();
                var name = this.state.name;
                fileReader.onload = function(e){
                    const base64file = this.result;
                    $("#book").attr("src",base64file);
                    $.ajax({
                        url:"/dealImg",
                        method:"post",
                        data:{
                            type:"book",
                            file:base64file+"",
                            username:name+"",
                        },
                        success:function(data){
                            console.log("upload success");
                        }.bind(this),
                        error:function(data){
                            alert("upload failed");
                        }.bind(this)
                    });
                    //就是base64
                }
                fileReader.readAsDataURL(file);
            }
        }
        //return false;//还记得它的作用吗?阻止submit按钮提交表单
    }

    changeIcon(e){
        var file = e.target.files[0];
        console.log(file);
        this.setState({iconFile:file});
    }
    changeBook(e){
        var file = e.target.files[0];
        console.log(file);
        this.setState({bookFile:file});
    }

    renderInfo(){
        const intro = this.renderIntro();
        const desc = this.renderBookDesc();

        return(
            <div className="usrInfo">
                <h1>Personal Homepage</h1>
                <Row gutter={16}>
                    <Col span={3}>
                        <Card
                            hoverable
                            cover={<img id="icon" src={this.state.iconURL} width="200px" height="200px" />}
                        >
                        </Card>
                        <Card>
                            <form encType="multipart/form-data" onSubmit={this.uploadIcon}>
                                <input type="file" name="uploadFile" accept="image/*" onChange={this.changeIcon}/>
                                <br/>
                                <input type="submit" value="上传"/>
                            </form>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <p>UserName:{'      '}{this.state.name}</p>
                        <div onDoubleClick={this.changeIntroEdit}>
                            {intro}
                        </div>
                    </Col>
                    <Col span={4}>
                        <Card
                            hoverable
                            cover={<img id="book" src={this.state.bookURL} width="200px" height="300px" />}
                        >
                            <Meta
                                title="My Favorite Book"
                            />
                        </Card>
                        <Card>
                            <form encType="multipart/form-data" onSubmit={this.uploadBook}>
                                <input type="file" name="uploadFile" accept="image/*" onChange={this.changeBook}/>
                                <br/>
                                <input type="submit" value="上传"/>
                            </form>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <div onDoubleClick={this.changeBookEdit}>
                            {desc}
                        </div>
                    </Col>
                </Row>
            </div>
        );

    }

    handleSelect(value){
        this.setState({selectIdx:value});
    }
    handleSearch(value){
        var data;
        if(this.state.preList == null){
            data = this.state.orderList;
            this.setState({preList:data});
        }else{
            data = this.state.preList;
        }

        var idx = this.state.selectIdx;
        var newdata;
        if(idx=="Title"){
            newdata = data.filter(function (row) {
                var judge = -1;
                row.content.map((rr)=>{
                    if(rr.title.indexOf(value)>-1){judge=1}
                },this)
                return judge>0
                //return (row.username.indexOf(this.state.userIdx)>-1)
            }, this);
        }
        else if(idx == "Author"){
            newdata = data.filter(function (row) {
                var judge = -1;
                row.content.map((rr)=>{
                    if(rr.author.indexOf(value)>-1){judge=1}
                },this)
                return judge>0
                //return (row.username.indexOf(this.state.userIdx)>-1)
            }, this);
        }
        else{
            newdata = data.filter(function (row) {
                return (row.time.indexOf(value)>-1)
            }, this);
        }
        this.setState({orderList:newdata});
    }

    renderSearch(){
        const selectBefore = (
            <Select defaultValue="Title" style={{ width: 150 }} onChange={this.handleSelect}>
                <Option value="Title">Book Title</Option>
                <Option value="Author">Book Author</Option>
                <Option value="Date">Date</Option>
            </Select>
        );
        return(
            <Search
                addonBefore={selectBefore}
                placeholder="input search text"
                onSearch={this.handleSearch}
                enterButton
            />
        );
    }

    renderOrder(){
        return(
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>No.</th><th>TotalCost</th><th>Time</th><th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.orderList.map((row,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>#{idx+1}</td>
                                    <td>${row.totalCost}</td>
                                    <td>{row.time}</td>
                                    <td>
                                        <ul>
                                            {
                                                row.content.map((rr,idx)=>{
                                                    var title = "<<"+rr.title+">>";
                                                    return(
                                                        <li key={idx}>{title+" -- By "+rr.author+" ---- $"+rr.price+" * "+rr.amount+" = $"+rr.cost}</li>
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
            </Table>
        );
    }
    
    render(){
        if(!this.state.load){
            return <div></div>;
        }
        const info = this.renderInfo();
        const orderTable = this.renderOrder();
        const search = this.renderSearch();
        return (
            <div className="UserInfo">
                {info}{search}{orderTable}
            </div>
        );
    }
}

export default UserInfo