import React from 'react';
import {Modal,Form,Input,Col,Select,InputNumber} from 'antd'
import InputNumberGroup from '../../../components/InputNumberGroup'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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
    const {onCancel,form:{getFieldDecorator},onOk,form,callBack,goldmolread}=this.props;
    const {_id}=goldmolread;
    const modalProps={
      title:_id&&'修改积分卡'||'添加积分卡',
      visible:true,
      width:620,
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
          <Col span={12}>
            <FormItem
              {...layout}
              label="名称"
            >
              {getFieldDecorator('name', {
                initialValue: goldmolread&&goldmolread.name,
                rules: [{
                  required: true,
                  message: '名称必须填写'
                }],
              })(
                <Input  />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="积分"
            >
              {getFieldDecorator('value', {
                initialValue: goldmolread&&goldmolread.value,
                rules: [{
                  required: true,
                  message: '积分必须填写'
              }],})(
                <InputNumber style={{width:'100%'}} min={0} precision={0} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="是否有效"
            >
              {getFieldDecorator('status', {
                initialValue: goldmolread&&goldmolread.status,
                rules: [{
                  required: true,
                  message: '状态必须填写'
                }],
              })(
                <Select>
                  <Option value="是">是</Option>
                  <Option value="否">否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Form>
      </Modal>
    )

  }

}
export  default Index
