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
     key: 'name',
     name: '名称',
   },
   {
     key: 'reduce',
     name: '立减金额',
   },
   {
     key: 'limit',
     name: '最低限额',
   },
   {
     key: 'days',
     name: '有效期',
   },{
     key: 'gold',
     name: '积分',
   },{
     key: 'status',
     name: '是否有效',
   },{
     key: 'classify',
     name: '商品类型',
   }
 ];
 export  {
   searchFields,
   tableFields
 }
