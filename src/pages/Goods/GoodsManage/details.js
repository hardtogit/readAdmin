import React from 'react';
import {Card,Form,Col,Input} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PicUpload from '@/components/PicUpload'

const layout = {
  labelCol: { span:2 },
  wrapperCol: { span: 5 },
};
const FormItem=Form.Item;
@Form.create()
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {form:{getFieldDecorator},goodsread={}}=this.props
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form className="clearfix">
            <Col span={24}>
              <FormItem
                {...layout}
                label="名称"
              >
                {getFieldDecorator('goodsName', {
                  initialValue: goodsread&&goodsread.goodsName,
                  rules: [{
                    required: true,
                    message: '名称必须填写'
                  }],
                })(
                  <Input  />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...layout}
                label="商品图片"
              >
                {getFieldDecorator('picture', {
                  initialValue: goodsread&&goodsread.picture,
                  rules: [{
                    required: true,
                    message: '图片必须上传'
                  }],
                })(
                  <PicUpload />
                )}
              </FormItem>
            </Col>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
