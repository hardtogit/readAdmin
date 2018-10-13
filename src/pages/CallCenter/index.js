import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';
import {nextTick} from '../../utils/nextTick'
import Message from './Message';
import Text from './Text'
import Box from './Card';
import List from './List';
import './index.less'

@connect(({ callCenterManage }) => ({
  fromId:callCenterManage.fromId,
  peopleList:callCenterManage.peopleList,
  chatList:callCenterManage.chatList,
  nextId:callCenterManage.nextId,
  isHistory:callCenterManage.isHistory
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    window.apiconn.send_obj({
      obj: "message",
      act: "mailbox",
       // ut:new Date().getTime()/1000
    });
  }

  render(){
    const {fromId,peopleList,chatList,dispatch,nextId,isHistory}=this.props;
    return (
      <PageHeaderWrapper wrapperClassName='callCenter'>
        <div id="app">
          <div className="sidebar">
            <Box />
            <List peopleList={peopleList} fromId={fromId} dispatch={dispatch} />
          </div>
          <div className="main">
            <Message isHistory={isHistory} chatList={chatList} nextId={nextId} fromId={fromId}  />
            <Text fromId={fromId} />
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
