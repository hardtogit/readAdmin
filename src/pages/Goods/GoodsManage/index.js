import React from 'react';
import {Table,Card} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {tableFields,searchFields} from './fields';
import Operation from '../../../components/Operation/Operation';
import SearchForm from '../../../components/SearchForm';
import FormUtils from '../../../utils/form';
import TableUtils from '../../../utils/table'
import { connect } from 'dva/index';

const {createFields}=FormUtils;
const {createColumns}=TableUtils;

@connect(({ goodsManage }) => ({
  classifylist:goodsManage.classifylist,
  classifyread:goodsManage.classifyread,
  attributelist:goodsManage.attributelist,
  attributeread:goodsManage.attributeread,
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const searchProps={
      fields:createFields(searchFields).values()
    };
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,

    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <SearchForm {...searchProps} />
          <Table {...tableProps} />
        </Card>

      </PageHeaderWrapper>
        );
  }
}
export default Index;
