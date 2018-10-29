 const  searchFields=[
  {
    key: 'goodsname',
    name: '名称',
    type: 'text',
  },
   {
     key: 'sell',
     name: '上下架',
     enums: [
       { label: '全部', value: '' },
       { label: '上架', value: '上架' },
       { label: '下架', value: '下架'}
     ]
   },
   {
     key: 'classify',
     name: '商品分类',
     type: 'text',
   }
];
 const  tableFields=[
   {
     key: 'fid',
     name:'缩略图',
     render:(fid)=><img width={100} height={46} src={`http://116.62.164.251/cgi-bin/download.pl?fid=${fid}&proj=yyqq`} alt="" />
   },
   {
     key: 'goodsname',
     name: '名称',
   },
   {
     key: 'goodsflag',
     name: '商品标识',
   },
   {
     key: 'classify',
     name: '分类',
   },
   {
     key: 'sale',
     name: '总销量',
   },
   {
     key: 'store',
     name: '总库存',
   },
   {
     key: 'freight',
     name: '重量',
   },{
     key: 'sell',
     name: '状态',
   }
 ];
 const fieldsMapping={
   "goodsflag": "商品标识",
   "goodsname": "名称",
   "classify": "商品分类",
   "convert": "是否为积分兑换",
   "freight": "重量",
   "gold": "积分数量",
   "mprice": '市场价',
   "rprice": "实时价",
   "sale": "销售量",
   "sell": "上架状态",
   "store": "库存量",
   "style": "属性"
 }
 export  {
   searchFields,
   tableFields,
   fieldsMapping
 }
