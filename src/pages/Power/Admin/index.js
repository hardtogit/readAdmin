import React from 'react';
import {Table,Card,Button,Modal,Select} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AuthComponent from '@/components/AuthComponent';
import { connect } from 'dva/index';
import {tableFields,searchFields,fieldsMapping} from './fields';
import Operation from '@/components/Operation/Operation';
import SearchForm from '@/components/SearchForm';
import FormUtils from '@/utils/form';
import TableUtils from '@/utils/table'
import CouponModal from './couponModal'
import * as XLSX from 'xlsx';
import { looseEqual } from '../../../utils/share';

const {createFields}=FormUtils;
const {createColumns}=TableUtils;
const {Option}=Select;
const getList=(pn,ps,params)=> {
  window.apiconn.send_obj({
    obj: "admin",
    act: "adminlist",
    page_num: pn,
    page_size: ps,
  ...params
  });
}

@connect(({ adminManage }) => ({
  adminlist:adminManage.adminlist,
  adminread:adminManage.adminread,
  adminexport:adminManage.adminexport,
  rolelist:adminManage.rolelist
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visModal:false,
      opType:'add',
      search:{},
      pn:1,
      ps:10
    };
    this.outFile='';
  }

  componentDidMount(){
    getList(1,10);
    this.outFile = document.getElementById('downlink')
    window.apiconn.send_obj({
      obj: "admin",
      act: "roleselectlist",
      id:undefined,
      page_num: 1,
      page_size: 100000
    });
  }
  componentWillReceiveProps ({adminexport}){
    const {dispatch}=this.props;
    if(adminexport&&adminexport.length&&!looseEqual(adminexport, this.props.adminexport)){
      const arr=[];
      adminexport.forEach((good)=>{
        const obj={};
        Object.keys(good).forEach((key)=>{
          if(fieldsMapping[key]){
            obj[fieldsMapping[key]]=good[key]
          }

        });
        arr.push(obj)
      });
      this.downloadFile(arr);
      dispatch({
        type:'adminManage/cleargoodsexport'
      })
    }
  }
  downloadFile=(rs)=> { // 点击导出按钮
    let data = [{}];
    for (const k in rs[0]) {
      data[0][k] = k
    }
    data = data.concat(rs);
    this.downloadExl(data, '用户数据')
  }

  downloadExl= (json, downName, type)=> {  // 导出到excel
    const keyMap = [] // 获取键
    for (const k in json[0]) {
      keyMap.push(k)
    }
    console.info('keyMap', keyMap, json)
    const tmpdata = [] // 用来保存转换好的json
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
      v: v[k],
      position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v) => {
      tmpdata[v.position] = {
        v: v.v
      }
    })
    const outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
    const tmpWB = {
      SheetNames: ['mySheet'], // 保存的表标题
      Sheets: {
        'mySheet': Object.assign({},
          tmpdata, // 内容
          {
            '!ref': `${outputPos[0]  }:${  outputPos[outputPos.length - 1]}` // 设置填充区域
          })
      }
    }
    const tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
      {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
    ))], {
      type: ''
    })  // 创建二进制对象写入转换好的字节流
    const href = URL.createObjectURL(tmpDown)  // 创建对象超链接
    this.outFile.download = `${downName  }.xlsx`  // 下载名称
    this.outFile.href = href  // 绑定a标签
    this.outFile.click()  // 模拟点击实现下载
    setTimeout(() => {  // 延时释放
      URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
    }, 100)
  };

  s2ab=(s)=> { // 字符串转字符流
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }
  getSearchField(fields) {
    const { rolelist } = this.props;
    const extraFields = [
    {
        key: 'role',
        name: '角色',
        render: () => (
          <Select
            placeholder="请选择角色"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value=''>全部</Option>
            {rolelist.map((role) => <Option key={role.id} value={role.name}>{role.name}</Option>)}
          </Select>
        ),
      }
    ];

    return createFields(fields).enhance(extraFields).values();
  }

  getTableColumns=(fields)=>{
    const {pn,search}=this.state;
    const extraFields = [{
      key: 'operator',
      name: '操作',
      render: (text, record) => (
        <div>
          <AuthComponent code="030102">
            <Operation
              disable={record.status === 'DISABLE'}
              onClick={() =>{
              const {id}=record;
              window.apiconn.send_obj({
                obj:"admin",
                act:"adminread",
                id
              });
              this.setState({
                visModal:true,
                opType:'edit',
                id
              })
            }}
            >修改
            </Operation>
            <span className="ant-divider" />
          </AuthComponent>
          <AuthComponent code="030103">
            <Operation
              disable={record.id === -1}
              onClick={() => {
              const {id}=record;
              Modal.confirm({
                title:'确定删除该条数据？',
                onOk:()=>{
                  window.apiconn.send_obj({
                    obj:"admin",
                    act:"admindelete",
                    id
                  });
                  getList(pn,10,search);
                }
              })
            }}
            >删除
            </Operation>
          </AuthComponent>
        </div>)}];
    return createColumns(fields).enhance(extraFields).values()

  };

  handleSearch=(search, type)=> {
    let newSearch;
    if (type === 'reset') {
      newSearch = { ...search };
    } else {
      newSearch = { ...search };
    }
    this.setState({
      pn:1,
      search
    });
    getList(1,10,newSearch)
  };

  render() {
    const {visModal,opType,id,pn,ps,search}=this.state;
    const {adminlist,adminread,rolelist}=this.props;
    // const searchProps={
    //   fields:createFields(searchFields).values()
    // };
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,
      pagination:{
        current:pn,
        pageSize:ps,
        total:adminlist.total*ps
      },
      dataSource:adminlist.list,
      onChange:({current})=>{
        this.setState({
          pn:current
        },()=>{
          getList(current,10,search)
        })
      }
    };
    const modalProps={
      'add':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'adminadd',
            ...values
          })
        },
        opType:'add',
        adminread:{}
      },
      'edit':{
        onOk:(values)=>{
          window.apiconn.send_obj({
            obj:'admin',
            act:'adminmodi',
            id,
            ...values
          })
        },
        opType:'edit',
        adminread
      }
    };
    const searchProps={
      fields:this.getSearchField(searchFields),
      onSearch: this.handleSearch,
    };
    const couponModalProps= {
      onCancel: () => {
        this.setState({ visModal: false })
      },
      rolelist,
      callBack:()=>{getList(pn,10,search)},
      ...modalProps[opType]
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <SearchForm {...searchProps} />
          <AuthComponent code="030101">
            <Button type='primary' style={{marginRight:'15px'}} onClick={()=>this.setState({visModal:true,opType:'add'})}>新增</Button>
          </AuthComponent>
          <AuthComponent code="030104">
            <Button
              type='primary'
              onClick={()=>{
              window.apiconn.send_obj({
                obj: "admin",
                act: "adminexport",
                ...search
              });
            }}
            >导出
            </Button>
            <a id="downlink" />
          </AuthComponent>
          <p />
          <Table {...tableProps} />
          {visModal&& <CouponModal {...couponModalProps} /> }
        </Card>

      </PageHeaderWrapper>
    );
  }
}
export default Index;
