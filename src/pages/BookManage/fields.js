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
     key: 'imgUrl',
     name:'缩略图'
   },
   {
     key: 'name',
     name: '商品名',
   },
   {
     key: 'name',
     name: '价格',
   },
   {
     key: 'name',
     name: '库存',
   },
   {
     key: 'name',
     name: '分类',
   },{
     key: 'name',
     name: '状态',
   }
 ];
 export  {
   searchFields,
   tableFields
 }
