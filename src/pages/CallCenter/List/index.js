import React from 'react';
import TimeAgo from 'timeago-react';
import classNames from 'classnames'
import {Col,Badge} from 'antd'
import './index.less'



class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  handleClick=(id)=>{
    const {dispatch}=this.props;
      dispatch({
        type:'callCenterManage/fromId',
        payload:id
      });
    window.apiconn.send_obj({
      obj: "message",
      act: "chat_get",
      header_id:id
    });
  };

  render(){
    const {peopleList,fromId}=this.props;

    return(
      <div className="list">
        <ul>
          {peopleList.map((item)=>(
            <li className={classNames({'active':item.id===fromId })} onClick={()=>this.handleClick(item.id)}>
              <div className='left'>
                <Badge count={item.id===fromId?0:item.count} style={{boxShadow:'none'}}>
                  <img
                    className="avatar"
                    width="30"
                    height="30"
                    alt=""
                    src={`http://116.62.164.251/cgi-bin/download.pl?fid=${item.avatar_fid}&proj=yyqq`}
                  />
                </Badge>
              </div>

              <div className="right">
                <div className="name">{item.title}</div>
                <div className="lastText">
                  <Col span={15} style={{overflow:'hidden',width:'70%',textOverflow:'ellipsis'}}>
                    <span className="scale">{item.last_content}</span>
                  </Col>
                  <Col span={9} style={{overflow:'hidden',width:'30%'}}>
                    <span className="scale">
                      <TimeAgo
                        datetime={new Date(item.last_name)}
                        locale='zh_CN'
                      />
                    </span>
                  </Col>
                </div>
              </div>
            </li>
            ))}

        </ul>
      </div>
    )
  }

}
export default Index
