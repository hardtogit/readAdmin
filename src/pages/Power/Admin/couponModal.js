import React from 'react';
import {Modal,Form,Input,Col,Select,InputNumber,Checkbox} from 'antd'
import PicUpload  from '../../../components/PicUpload/head'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const lLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
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
    const {onCancel,form:{getFieldDecorator},onOk,form,callBack,adminread,rolelist,opType}=this.props;
    const flag=opType==='add';
    const modalProps={
      title:flag&&'添加账户'||'修改账户',
      visible:true,
      width:640,
      onCancel,
      onOk:()=>{
        form.validateFields((err, values) => {
          console.log(values)
            if (!err) {
              onOk({...values});
              if(callBack){
                callBack()
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
              labelCol={{span:3}}
              wrapperCol={{span:16}}
              label="头像"
            >
              {getFieldDecorator('headFid', {
                initialValue: adminread&&adminread.headFid,
                rules: [],
              })(
                <PicUpload pic={adminread&&adminread.headFid} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="昵称"
            >
              {getFieldDecorator('display_name', {
                initialValue: adminread&&adminread.display_name,
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
                initialValue: adminread&&adminread.phone,
                rules: [{
                  required: true,
                  message: '请输入手机号'
                }],
              })(
                <Input disabled={!flag} />
              )}
            </FormItem>
          </Col>
          {flag&&
            <span>
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
            </span>
          }

          {!flag&&
            <span>
              <Col span={12}>
                <FormItem
                  {...layout}
                  label="积分"
                >
                  {getFieldDecorator('gold', {
                initialValue: adminread&&adminread.gold,
                rules: [],})(
                  <InputNumber style={{width:'100%'}} min={0} precision={0} />
              )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...layout}
                  label="VIP等级"
                >
                  {getFieldDecorator('grade', {
            initialValue: adminread&&adminread.grade,
            rules: [],})(
              <Select>
                <Option value="LV1">LV1</Option>
                <Option value="LV2">LV2</Option>
                <Option value="LV3">LV3</Option>
                <Option value="LV4">LV4</Option>
                <Option value="LV5">LV5</Option>
                <Option value="LV6">LV6</Option>
                <Option value="LV7">LV7</Option>
                <Option value="LV8">LV8</Option>
                <Option value="LV9">LV9</Option>
                <Option value="LV10">LV10</Option>
              </Select>
            )}
                </FormItem>
              </Col>
            </span>}

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
          <Col span={24}>
            <FormItem
              {...lLayout}
              label="角色"
            >
              {getFieldDecorator('role', {
                initialValue: adminread&&adminread.role||[],
                rules: [{
                  required: true,
                  message: '角色必须选择'
                }],
              })(
                <Checkbox.Group>
                  {
                    rolelist.map((role)=>
                      <Checkbox
                        style={{width:'110px',float:'left',marginLeft:'0',marginRight:'8px'}}
                        value={role.id}
                      >{role.name}
                      </Checkbox>)
                  }
                </Checkbox.Group>
              )}
            </FormItem>
          </Col>
        </Form>
      </Modal>
    )
  }
}
export  default Index
