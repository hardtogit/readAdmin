import React from 'react';
import {Modal,Form,Input,Col,Select,InputNumber} from 'antd'
import PicUpload  from '../../../components/PicUpload'

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

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('login_passwd')) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  }

  render(){
    const {onCancel,form:{getFieldDecorator},onOk,form,callBack,adminread}=this.props;
    const {_id}=adminread;
    const modalProps={
      title:_id&&'修改账户'||'添加账户',
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
          <Col span={24}>
            <FormItem
              labelCol={{span:4}}
              wrapperCol={{span:16}}
              label="头像"
            >
              {getFieldDecorator('headFid', {
                initialValue: adminread&&adminread.headFid,
                rules: [{
                  required: true,
                  message: '昵称必须填写'
                }],
              })(
                <PicUpload />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="昵称"
            >
              {getFieldDecorator('display_name', {
                initialValue: adminread&&adminread.name,
                rules: [{
                  required: true,
                  message: '昵称必须填写'
                }],
              })(
                <Input  />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="手机号"
            >
              {getFieldDecorator('phone', {
                initialValue: adminread&&adminread.name,
                rules: [{
                  required: true,
                  message: '请输入手机号'
                }],
              })(
                <Input  />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="密码"
            >
              {getFieldDecorator('login_passwd', {
                initialValue: adminread&&adminread.login_passwd,
                rules: [{
                  required: true,
                  message: '请输入密码'
                }],
              })(
                <Input  />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="确认密码"
            >
              {getFieldDecorator('login_passwd_ack', {
                initialValue: adminread&&adminread.login_passwd_ack,
                rules: [{
                  required: true,
                  message: '请确认密码'
                },{
                  validator: this.compareToFirstPassword,
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
                initialValue: adminread&&adminread.value,
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
                initialValue: adminread&&adminread.status,
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
          <Col span={12}>
            <FormItem
              {...layout}
              label="角色"
            >
              {getFieldDecorator('status', {
                initialValue: adminread&&adminread.status,
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
