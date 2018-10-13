import React from 'react';
import {Card,Form,Col,Input,Button,Select,Checkbox,Table,InputNumber,Row} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PicUpload from '@/components/PicUpload'
import { connect } from 'dva/index';
import TableUtils from '../../../utils/table';
import Editor from '../../../components/Editor'
import EditorCopy from '../../../components/EditorCopy'

let baseArray=[];
const layout = {
  labelCol: { span:2 },
  wrapperCol: { span: 5 },
};
const lLayout= {
  labelCol: { span:2 },
  wrapperCol: { span: 12 },
};
const {TextArea} =Input
const {createColumns}=TableUtils;
const {Option}=Select
const FormItem=Form.Item;
@connect(({ goodsDetail }) => ({
  classifylist:goodsDetail.classifylist,
  attributelist:goodsDetail.attributelist
}))
@Form.create()
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute:{

      },
      text:''
    };
  }

  componentDidMount(){
    window.apiconn.send_obj({
      obj: "admin",
      act: "classifylist",
      page_num: 1,
      page_size: 10000
    });
  }

  componentWillReceiveProps(nextProps){
    const {attributelist}=nextProps;
    if(attributelist.length){
      const obj={};
      attributelist.forEach((item)=>{
        obj[item.name]=[]
      });
      console.log(obj)
      this.setState({
        attribute:obj
      },()=>{
        console.log(this.state)
      })
    }
  }

  handleSelect=(value,option)=>{
    window.apiconn.send_obj({
      obj: "admin",
      act: "attributelist",
      page_num: 1,
      page_size: 10000,
      recordid:option.key
    });
  };

  handleQuillChange=(text)=>{
     this.setState({
       text
     })
  }

  handleChange=(label,checkedValues)=>{
    const {attribute}=this.state;
     this.setState({
       attribute:{
         ...attribute,
         [label]:checkedValues
       }
     })
  };

  createAttributedFields=(attribute)=>{
    const fields=[];
    Object.keys(attribute).forEach((key)=>{
      fields.push({
        key,
        name:key,
      })
    });
    const extraFields = [{
      key: 'integral',
      name: '积分',
      width:120,
      render: () => (
        <InputNumber style={{width:'100px'}} min={0} parser={0} defaultValue={0} />)},
      {
        key: 'mprice',
        name: '市场价',
        width:120,
        render: () => (
          <InputNumber style={{width:'100px'}} min={0} parser={2} defaultValue={0} />)},
      {
        key: 'rprice',
        name: '实时价',
        width:120,
        render: () => (
          <InputNumber style={{width:'100px'}} min={0} parser={2} defaultValue={0} />)},
      {
        key: 'store',
        name: '库存',
        width:120,
        render: () => (
          <InputNumber style={{width:'100px'}} min={0} parser={0} defaultValue={0} />)}];
    return createColumns(fields).enhance(extraFields).values()
  };

  getCombination=(array)=>{
     if(baseArray.length===0){
       baseArray=array;
      }else{
       const emptyArray=[];
       baseArray.forEach((item)=>{
         array.forEach((value)=>{
           emptyArray.push({...item,...value})
         })
       });
       baseArray=emptyArray;
     }
  };

  getTableData=(attribute)=>{
    const array=[];
     Object.keys(attribute).forEach((key)=>{
       const empty=[];
       attribute[key].forEach((item)=>{
         empty.push({[key]:item})
       });
       array.push(empty)
     });
     baseArray=[];
   array.every((item)=>{
     if(item.length===0){
       baseArray=[];
       return false;
     }
     this.getCombination(item)
     return true;
   });
    return baseArray;
  };

  handleSubmit=()=>{
    const {form}=this.props;
    form.validateFields((error,values)=>{
      if(!error){
        console.log(values)
      }

    })
  };

  render() {
    const {form:{getFieldDecorator},goodsread={},classifylist=[],attributelist}=this.props;
    const {attribute,text}=this.state;
    console.log('s' ,attribute)
    const columns=this.createAttributedFields(attribute);
    const dataSource=this.getTableData(attribute);
    const tableProps={
        columns,
      bordered:true,
      size:'small',
      dataSource,
      pagination:false
    };
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
                {...lLayout}
                label="商品图片"
              >
                {getFieldDecorator('picture', {
                  initialValue: goodsread&&goodsread.picture,
                  rules: [{
                    required: true,
                    message: '图片必须上传'
                  }],
                })(
                  <PicUpload picLength={3} />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...layout}
                label="是否为兑换商品"
              >
                {getFieldDecorator('convert', {
                  initialValue: goodsread&&goodsread.goodsName,
                  rules: [{
                    required: true,
                    message: '该属性必须选择'
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
                {...layout}
                label="是否上架"
              >
                {getFieldDecorator('sell', {
                  initialValue: goodsread&&goodsread.sell,
                  rules: [{
                    required: true,
                    message: '该属性必须选择'
                  }],
                })(
                  <Select>
                    <Option value="上架">上架</Option>
                    <Option value="下架">下架</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...lLayout}
                label="商品简介"
              >
                {getFieldDecorator('abstract', {
                  initialValue: goodsread&&goodsread.abstract,
                  rules: [{
                    required: true,
                    message: '简介必须填写'
                  }],
                })(
                  <TextArea autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...layout}
                label="商品分类"
              >
                {getFieldDecorator('classify', {
                  initialValue: goodsread&&goodsread.classify,
                  rules: [{
                    required: true,
                    message: '分类必须选择'
                  }],
                })(
                  <Select onSelect={this.handleSelect}>
                    {classifylist.map((item)=><Option key={item.recordid} value={item.name}>{item.name}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            {
              attributelist.map((item)=>(
                <Col span={24} key={item.name}>
                  <FormItem
                    {...lLayout}
                    label={item.name}
                  >
                    <Checkbox.Group onChange={(checkedValues)=>this.handleChange(item.name,checkedValues)} value={attribute[item.name]}>
                      {item.values.map((value)=><Checkbox key={value} value={value}>{value}</Checkbox>)}
                    </Checkbox.Group>
                  </FormItem>
                </Col>
                  ))
            }
            <Col span={24}>
              <FormItem
                {...lLayout}
                label="详细商品信息"
              >
                <Table {...tableProps} />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...lLayout}
                label="商品详情"
              >
                {getFieldDecorator('detailinfo', {
                  initialValue: goodsread&&goodsread.detailinfo||'',
                  rules: [{
                    required: true,
                    message: '详情必须填写'
                  }],
                })(
                  <Editor />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...lLayout}
                label="竞拍规则"
              >
                {getFieldDecorator('rule', {
                  initialValue: goodsread&&goodsread.rule||'',
                  rules: [{
                    required: true,
                    message: '详情必须填写'
                  }],
                })(
                  <EditorCopy />
                )}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem
                {...layout}
                label=" "
                colon={false}
              >
                <Button>返回</Button> <Button onClick={this.handleSubmit}>确定</Button>
              </FormItem>
            </Col>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
