import React from 'react';
import emitter from "./event";
import { Row, Col } from 'antd';
import { Card, List ,Button, Icon} from 'antd';

class DisplayBook extends React.Component{
    constructor(props){
        super(props);

        this.addItem = this.addItem.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state = {
            load:false,
            log:false,
            book:null
        };
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("display",(item,log)=>{
            this.setState({
                load:true,
                book:item,
                log:log
            });
        });
        this.eventEmitter1 = emitter.addListener("Page",(msg)=> {
            this.setState({load: false});
        });

    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
        emitter.removeListener(this.eventEmitter1);
    }

    addItem(e){
        if(!this.state.log){
            alert("Please log in first!");
            const cb = (msg) => {
                emitter.emit("Page",msg)
            }
            this.setState({load:false});
            cb("Log");
        }

        var book = this.state.book;

        const cb = (item) => {
            emitter.emit("Add",item)
        }
        cb(book);
    }
    goBack(e){
        const cb = (msg) => {
            emitter.emit("Page",msg)
        }
        this.setState({load:false});
        cb("Homepage");
    }
    render() {
        var book = this.state.book;
        if(!this.state.load){
            return <div></div>;
        }
        else{
            const data =[
                "Title --- "+book.title,
                "Author ---- "+book.author,
                "Publish year --- "+book.publish,
                "Price ----$ "+book.price
            ]
            return(
                <div>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 300 }}
                                cover={<img src={book.img}/>}
                            >
                            </Card>
                        </Col>
                        <Col span={8}>
                            <List
                                size="large"
                                bordered
                                dataSource={data}
                                renderItem={item => (<List.Item>{item}</List.Item>)}
                            />
                            <Button onClick={this.addItem}><Icon type="plus" />Add</Button>
                            <Button onClick={this.goBack}>Go Back<Icon type="rollback" /></Button>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default DisplayBook