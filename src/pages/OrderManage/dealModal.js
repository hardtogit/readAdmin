import React from 'react';
import {Modal,Form,Input,Select,InputNumber,Tree} from 'antd'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const FormItem=Form.Item
@Form.create()
class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={
       value:[]
    }}

  componentWillReceiveProps(nextProps){

  }
  render(){
    const {onCancel,form:{getFieldDecorator},onOk,form,callBack,roleread}=this.props;
    const modalProps={
      title:'发货',
      visible:true,
      width:600,
      onCancel,
      onOk:()=>{
        form.validateFields((err, values) => {
            if (!err) {
              onOk({...values});
              if(callBack){
                callBack(1,100000)
              }
              onCancel()
            }
          }
        );
      }
    };
    return (
      <Modal {...modalProps}>
        <Form className="clearfix">
          <FormItem
            {...layout}
            label="快递公司"
          >
            {getFieldDecorator('company', {
                  rules: [{
                    required: true,
                    message: '公司名字必须填写'
                  }],
                })(
                  <Input placeholder="请输入快递公司" />
                )}
          </FormItem>
          <FormItem
            {...layout}
            label="物流号"
          >
            {getFieldDecorator('number', {
              rules: [{
                required: true,
                message: '物流号必须填写'
              }],
            })(
              <Input placeholder="请输入物流号" />
            )}
          </FormItem>
        </Form>
      </Modal>
      )

  }

}
export  default Index
