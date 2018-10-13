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
     key: 'display_name',
     name: '昵称',
   },
   {
     key: 'phone',
     name: '账号（手机号）',
   },
   {
     key: 'grade',
     name: '会员等级',
   },
   {
     key: 'money',
     name: '余额',
   },{
     key:'gold',
     name:'积分'
   },
   {
     key:'role',
     name:'角色'
   },
   {
     key:'status',
     name:'是否有效'
   }
 ];
 export  {
   searchFields,
   tableFields
 }
