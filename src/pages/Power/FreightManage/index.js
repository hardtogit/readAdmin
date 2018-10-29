import React from 'react';
import {Table,Card,Button} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AuthComponent from '@/components/AuthComponent';
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

@connect(({ freightManage }) => ({
  freightlist:freightManage.freightlist,
  provincelist:freightManage.provincelist,
  freightread:freightManage.freightread
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
      obj: "admin",
      act: "provincelist",
    });
  }

  getTableColumns=(fields)=>{
    const extraFields = [{
      key: 'operator',
      name: '操作',
      render: (text, record) => (
        <div>
          <AuthComponent code="030302">
            <Operation
              disable={record.status === 'DISABLE'}
              onClick={() =>{
              const {_id}=record;
              window.apiconn.send_obj({
                obj:"admin",
                act:"freightread",
                id:_id
              });
              this.setState({
                visModal:true,
                opType:'edit'
              })
            }}
            >修改
            </Operation>
          </AuthComponent>
        </div>)}];
    return createColumns(fields).enhance(extraFields).values()

  };

  render() {
    const {visModal,opType}=this.state;
    const {freightlist,freightread,provincelist}=this.props;
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
            id:_id,
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
      provincelist,
      ...modalProps[opType]
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <AuthComponent code="030301">
            <Button type='primary' onClick={()=>this.setState({visModal:true,opType:'add'})}>新增</Button>
          </AuthComponent>
          <p />
          <Table {...tableProps} />
          {visModal&& <FreightModal {...freightModalProps} /> }
        </Card>

      </PageHeaderWrapper>
    );
  }
}
export default Index;
