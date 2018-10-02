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
     key: 'value',
     name: '面额',
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
