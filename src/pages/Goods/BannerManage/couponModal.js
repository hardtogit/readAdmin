import React from 'react';
import {Modal,Form,Input,Col,Select,InputNumber} from 'antd'
import InputNumberGroup from '../../../components/InputNumberGroup'
import PicUpload  from '../../../components/PicUpload'
import Editor from '../../../components/Editor'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const lLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormItem =Form.Item;
const {Option}=Select;
const {TextArea}=Input;
@Form.create()
class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }}

  render(){
    const {onCancel,form:{getFieldDecorator},onOk,classifylist,form,callBack,bannerread}=this.props;
    const {_id}=bannerread;
    const modalProps={
      title:_id&&'修改素材'||'添加素材',
      visible:true,
      width:800,
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
              {...lLayout}
              label="广告图片"
            >
              {getFieldDecorator('fid', {
                initialValue: bannerread&&bannerread.fid,
              })(
                <PicUpload
                  picLength={1}
                  pageType
                  pic={bannerread.fid}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="类型"
            >
              {getFieldDecorator('subtype', {
                  initialValue: bannerread&&bannerread.subtype,
                rules: [{
                  required: true,
                  message: '请输入类型'
                }],
                })(
                  <Input  />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
              label="商品编号"
            >
              {getFieldDecorator('goodsflag', {
              initialValue: bannerread&&bannerread.goodsflag,
            })(
              <Input/>
            )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...lLayout}
              label="连接"
            >
              {getFieldDecorator('url', {
              initialValue: bannerread&&bannerread.url,
            })(
              <Input/>
            )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...lLayout}
              label="具体内容"
            >
              {getFieldDecorator('content', {
                initialValue: bannerread&&bannerread.content||'',
              })(
                <Editor/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...lLayout}
              label="备注"
            >
              {getFieldDecorator('comment', {
                initialValue: bannerread&&bannerread.comment,
              })(
                <TextArea></TextArea>
              )}
            </FormItem>
          </Col>

        </Form>
      </Modal>
      )

  }

}
export  default Index
