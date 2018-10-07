import React from 'react';
import {Table,Card,Button,Modal} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';
import AttributeListModal from './attributeListModal'
import {tableFields} from './fields';
import Operation from '@/components/Operation/Operation';
import TableUtils from '@/utils/table'
import ClassifyModal  from './classifyModal'

const {createColumns}=TableUtils;
const getList=(pn,ps)=> {
  window.apiconn.send_obj({
    obj: "admin",
    act: "classifylist",
    page_num: pn,
    page_size: ps
  });
}

@connect(({ classifyManage }) => ({
  classifylist:classifyManage.classifylist,
  classifyread:classifyManage.classifyread,
  attributelist:classifyManage.attributelist,
  attributeread:classifyManage.attributeread,
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visModal:false,
      visList:false,
      opType:'add',
      id:''
    };
  }

  componentDidMount(){
    getList(1,100000);
  }

  getTableColumns=(fields)=>{
    const extraFields = [{
      key: 'operator',
      name: '操作',
      width:240,
      render: (text, record) => (
        <div>
          <Operation
            disable={record.status === 'DISABLE'}
            onClick={() =>{
              const {recordid}=record;
              this.setState({
                visList:true,
                id:recordid
              })
            }}
          >属性列表
          </Operation>
          <span className="ant-divider" />
          <Operation
            disable={record.status === 'DISABLE'}
            onClick={() =>{
              const {recordid}=record;
              window.apiconn.send_obj({
                obj:"admin",
                act:"classifyread",
                recordid
              });
              this.setState({
                visModal:true,
                opType:'edit'
              })
            }}
          >修改
          </Operation>
          <span className="ant-divider" />
          <Operation
            disable={record.id === -1}
            onClick={() => {
              const {recordid}=record;
              Modal.confirm({
                title:'确定删除该条数据？',
                onOk:()=>{
                  window.apiconn.send_obj({
                    obj:"admin",
                    act:"classifydel",
                    recordid
                  });
                  getList(1,10);
                }
              })



            }}
          >删除
          </Operation>
        </div>)}];
    return createColumns(fields).enhance(extraFields).values()

  };

  render() {
    const {visModal,opType,visList,id}=this.state;
    const {classifylist,classifyread,attributelist,attributeread}=this.props;
    const {recordid}=classifyread;
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,
      dataSource:classifylist
    };
    const modalProps={
      'add':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'classifyadd',
            ...values
          })
        },
        classifyread:{}
      },
      'edit':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'classifymodi',
            recordid,
            ...values
          })
        },
        classifyread
      }
    };
    const classifyModalProps= {
      onCancel: () => {
        this.setState({ visModal: false })
      },
      callBack:getList,
      ...modalProps[opType]
    };
    const attributeListModalProps={
      onCancel: () => {
        this.setState({ visList: false })
      },
      attributelist,
      attributeread,
      recordid:id

    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Button type='primary' onClick={()=>this.setState({visModal:true,opType:'add'})}>新增</Button>
          <p />
          <Table {...tableProps} />
          {visModal&& <ClassifyModal {...classifyModalProps} /> }
          {visList&&<AttributeListModal {...attributeListModalProps} />}
        </Card>

      </PageHeaderWrapper>
    );
  }
}
export default Index;
