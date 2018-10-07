import React from 'react';
import {Modal,Form,Input,Select,InputNumber,Tree} from 'antd'
import treeData from '../../../../config/menus.config'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const {TextArea}=Input;
const {TreeNode}=Tree;
const FormItem =Form.Item;
const {Option}=Select;
const TreeList=[];
const tree2Arr = (tree, parentIds) => {
  tree.forEach((item) => {
    item.parentIds = parentIds;
    TreeList.push(item);
    if (item.children) {
      tree2Arr(item.children, [...parentIds, item.id.toString()]);
    }
  });
};
tree2Arr(treeData, []);
const renderTreeNodes = data => data.map((item) => {
  if (item.children) {
    return (
      <TreeNode title={item.title} key={item.id} dataRef={item}>
        {renderTreeNodes(item.children)}
      </TreeNode>
    );
  }
  return <TreeNode title={item.title} key={item.id} dataRef={item} />;
});
@Form.create()
class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={
       value:[]
    }}

  componentWillReceiveProps(nextProps){
     const {roleread}=nextProps;
    if(roleread&&roleread.right){
       this.setState({
         value:roleread.right
       })
    }

  }

  onCheck=(selectedKeys, even)=>{
    let selectArr = [];
    const childrenIds = [];
    const selectNode = TreeList.filter(item => item.id === even.node.props.eventKey);
    TreeList.forEach((item) => {
      if (item.parentIds.indexOf(selectNode[0].id) !== -1) {
        childrenIds.push(item.id);
      }
    });
    if (even.checked) {
      selectArr = [...selectedKeys.checked, ...selectNode[0].parentIds, ...childrenIds];
    } else {
      selectArr = selectedKeys.checked.filter(item => childrenIds.indexOf(item) === -1);
    }
    const selectSet = new Set(selectArr);
    console.log(selectSet)
    this.setState({
      value: [...selectSet]
    });
  };

  render(){
    const {onCancel,form:{getFieldDecorator},onOk,form,callBack,roleread}=this.props;
    const {value}=this.state;
    const {_id}=roleread;
    const modalProps={
      title:_id?'修改角色':'添加角色',
      visible:true,
      width:600,
      onCancel,
      onOk:()=>{
        form.validateFields((err, values) => {
            if (!err) {

              onOk({...values,right:value});
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
          <FormItem
            {...layout}
            label="角色名称"
          >
            {getFieldDecorator('name', {
                  initialValue: roleread&&roleread.name,
                  rules: [{
                    required: true,
                    message: '名称必须填写'
                  }],
                })(
                  <Input  />
                )}
          </FormItem>
          <FormItem
            {...layout}
            label="排序"
          >
            {getFieldDecorator('order', {
              initialValue: roleread&&roleread.order,
              rules: [{
                required: true,
                message: ''
              }],
            })(
              <InputNumber min={0} precision={0} style={{width:'100%'}} />
            )}
          </FormItem>
          <FormItem
            {...layout}
            label="是否有效"
          >
            {getFieldDecorator('status', {
              initialValue: roleread&&roleread.status,
              rules: [{
                required: true,
                message: '请选择是否有效'
              }],
            })(
              <Select>
                <Option value="有效">有效</Option>
                <Option value="无效">无效</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...layout}
            label="角色描述"
          >
            {getFieldDecorator('comment', {
              initialValue: roleread&&roleread.comment,
              rules: [{
                required: true,
                message: '请输入角色描述'
              }],
            })(
              <TextArea />
            )}
          </FormItem>
          <FormItem
            {...layout}
            label="菜单权限"
          >
            <div className='ant-input' style={{height:'240px',overflow:'auto',border:'1px solid #ddd'}}>
              <Tree
                onCheck={this.onCheck}
                checkable
                checkStrictly
                checkedKeys={value}
              >
                {renderTreeNodes(treeData)}
              </Tree>
            </div>

          </FormItem>
        </Form>
      </Modal>
      )

  }

}
export  default Index
