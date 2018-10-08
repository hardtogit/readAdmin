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
     name: '卡名',
   },
   {
     key: 'code',
     name: '卡号',
   },
   {
     key: 'passwd',
     name: '密码',
   },
   {
     key: 'start_time',
     name: '开始时间',
     // type:'datetime'
   },
   {
     key: 'value',
     name: '面额',
   },
   {
     key: 'end_time',
     name: '结束时间',
   },
   {
     key:'convertname',
     name:'兑换人',
     render:(v)=>v||'-'
   },
   {
     key: 'converttime',
     name: '兑换时间',
     render:(v)=>v||'-'
   },

   {
     key: 'status',
     name: '状态',
   }
 ];
 export  {
   searchFields,
   tableFields
 }
