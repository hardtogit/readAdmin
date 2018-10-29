import React from 'react';
import {Modal,Form,Input,Select,InputNumber,Tree} from 'antd'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const {TextArea}=Input;
const FormItem =Form.Item;
const {Option}=Select;

@Form.create()
class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state={}
  }

  render(){
    const {onCancel,form:{getFieldDecorator},onOk,form,callBack,goodsread}=this.props;
    const modalProps={
      title:'修改商品',
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
            label="类型名称"
          >
            {getFieldDecorator('name', {
                  initialValue: goodsread&&goodsread.name,
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
            {getFieldDecorator('order', {
              initialValue: goodsread&&goodsread.order,
              rules: [{
                required: true,
                message: ''
              }],
            })(
              <InputNumber min={0} precision={0} style={{width:'100%'}} />
            )}
          </FormItem>
          <FormItem
            {...layout}
            label="是否有效"
          >
            {getFieldDecorator('status', {
              initialValue: goodsread&&goodsread.status,
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
