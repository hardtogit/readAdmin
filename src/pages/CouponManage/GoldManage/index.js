import React from 'react';
import {Table,Card,Button,Modal} from 'antd'
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
    act: "goldlist",
    page_num: pn,
    page_size: ps
  });
}

@connect(({ goldManage }) => ({
  goldlist:goldManage.goldlist,
  goldread:goldManage.goldread,
  goldmollist:goldManage.goldmollist
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
      act: "goldmollist",
      page_num: 1,
      page_size: 10000
    });

  }

  getTableColumns=(fields)=>{
    const extraFields = [{
      key: 'operator',
      name: '操作',
      render: (text, record) => (
        <div>
          <Operation
            disable={record.id === -1}
            onClick={() => {
              const {_id}=record;
              Modal.confirm({
                title:'确定删除该条数据？',
                onOk:()=>{
                  window.apiconn.send_obj({
                    obj:"admin",
                    act:"golddel",
                    id:_id
                  });
                  getList(1,100000);
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
    const {goldlist,goldread,goldmollist}=this.props;
    console.log(goldlist)
    const {_id}=goldread;
    // const searchProps={
    //   fields:createFields(searchFields).values()
    // };
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,
      dataSource:goldlist
    };
    const modalProps={
      'add':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'goldadd',
            ...values
          })
        },
        goldread:{}
      },
      'edit':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'goldmodi',
            id:_id,
            ...values
          })
        },
        goldread
      }
    };
    const couponModalProps= {
      onCancel: () => {
        this.setState({ visModal: false })
      },
      goldmollist,
      callBack:()=>{getList(1,100000)},
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
