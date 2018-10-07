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
    const {onCancel,form:{getFieldDecorator},onOk,classifylist,form,callBack,freightread}=this.props;
    const {_id}=freightread;
    const modalProps={
      title:_id&&'修改优惠券'||'添加优惠卷',
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
                  initialValue: freightread&&freightread.name,
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
              label="立减金额"
            >
              {getFieldDecorator('reduce', {
              initialValue: freightread&&freightread.reduce,
              rules: [{
                required: true,
                message: '请输入立减金额'
              }],
            })(
              <InputNumberGroup min={0} precision={0} addonAfter="元" />
            )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="最低限额"
            >
              {getFieldDecorator('limit', {
              initialValue: freightread&&freightread.limit,
              rules: [{
                required: true,
                message: '请输入最低限额'
              }],
            })(
              <InputNumberGroup min={0} precision={0} addonAfter="元" />
            )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="有效期"
            >
              {getFieldDecorator('days', {
                initialValue: freightread&&freightread.days,
                rules: [{
                  required: true,
                  message: '请输入有效期'
                }],
              })(
                <InputNumberGroup min={0} precision={0} addonAfter="天" />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="积分"
            >
              {getFieldDecorator('gold', {
                initialValue: freightread&&freightread.gold,
                rules: [{
                  required: true,
                  message: '请输入兑换积分'
                }],
              })(
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
                initialValue: freightread&&freightread.status,
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
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="商品类型"
            >
              {getFieldDecorator('classify', {
                initialValue: freightread&&freightread.classify,
                rules: [{
                  required: true,
                  message: '请选择适用商品'
                }],
              })(
                <Select mode="multiple">
                  {
                    classifylist.map((item)=><Option key={item.recordid} value={item.name}>{item.name}</Option>)
                  }
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
