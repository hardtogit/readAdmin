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
    const {onCancel,form:{getFieldDecorator},onOk,classifylist,form}=this.props;
    const modalProps={
      title:'添加优惠卷',
      visible:true,
      width:620,
      onCancel,
      onOk:()=>{
        form.validateFields((err, values) => {
            if (!err) {
              onOk({...values})
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
                  initialValue: '',
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
              initialValue: '',
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
              extra="如不填，则没有限制"
            >
              {getFieldDecorator('limit', {
              initialValue: '',
              rules: [],
            })(
              <InputNumberGroup min={0} precision={0} addonAfter="元" />
            )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="有效期"
              extra="如不填，则没有限制"
            >
              {getFieldDecorator('days', {
                initialValue: '',
                rules: [],
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
                initialValue: '',
                rules: [],
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
                initialValue: '是',
                rules: [],
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
              extra="如不填，则适用所有商品"
            >
              {getFieldDecorator('classify', {
                initialValue: [],
                rules: [],
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
