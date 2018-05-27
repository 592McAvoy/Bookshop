import React from 'react';
import emitter from "./event";
import { Row, Col } from 'antd';
import { Input, Card} from 'antd';
const { TextArea } = Input;
const { Meta } = Card;

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
            bookDesc:""
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
                        bookURL:info.bookUrl,
                        iconURL:info.iconUrl,
                        introduction:info.intro
                    })
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
                var formData = new FormData();
                formData.append('file', file, file.name);//取得表单的所有数据
                console.log(formData);

                $.ajax({
                    url:"/upload",
                    method:"post",
                    async:false,
                    data:formData,
                    processData:false,
                    contentType:false,//这两行是上传文件时才需要加的
                    success:function(data){
                        console.log("上传成功");
                        this.setState({iconURL:data},()=>{
                            $.ajax({
                                url:"/UserInfo",
                                method:"post",
                                data:{
                                    option:"iconUrl",
                                    username:this.state.name+"",
                                    content:this.state.iconURL+""
                                },
                                success:function(data){
                                    console.log("update iconUrl");
                                }.bind(this),
                                error:function(data){
                                    alert("update失败");
                                }.bind(this)
                            });
                        });
                        console.log(this.state.iconURL);

                    }.bind(this),
                    error:function(data){
                        alert("上传失败");
                    }.bind(this)
                });



            }
        }
        //return false;//还记得它的作用吗?阻止submit按钮提交表单
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
                var formData = new FormData();
                formData.append('file', file, file.name);//取得表单的所有数据
                console.log(formData);

                $.ajax({
                    url: "/upload",
                    method: "post",
                    async:false,
                    data: formData,
                    processData: false,
                    contentType: false,//这两行是上传文件时才需要加的
                    success: function (data) {
                        console.log("上传成功");

                        this.setState({bookURL: data},()=>{
                            $.ajax({
                                url:"/UserInfo",
                                method:"post",
                                data:{
                                    option:"bookUrl",
                                    username:this.state.name+"",
                                    content:this.state.bookURL+""
                                },
                                success:function(data){
                                    console.log("update bookUrl");
                                }.bind(this),
                                error:function(data){
                                    alert("update失败");
                                }.bind(this)
                            });
                        });
                        console.log(this.state.bookURL);

                    }.bind(this),
                    error: function (data) {
                        alert("上传失败");
                    }.bind(this)
                });

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
                    <Col span={4}>
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
                    <Col span={4}>
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
                    <Col span={4}>
                        <div onDoubleClick={this.changeBookEdit}>
                            {desc}
                        </div>
                    </Col>
                </Row>
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