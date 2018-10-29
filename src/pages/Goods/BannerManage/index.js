import React from 'react';
import {Table,Card,Button,Modal} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AuthComponent from '@/components/AuthComponent';
import { connect } from 'dva/index';
import {tableFields} from './fields';
import Operation from '@/components/Operation/Operation';
import TableUtils from '@/utils/table'
import CouponModal  from './couponModal'

const {createColumns}=TableUtils;
const getList=(pn,ps)=> {
  window.apiconn.send_obj({
    obj: "admin",
    act: "bannerlist",
    page_num: pn,
    page_size: ps
  });
}

@connect(({ bannerManage }) => ({
  bannerlist:bannerManage.bannerlist,
  classifylist:bannerManage.classifylist,
  bannerread:bannerManage.bannerread
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visModal:false,
      opType:'add'
    };
  }

  componentDidMount(){
    getList(1,100000);
    window.apiconn.send_obj({
      obj:"admin",
      act:"classifylist",
      page_num:1,
      page_size:1000
    })
  }

  getTableColumns=(fields)=>{
    const extraFields = [{
      key: 'operator',
      name: '操作',
      render: (text, record) => (
        <div>
          <AuthComponent code="020102">
            <Operation
              disable={record.status === 'DISABLE'}
              onClick={() =>{
              const {_id}=record;
              window.apiconn.send_obj({
                obj:"admin",
                act:"bannerread",
                id:_id
              });
              this.setState({
                visModal:true,
                opType:'edit'
              })
            }}
            >修改
            </Operation>
            <span className="ant-divider" />
          </AuthComponent>
          <AuthComponent code="020103">
            <Operation
              disable={record.id === -1}
              onClick={() => {
              const {_id}=record;
              Modal.confirm({
                title:'确定删除该条数据？',
                onOk:()=>{
                  window.apiconn.send_obj({
                    obj:"admin",
                    act:"bannerdel",
                    id:_id
                  });
                  getList(1,10);
                }
              })
            }}
            >删除
            </Operation>
          </AuthComponent>
        </div>)}];
    return createColumns(fields).enhance(extraFields).values()

  };

  render() {
    const {visModal,opType}=this.state;
    const {classifylist,bannerlist,bannerread}=this.props;
    const {_id}=bannerread;
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,
      dataSource:bannerlist
    };
    const modalProps={
      'add':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'banneradd',
            ...values
          })
        },
        bannerread:{}
      },
      'edit':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'bannermodi',
            id:_id,
            ...values
          })
        },
        bannerread
      }
    };
    const bannerModalProps= {
      onCancel: () => {
        this.setState({ visModal: false })
      },
      callBack:getList,
      classifylist,
      ...modalProps[opType]
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <AuthComponent code="020101">
            <Button type='primary' onClick={()=>this.setState({visModal:true,opType:'add'})}>新增</Button>
          </AuthComponent>
          <p />
          <Table {...tableProps} />
          {visModal&& <CouponModal {...bannerModalProps} /> }
        </Card>

      </PageHeaderWrapper>
    );
  }
}
export default Index;
