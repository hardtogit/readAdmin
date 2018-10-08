import React from 'react';
import {Modal,Form,Col,Select} from 'antd'
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
    const {onCancel,form:{getFieldDecorator},onOk,provincelist,form,callBack,freightread}=this.props;
    const {_id}=freightread;
    const modalProps={
      title:_id&&'修改运费配置'||'添加运费配置',
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
              label="目的地"
            >
              {getFieldDecorator('destination', {
                  initialValue: freightread&&freightread.destination,
                  rules: [{
                    required: true,
                    message: '省份必须选择'
                  }],
                })(
                  <Select disabled={_id}>
                    {provincelist.map((item)=>(<Option key={item}>{item}</Option>))}

                  </Select>
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="首重价格"
            >
              {getFieldDecorator('firstwei', {
              initialValue: freightread&&freightread.firstwei,
              rules: [{
                required: true,
                message: '请输入首重价格'
              }],
            })(
              <InputNumberGroup min={0} precision={2} addonAfter="元" />
            )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="续重价格"
            >
              {getFieldDecorator('secondwei', {
                initialValue: freightread&&freightread.secondwei,
                rules: [{
                  required: true,
                  message: '请输入续重价格'
                }],
              })(
                <InputNumberGroup min={0} precision={2} addonAfter="元" />
              )}
            </FormItem>
          </Col>
        </Form>
      </Modal>
      )

  }

}
export  default Index
