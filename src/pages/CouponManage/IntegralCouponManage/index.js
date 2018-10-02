import React from 'react';
import {Table,Card,Button} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';
import {tableFields} from './fields';
import Operation from '@/components/Operation/Operation';
// import SearchForm from '@/components/SearchForm';
// import FormUtils from '@/utils/form';
import TableUtils from '@/utils/table'
import CouponModal from './couponModal'

// const {createFields}=FormUtils;
const {createColumns}=TableUtils;
const getList=(pn,ps)=> {
  window.apiconn.send_obj({
    obj: "admin",
    act: "goldmollist",
    page_num: pn,
    page_size: ps
  });
}

@connect(({ integralGoldmolManage }) => ({
  goldmollist:integralGoldmolManage.goldmollist,
  goldmolread:integralGoldmolManage.goldmolread
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
    getList(1,10000);
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
                act:"goldmolread",
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
          <Operation
            disable={record.id === -1}
            onClick={() => this.handleAccountModal(record, 'detail')}
          >删除
          </Operation>
        </div>)}];
    return createColumns(fields).enhance(extraFields).values()

  };

  render() {
    const {visModal,opType}=this.state;
    const {goldmollist,goldmolread}=this.props;
    const {_id}=goldmolread;
    // const searchProps={
    //   fields:createFields(searchFields).values()
    // };
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,
      dataSource:goldmollist
    };
    const modalProps={
      'add':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'goldmoladd',
            ...values
          })
        },
        goldmolread:{}
      },
      'edit':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'goldmolmodi',
            id:_id,
            ...values
          })
        },
        goldmolread
      }
    };
    const couponModalProps= {
      onCancel: () => {
        this.setState({ visModal: false })
      },
      callBack:getList,
      ...modalProps[opType]
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Button type='primary' onClick={()=>this.setState({visModal:true})}>新增</Button>
          <p />
          <Table {...tableProps} />
          {visModal&& <CouponModal {...couponModalProps} /> }
        </Card>

      </PageHeaderWrapper>
    );
  }
}
export default Index;
