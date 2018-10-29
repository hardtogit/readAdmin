import React from 'react';
import {routerRedux} from 'dva/router'
import {Link} from 'react-router-dom'
import {Table,Card,Select,Button} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AuthComponent from '@/components/AuthComponent';
import { connect } from 'dva/index';
import * as XLSX from 'xlsx'
import GoodsModal from './goodsModal'
import {tableFields,searchFields,fieldsMapping} from './fields';
import Operation from '../../../components/Operation/Operation';
import SearchForm from '../../../components/SearchForm';
import FormUtils from '../../../utils/form';
import TableUtils from '../../../utils/table'
import { looseEqual } from '../../../utils/share';

const {createFields}=FormUtils;
const {createColumns}=TableUtils;
const {Option}=Select;
const getList=(pn,ps,params)=> {
  window.apiconn.send_obj({
    obj: "admin",
    act: "goodslist",
    page_num: pn,
    page_size: ps,
    ...params
  });
}

@connect(({ goodsManage }) => ({
  goodslist:goodsManage.goodslist,
  goodsread:goodsManage.goodsread,
  classifylist:goodsManage.classifylist,
  goodsexport:goodsManage.goodsexport
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visable:false,
      search:{},
      pn:1,
      ps:10
    };
    this.outFile='';
  }

  componentDidMount(){
    this.outFile = document.getElementById('downlink')
    setTimeout(()=>{
      getList(1,10);
      window.apiconn.send_obj({
        obj: "admin",
        act: "classifylist",
        page_num: 1,
        page_size: 10000
      });
    },1000)

  }

  componentWillReceiveProps({goodsexport}){
    const {dispatch}=this.props;
      if(goodsexport&&goodsexport.length&&!looseEqual(goodsexport, this.props.goodsexport)){
        const arr=[];
        goodsexport.forEach((good)=>{
          const obj={};
              Object.keys(good).forEach((key)=>{
                   if(fieldsMapping[key]){
                     obj[fieldsMapping[key]]=good[key]
                   }

              });
          arr.push(obj)
        });
        this.downloadFile(arr)
        dispatch({
          type:'goodsManage/cleargoodsexport'
        })
      }
  }

  getSearchField(fields) {
    const { classifylist } = this.props;
    const extraFields = [
      {
        key: 'classify',
        name: '商品分类',
        render: () => (
          <Select
            placeholder="请选择分类"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value=''>全部</Option>
            {classifylist.map((classify) => <Option key={classify.id} value={classify.name}>{classify.name}</Option>)}
          </Select>
        ),
      }
    ];

    return createFields(fields).enhance(extraFields).values();
  }

  getTableColumns=(fields)=>{
    const {pn,ps,search}=this.state;
    const extraFields = [{
      key: 'operator',
      name: '操作',
      render: (text, record) => (
        <div>
          <AuthComponent code="010102">
            <Link to={`/goods/detail/${record.id}`}>修改</Link>
            <span className="ant-divider" />
          </AuthComponent>
          <AuthComponent code="010103">
            <Operation
              disable={record.status === 'DISABLE'}
              onClick={() =>{
                window.apiconn.send_obj({
                  obj: "admin",
                  act: "goodsdel",
                  id:record.id,
                });
                setTimeout(
                  function() {
                    getList(pn,ps,search)
                  },1000
                )

              }}
            >删除
            </Operation>
          </AuthComponent>
        </div>)}];
       return createColumns(fields).enhance(extraFields).values()
  };

  downloadFile=(rs)=> { // 点击导出按钮
    let data = [{}]
    for (const k in rs[0]) {
      data[0][k] = k
    }
    data = data.concat(rs)
    this.downloadExl(data, '商品数据')
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
    const {pn,ps,search,visable}=this.state;
    const {goodslist,dispatch,goodsread}=this.props;
    const searchProps={
      fields:this.getSearchField(searchFields),
      onSearch: this.handleSearch,
    };
    const tableProps={
      columns:this.getTableColumns(tableFields),
      bordered:true,
      rowKey:'id',
      size:'small',
      dataSource:goodslist.list,
      pagination:{
        current:pn,
        pageSize:ps,
        total:goodslist.total*ps
      },
      onChange:({current})=>{
        this.setState({
          pn:current
        },()=>{
          getList(current,10,search)
        })
      }
    };
    const goodsModalProps={
      onCancel: () => {
        this.setState({ visable: false })
      },
      goodsread,
      callBack:()=>{getList(pn,10,search)}
    }
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <SearchForm {...searchProps} />
          <AuthComponent code="010101">
            <Button type='primary' style={{marginRight:'15px'}} onClick={()=>{dispatch(routerRedux.push('/goods/detail'))}}>新增</Button>
          </AuthComponent>
          <AuthComponent code="010105">
            <Button
              type='primary'
              onClick={()=>{
              window.apiconn.send_obj({
                obj: "admin",
                act: "goodsexport",
                ...search
              });
              // this.downloadFile()
            }}
            >导出
            </Button>
          </AuthComponent>
          <a id="downlink" />
          <p />
          <Table {...tableProps} />
          {visable&& <GoodsModal {...goodsModalProps} /> }
        </Card>

      </PageHeaderWrapper>
        );
  }
}
export default Index;
