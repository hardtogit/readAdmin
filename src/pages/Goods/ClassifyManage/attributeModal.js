import React from 'react';
import {Modal,Form,Input,Col,InputNumber,Tag,Icon,Tooltip} from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormItem =Form.Item;
@Form.create()
class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={
         tags:[],
      inputVisible:false
    }}

  componentWillReceiveProps(nextProps){
    const {attributeread}=nextProps
    if(attributeread&&attributeread.values){
      this.setState({
        tags:attributeread.values
      })
    }

  }

  handleClose = (removedTag) => {
    const {tags}=this.state;
    const leaveTags = tags.filter(tag => tag !== removedTag);
    this.setState({ tags:leaveTags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const {state} = this;
    const {inputValue} = state;
    let {tags} = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  render(){
    const {onCancel,form:{getFieldDecorator},onOk,form,callBack,attributeread={}}=this.props;
    const {tags, inputVisible, inputValue}=this.state;
    const {_id}=attributeread;
    const modalProps={
      title:_id&&'修改属性'||'添加属性',
      visible:true,
      width:620,
      onCancel,
      onOk:()=>{
        form.validateFields((err, values) => {
            if (!err) {
              onOk({...values,value:tags});
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
          <Col span={12}>
            <FormItem
              {...layout}
              label="名称"
            >
              {getFieldDecorator('name', {
                initialValue: attributeread&&attributeread.name,
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
              label="排序"
            >
              {getFieldDecorator('order', {
                initialValue: attributeread&&attributeread.order,
                rules: [{
                  required: true,
                  message: '积分必须填写'
                }],})(
                  <InputNumber style={{width:'100%'}} min={0} precision={0} />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              labelCol={{span:4}}
              wrapperCol={{span:20}}
              label="属性值"
            >
              <div className='ant-input'>
                {tags.map((tag) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
              })}
                {inputVisible && (
                <Input
                  ref={(input)=>{this.input=input}}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
                {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus" />添加属性
                </Tag>
              )}
              </div>
            </FormItem>
          </Col>
        </Form>
      </Modal>
    )

  }

}
export  default Index
