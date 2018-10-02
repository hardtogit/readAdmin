import React from 'react';
import {Modal,Form,Input,Select,InputNumber} from 'antd'
import InputNumberGroup from '../../../components/InputNumberGroup'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const FormItem =Form.Item;
const {Option}=Select;
@Form.create()
class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }}

  render(){
    const {onCancel,form:{getFieldDecorator},onOk,form,callBack,couponread}=this.props;
    const modalProps={
      title:'添加角色',
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
            label="角色名称"
          >
            {getFieldDecorator('name', {
                  initialValue: couponread&&couponread.name,
                  rules: [{
                    required: true,
                    message: '名称必须填写'
                  }],
                })(
                  <Input  />
                )}
          </FormItem>
          <FormItem
            {...layout}
            label="排序"
          >
            {getFieldDecorator('reduce', {
              initialValue: couponread&&couponread.reduce,
              rules: [{
                required: true,
                message: '请输入立减金额'
              }],
            })(
              <InputNumber min={0} precision={0} style={{width:'100%'}} />
            )}
          </FormItem>
          <FormItem
            {...layout}
            label="角色描述"
          >
            {getFieldDecorator('limit', {
              initialValue: couponread&&couponread.limit,
              rules: [{
                required: true,
                message: '请输入最低限额'
              }],
            })(
              <InputNumberGroup min={0} precision={0} addonAfter="元" />
            )}
          </FormItem>
          <FormItem
            {...layout}
            label="是否有效"
          >
            {getFieldDecorator('status', {
                initialValue: couponread&&couponread.status,
                rules: [{
                  required: true,
                  message: '请选择是否有效'
                }],
              })(
                <Select>
                  <Option value="是">是</Option>
                  <Option value="否">否</Option>
                </Select>
              )}
          </FormItem>
        </Form>
      </Modal>
      )

  }

}
export  default Index
