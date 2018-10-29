import React from 'react';
import {Table,Card,Button,Modal} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AuthComponent from '@/components/AuthComponent';
import { connect } from 'dva/index';
import {tableFields} from './fields';
import Operation from '@/components/Operation/Operation';
import TableUtils from '@/utils/table'
import RoleModal  from './roleModal'

const {createColumns}=TableUtils;
const getList=(pn,ps)=> {
  window.apiconn.send_obj({
    obj: "admin",
    act: "rolelist",
    page_num: pn,
    page_size: ps
  });
}

@connect(({ roleManage }) => ({
  rolelist:roleManage.rolelist,
  classifylist:roleManage.classifylist,
  roleread:roleManage.roleread
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
  }

  getTableColumns=(fields)=>{
    const extraFields = [{
      key: 'operator',
      name: '操作',
      render: (text, record) => (
        <div>
          <AuthComponent code="030202">
            <Operation
              disable={record.status === 'DISABLE'}
              onClick={() =>{
              const {_id}=record;
              window.apiconn.send_obj({
                obj:"admin",
                act:"roleread",
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
          <AuthComponent code="030203">
            <Operation
              disable={record.id === -1}
              onClick={() => {
              const {_id}=record;
              Modal.confirm({
                title:'确定删除该条数据？',
                onOk:()=>{
                  window.apiconn.send_obj({
                    obj:"admin",
                    act:"roledel",
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
    const {rolelist,roleread}=this.props;
    const {_id}=roleread;
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,
      dataSource:rolelist
    };
    const modalProps={
      'add':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'roleadd',
            ...values
          })
        },
        roleread:{}
      },
      'edit':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'rolemodi',
            id:_id,
            ...values
          })
        },
        roleread
      }
    };
    const roleModalProps= {
      onCancel: () => {
        this.setState({ visModal: false })
      },
      callBack:getList,
      ...modalProps[opType]
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <AuthComponent code="030201">
            <Button type='primary' onClick={()=>this.setState({visModal:true,opType:'add'})}>新增</Button>
          </AuthComponent>
          <p />
          <Table {...tableProps} />
          {visModal&& <RoleModal {...roleModalProps} /> }
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
