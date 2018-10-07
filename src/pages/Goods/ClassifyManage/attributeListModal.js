import React from 'react'
import {Modal,Table,Button} from 'antd'
import TableUtils from '@/utils/table'
import Operation from '@/components/Operation/Operation';
import AttributeModal from './attributeModal'
import { attributeTableFields } from './fields';

const getList=(pn,ps,recordid)=> {
  window.apiconn.send_obj({
    obj: "admin",
    act: "attributelist",
    page_num: pn,
    page_size: ps,
    recordid
  });
}
const {createColumns}=TableUtils;
class AttributeListModal extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visModal:false,
      opType:'edit'
    }
  }

  componentDidMount(){
    const {recordid}=this.props;
    getList(1,10000,recordid)
  }

  getTableColumns=(fields)=>{
    const {recordid}=this.props;
    const extraFields = [{
      key: 'operator',
      name: '操作',
      width:240,
      render: (text, record) => (
        <div>
          <Operation
            disable={record.status === 'DISABLE'}
            onClick={() =>{
              const {_id}=record;
              window.apiconn.send_obj({
                obj:"admin",
                act:"attributeread",
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
            onClick={() => {
              const {_id}=record;
              Modal.confirm({
                title:'确定删除该条数据？',
                onOk:()=>{
                  window.apiconn.send_obj({
                    obj:"admin",
                    act:"attributedel",
                    id:_id
                  });
                  getList(1,10000,recordid);
                }
              })



            }}
          >删除
          </Operation>
        </div>)}];
    return createColumns(fields).enhance(extraFields).values()

  };

  render(){
    const {onCancel,onOk,form,callBack,attributelist,attributeread,recordid}=this.props;
    const {visModal,opType}=this.state;
    const {_id}=attributeread
    const modalProps={
      'add':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'attributeadd',
            recordid,
            ...values
          })
        },
        attributeread:{}
      },
      'edit':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'attributemodi',
            id:_id,
            recordid,
            ...values
          })
        },
        attributeread
      }
    };
    const tableProps={
      columns:this.getTableColumns(attributeTableFields),
      bordered:true,
      dataSource:attributelist
    };
    const listModalProps={
      title:'属性列表',
      visible:true,
      width:1000,
      onCancel,
      onOk:()=>{
         onCancel()
      }
    };
    const  AttributeModalProps={
      onCancel: () => {
        this.setState({ visModal: false })
      },
      callBack:()=>getList(1,10000,recordid),
      ...modalProps[opType]
    }
    return(

      <Modal {...listModalProps}>
        <Button type='primary' onClick={()=>this.setState({visModal:true,opType:'add'})}>新增</Button>
        <p />
        <Table {...tableProps} />
        {visModal&& <AttributeModal {...AttributeModalProps} /> }

      </Modal>
    )
  }

}
export default AttributeListModal
