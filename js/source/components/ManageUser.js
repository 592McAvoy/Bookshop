import React from 'react';
import emitter from "./event";
import { Table } from 'react-bootstrap';

class ManageUser extends React.Component{
    constructor(props){
        super(props);

        this.changeEmail = this.changeEmail.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changePwd = this.changePwd.bind(this);
        this.changeRole = this.changeRole.bind(this);
        this.changeSta = this.changeSta.bind(this);
        this.doModify = this.doModify.bind(this);
        this.doEdit = this.doEdit.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.doAdd = this.doAdd.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.search = this.search.bind(this);
        this.fresh = this.fresh.bind(this);

        this.state = {
            load:false,
            edit:false,
            editrow:0,
            data:[],
            title:["username","pwd","role","email","phone","state"],
            name:"",
            pwd:"",
            role:0,
            phone:"",
            email:"",
            sta:0,
            searchIdx:"",
            predata:null
        };
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            console.log(msg);
            if(msg == "ManageUser"){
                this.setState({load:true})
            } else {
                this.setState({
                    load:false
                });
            }
        });

        $.ajax({
            url: "manageUser",
            async: true,
            type: "get",
            success: function(data){
                //alert("manageUserGetResponse!");
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
            name:data.username,
            pwd:data.pwd,
            role:data.role,
            phone:data.phone,
            email:data.email,
            sta:data.state
        });
    }
    changeName(e){
        var name = e.target.value;
        this.setState({name:name});
    }
    changePwd(e){
        var pwd = e.target.value;
        this.setState({pwd:pwd});
    }
    changeRole(e){
        var r = parseInt(e.target.value,10);
        this.setState({role:r});
    }
    changePhone(e){
        var p = e.target.value;
        this.setState({phone:p});
    }
    changeEmail(e){
        var e = e.target.value;
        this.setState({email:e});
    }
    changeSta(e){
        var s = parseInt(e.target.value,10);
        this.setState({sta:s});
    }
    doModify(e){
        $.ajax({
            url: "manageUser",
            async: true,
            type: "post",
            data:{
                operation:"update",
                username:this.state.name,
                pwd:this.state.pwd,
                role:this.state.role+"",
                phone:this.state.phone,
                email:this.state.email,
                state:this.state.sta+""
            },
            success: function(){
               // alert("manageUserModifyResponse!");

            }.bind(this)
        });

        var data = this.state.data;
        var row = {};
        row.username=this.state.name;
        row.pwd=this.state.pwd;
        row.role=this.state.role;
        row.phone=this.state.phone;
        row.email=this.state.email;
        row.state=this.state.sta;
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
            url: "manageUser",
            async: true,
            type: "post",
            data:{
                operation:"delete",
                username:row.username,
            },
            success: function(){
                //alert("manageUserDeleteResponse!");

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
            url: "manageUser",
            async: true,
            type: "post",
            data:{
                operation:"insert",
                username:this.state.name,
                pwd:this.state.pwd,
                role:this.state.role+"",
                phone:this.state.phone,
                email:this.state.email,
                state:this.state.sta+""
            },
            success: function(){
                //alert("manageUserAddResponse!");

            }.bind(this)
        });
        var data = this.state.data;
        var row = {};
        row.username=this.state.name;
        row.pwd=this.state.pwd;
        row.role=this.state.role;
        row.phone=this.state.phone;
        row.email=this.state.email;
        row.state=this.state.sta;
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
        var idx = this.state.searchIdx;
        console.log("searchIdx: "+idx);
        if(this.state.predata == null){
            console.log("predata: "+this.state.predata);
            data = this.state.data;
            this.setState({predata:data});
        }else{
            data = this.state.predata;
        }
        console.log("data: "+data);
        if(idx !== ""){
            var newdata = data.filter(function(row){
                return row.username.indexOf(idx)>-1;
            },this);
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
            url: "manageUser",
            async: true,
            type: "get",
            success: function(data){
                //alert("manageUserFreshResponse!");
                this.setState({
                    data: JSON.parse(data),
                });
            }.bind(this)
        });
    }


    renderSearch(){
        return(
            <form>
                <label>
                Username:<input type="text" value={this.state.searchIdx} onChange={this.changeSearch}/>
                </label>
                <button onClick={this.search}>search</button>
            </form>
        );
    }
    renderAdd(){
        return(
            <form >
                <label>
                    username:<input type="text" value={this.state.name}
                                 onChange={this.changeName}/>
                </label>
                <label>
                    pwd:<input type="text" value={this.state.pwd}
                                 onChange={this.changePwd}/>
                </label>
                <label>
                    role:<input type="text" value={this.state.role}
                                 onChange={this.changeRole}/>
                </label>
                <label>
                    email:<input type="text" value={this.state.email}
                                 onChange={this.changeEmail}/>
                </label>
                <label>
                    phone:<input type="text" value={this.state.phone}
                                 onChange={this.changePhone}/>
                </label>
                <label>
                    state:<input type="text" value={this.state.sta}
                                 onChange={this.changeSta}/>
                </label>
                <button onClick={this.doAdd}>add</button>
            </form>

        );
    }
    renderTable(){
        return(
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    {
                        this.state.title.map(function(title,idx){
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
                                        <form><input type="text" value={this.state.name}
                                                     onChange={this.changeName}/></form>
                                    </td>
                                    <td>
                                        <form><input type="text" value={this.state.pwd}
                                                     onChange={this.changePwd}/></form>
                                    </td>
                                    <td>
                                        <form><input type="text" value={this.state.role}
                                                     onChange={this.changeRole}/></form>
                                    </td>
                                    <td>
                                        <form><input type="text" value={this.state.email}
                                                     onChange={this.changeEmail}/></form>
                                    </td>
                                    <td>
                                        <form><input type="text" value={this.state.phone}
                                                     onChange={this.changePhone}/></form>
                                    </td>
                                    <td>
                                        <form><input type="text" value={this.state.sta}
                                                     onChange={this.changeSta}/></form>
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
                                    <td data-row={idx}>{row.username}</td>
                                    <td data-row={idx}>{row.pwd}</td>
                                    <td data-row={idx}>{row.role}</td>
                                    <td data-row={idx}>{row.email}</td>
                                    <td data-row={idx}>{row.phone}</td>
                                    <td data-row={idx}>{row.state}</td>
                                    <td>
                                        <button data-row={idx} onClick={this.doDelete}>delete</button>
                                    </td>
                                </tr>
                            );
                        }
                    },this)
                }
                </tbody>
            </Table>
        );
    }

    render(){
        if(this.state.load){
            const table = this.renderTable();
            const search = this.renderSearch();
            const add = this.renderAdd();
            return(
                <div className="ManageUser">
                    {search}
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

export default ManageUser