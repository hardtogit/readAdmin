import React from 'react';
import classNames from 'classnames'
import TimeAgo from 'timeago-react';
import { nextTick } from '../../../utils/nextTick';
import './index.less'


class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }


  componentWillReceiveProps(nextProps){
    const {chatList,isHistory}=nextProps;
    if(chatList!==this.props.chatList){
      if(!isHistory){
        nextTick(()=>this.scrollBottom())
      }
    }


  }

  scrollBottom=()=>{
    this.msgBox.scrollTop = this.msgBox.scrollHeight - this.msgBox.clientHeight;
  }

  getHistory=()=>{
    const {nextId}=this.props;
    window.apiconn.send_obj({
      obj: "message",
      act: "chat_get",
      block_id:nextId
    });
  }

  render(){
    const {chatList,nextId}=this.props;
    return(
      <div className="message" ref={(msgBox)=>{this.msgBox=msgBox}}>
        <div onClick={this.getHistory} style={{textAlign:'center',cursor:'pointer'}}>{nextId?'历史消息':''}</div>
        <ul>
          {
            chatList.map((chat)=>(
              <li>
                <p className="time">
                  <span>
                    <TimeAgo
                      datetime={new Date(chat.send_time*1000)}
                      locale='zh_CN'
                    />
                  </span>
                </p>
                <div className={classNames(['mian',{'self':chat.from_id===sessionStorage.getItem('userId') }])}>
                  <img
                    alt=""
                    className="avatar"
                    width="30"
                    height="30"
                    src={`http://116.62.164.251/cgi-bin/download.pl?fid=${chat.from_avatar}&proj=yyqq`}
                  />
                  <div className={classNames(["textMsg",{'image':chat.mtype==='image'}])}>
                    {chat.mtype==='image'?
                      <img
                        src={`http://116.62.164.251/cgi-bin/download.pl?fid=${chat.content.fid}&proj=yyqq`}
                        style={{maxWidth:'308px'}}
                        alt=""
                      />
                      :chat.content}
                  </div>
                </div>
              </li>
              ))
          }
        </ul>
      </div>
    )
  }

}
export default Index
