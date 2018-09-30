import React from 'react';
import {Table,Card,Button} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';
import {tableFields,searchFields} from './fields';
import Operation from '@/components/Operation/Operation';
import SearchForm from '@/components/SearchForm';
import FormUtils from '@/utils/form';
import TableUtils from '@/utils/table'
import CouponModal  from './couponModal'

const {createFields}=FormUtils;
const {createColumns}=TableUtils;
const getList=()=> {
  window.apiconn.send_obj({
    obj: "admin",
    act: "couponlist",
    page_num: 1,
    page_size: 10
  });
}

@connect(({ discountCouponManage }) => ({
  couponlist:discountCouponManage.couponlist,
  classifylist:discountCouponManage.classifylist
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visModal:false,
    };
  }

  componentDidMount(){
    getList();
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
            disable={record.id === -1}
            onClick={() => this.handleAccountModal(record, 'detail')}
          >查看
          </Operation>
          <span className="ant-divider" />
          <Operation
            disable={record.status === 'DISABLE'}
            onClick={() => this.handleAccountModal(record, 'edit')}
          >修改
          </Operation>
          <span className="ant-divider" />
        </div>)}];
    return createColumns(fields).enhance(extraFields).values()

  };

  render() {
    const {visModal}=this.state;
    const {classifylist,couponlist}=this.props;
    const searchProps={
      fields:createFields(searchFields).values()
    };
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,
      dataSource:couponlist
    };
    const CouponModalProps= {
      onCancel: () => {
        this.setState({ visModal: false })
      },
      classifylist,
      onOk:(values)=>{
        window.apiconn.send_obj({
           obj:'admin',
           act:'couponadd',
             ...values
        })
      }
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <SearchForm {...searchProps} />
          <Button type='primary' onClick={()=>this.setState({visModal:true})}>新增</Button>
          <p />
          <Table {...tableProps} />
          {visModal&& <CouponModal {...CouponModalProps} /> }
        </Card>

      </PageHeaderWrapper>
    );
  }
}
export default Index;
