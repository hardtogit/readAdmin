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
     key: 'destination',
     name: '目的地',
   },
   {
     key: 'firstwei',
     name: '首重（元/kg）',
   },
   {
     key: 'secondwei',
     name: '续重（元/kg）',
   }
 ];
 export  {
   searchFields,
   tableFields
 }
