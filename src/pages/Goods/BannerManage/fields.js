 const  searchFields=[
  {
    key: 'name', // 字段key
    name: '名称', // 字段name
    type: 'text', // 字段类型支持如下类型: date|datetime|datetimeRange|enum|boolean|number|textarea|text
    meta: {
      min: 0,
      max: 100,
      rows: 12
    },
    required: true
  }
];
 const  tableFields=[
   {
     key: 'fid',
     name: '缩略图',
     render:(fid)=><img width={100} height={46} src={`http://116.62.164.251/cgi-bin/download.pl?fid=${fid}&proj=yyqq`} alt="" />
   },
   {
     key: 'subtype',
     name: '类型',
   },
   {
     key: 'goodsflag',
     name: '商品编号',
   },
   {
     key: 'url',
     name: '链接',
   },{
     key: 'comment',
     name: '备注',
   }
 ];
 export  {
   searchFields,
   tableFields
 }
