import React from 'react';
import {Table,Card} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {tableFields,searchFields} from './fields';
import DealModal from './dealModal'
import SearchForm from '../../components/SearchForm';
import FormUtils from '../../utils/form';
import TableUtils from '../../utils/table'
import { connect } from 'dva/index';

const {createFields}=FormUtils;
const {createColumns}=TableUtils
@connect(({ shoppingManage }) => ({
  shoppinglist:shoppingManage.shoppinglist,
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      record:undefined
    };
  }
  componentDidMount(){
    window.apiconn.send_obj({
      obj: "admin",
      act: "shoppinglist",
      page_num: 0,
      page_size: 10000,
      content:'全部'
    });
  }
  sendGoods=(record)=>{
    this.setState({
      record,
      visible:true
    })
  }
  getTableColumns=(fields)=>{
    const extraFields = [{
      key: 'operator',
      name: '操作',
      render: (text, record) => (
        <div>
          <a disabled={record.status!=='待发货'}  onClick={()=>this.sendGoods(record)}>发货</a>
        </div>)}];
       return createColumns(fields).enhance(extraFields).values()

  };
  handleSearch=(param)=>{
    let content=param.content||'全部';
    window.apiconn.send_obj({
      obj: "admin",
      act: "shoppinglist",
      page_num: 0,
      page_size: 10000,
      content
    });
  };
  render() {
    const {visible}=this.state;
    const {shoppinglist}=this.props;
    const searchProps={
      fields:createFields(searchFields).values(),
      onSearch: this.handleSearch,
    };
    const tableProps={
      dataSource:shoppinglist,
      columns:this.getTableColumns(tableFields),
      bordered:true,

    };
    const dealModalProps={
      onCancel:()=>this.setState({visible:false}),
      onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'carsend',
            ...values,
            id:this.state.record.id

          });
        this.setState({
          visible:false
        })
      }
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <SearchForm {...searchProps} />
          <Table {...tableProps} />
        </Card>
        {visible&&<DealModal {...dealModalProps} />}
      </PageHeaderWrapper>
        );
  }
}
export default Index;
