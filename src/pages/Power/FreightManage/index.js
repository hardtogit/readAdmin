import React from 'react';
import {Table,Card,Button,Modal} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';
import {tableFields} from './fields';
import Operation from '@/components/Operation/Operation';
import TableUtils from '@/utils/table'
import FreightModal  from './freightModal'

const {createColumns}=TableUtils;
const getList=(pn,ps)=> {
  window.apiconn.send_obj({
    obj: "admin",
    act: "freightlist",
    page_num: pn,
    page_size: ps
  });
}

@connect(({ discountfreightManage }) => ({
  freightlist:discountfreightManage.freightlist,
  classifylist:discountfreightManage.classifylist,
  freightread:discountfreightManage.freightread
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
          <Operation
            disable={record.status === 'DISABLE'}
            onClick={() =>{
              const {_id}=record;
              window.apiconn.send_obj({
                obj:"admin",
                act:"freightread",
                recordid:_id
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
              const {_id}=record;
              Modal.confirm({
                title:'确定删除该条数据？',
                onOk:()=>{
                  window.apiconn.send_obj({
                    obj:"admin",
                    act:"freightdel",
                    recordid:_id
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
    const {visModal,opType}=this.state;
    const {classifylist,freightlist,freightread}=this.props;
    const {_id}=freightread;
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,
      dataSource:freightlist
    };
    const modalProps={
      'add':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'freightadd',
            ...values
          })
        },
        freightread:{}
      },
      'edit':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'freightmodi',
            recordid:_id,
            ...values
          })
        },
        freightread
      }
    };
    const freightModalProps= {
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
          <Button type='primary' onClick={()=>this.setState({visModal:true,opType:'add'})}>新增</Button>
          <p />
          <Table {...tableProps} />
          {visModal&& <FreightModal {...freightModalProps} /> }
        </Card>

      </PageHeaderWrapper>
    );
  }
}
export default Index;
