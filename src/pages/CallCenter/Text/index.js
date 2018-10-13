import React from 'react';
import {message,Icon,Button} from 'antd'
import PicUpload from '../../../components/PicUpload/copy'
import './index.less'

class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={
       value:''
    }
  }

  onKeyup =(e)=> {
    const {value}=this.state;
    const {fromId}=this.props;
    if (e.ctrlKey && e.keyCode === 13 && value.length) {
      if(fromId){
        window.apiconn.send_obj({
          obj: "message",
          act: "chat_send",
          header_id:fromId,
          mtype:'text',
          content:value
        });
        this.setState({
          value:''
        })
      }else{
        message.error('请先选择聊天对象')
      }
    }
  };

  handleClick=()=>{
    const {value}=this.state;
    const {fromId}=this.props;
    if(fromId){
      if(value.length){
        window.apiconn.send_obj({
          obj: "message",
          act: "chat_send",
          header_id:fromId,
          mtype:'text',
          content:value
        });
        this.setState({
          value:''
        })
      }
    }else{
      message.error('请先选择聊天对象')
    }
  }

  handleGetChange=(file)=>{
    const {fromId}=this.props;
    file[0].type='jpg/png';
    if(fromId){
      window.apiconn.send_obj({
        obj: "message",
        act: "chat_send",
        header_id:fromId,
        mtype:'image',
        content:file[0]
      });
    }else{
      message.error('请先选择聊天对象')
    }
  }

  render(){
    const {value}=this.state;
    return(
      <div className="text">
        <div style={{height:'36px',backgroundColor:'#fff',
          borderBottom:'1px solid #ddd',padding:'0 12px'}}
        >
          <div style={{float:'left',paddingTop:'8px'}}>
            <PicUpload
              uploadButton={<Icon
                type="picture"
                theme="outlined"
                style={{cursor:'pointer',fontSize:'20px'}}
              />}
              listType=""
              showUploadList={false}
              getChange={this.handleGetChange}
            />
          </div>
          <Button
            style={{float:'right',marginTop:'6px'}}
            size='small'
            onClick={this.handleClick}
          >发送
          </Button>
        </div>
        <textarea
          onChange={e =>{this.setState({value:e.target.value})}}
          onKeyUp={this.onKeyup}
          value={value}
          placeholder="按 Ctrl + Enter 发送"
        />
      </div>
    )
  }

}
export default Index
