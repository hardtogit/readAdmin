import React from 'react';
import {Modal,Form,Col,Select,DatePicker} from 'antd'
import {combineDate} from '../../../utils/utils'
import InputNumberGroup from '../../../components/InputNumberGroup'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};
const lLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const FormItem =Form.Item;
const {RangePicker}=DatePicker;
const {Option}=Select;
@Form.create()
class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }}

  render(){
    const {onCancel,form:{getFieldDecorator},onOk,form,callBack,goldread,goldmollist}=this.props;
    const {_id}=goldread;
    const modalProps={
      title:_id&&'修改积分卡'||'生成积分卡',
      visible:true,
      width:620,
      onCancel,
      onOk:()=>{
        form.validateFields((err, values) => {
            if (!err) {
              const {TimeInterval} = values;
              delete values.TimeInterval;
              const { startDate: starttime, endDate: endtime } = combineDate(TimeInterval);
              onOk({...values,starttime:new Date(starttime).getTime()/1000,endtime:new Date(endtime).getTime()/1000});
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
              {...layout}
              label="积分卡模板"
            >
              {getFieldDecorator('goldmol', {
                rules: [{
                  required: true,
                  message: '积分卡模板必须选择'
                }],
              })(
                <Select>
                  {goldmollist.map((item)=>( <Option value={item._id} key={item._id}>{item.name}({item.value})</Option>))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...layout}
              label="数量"
            >
              {getFieldDecorator('number', {
                rules: [{
                  required: true,
                  message: '数量必须填写'
                }],
              })(
                <InputNumberGroup min={0} precision={0} addonAfter="张" />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...lLayout}
              label="有效期"
            >
              {getFieldDecorator('TimeInterval', {
                initialValue: goldread&&goldread.starttime,
                rules: [{
                  required: true,
                  message: '有效期必须填写'
              }],})(
                <RangePicker
                  format="YYYY-MM-DD"
                  placeholder={['开始时间', '结束时间']}
                />
              )}
            </FormItem>
          </Col>

        </Form>
      </Modal>
    )

  }

}
export  default Index
