 const  searchFields=[
  {
    key: 'account', // 字段key
    name: '账号', // 字段name
    type: 'text', // 字段类型支持如下类型: date|datetime|datetimeRange|enum|boolean|number|textarea|text
  },
   {
     key: 'role', // 字段key
     name: '角色', // 字段name
     type: 'text', // 字段类型支持如下类型: date|datetime|datetimeRange|enum|boolean|number|textarea|text
   },
   {
     key: 'grade', // 字段key
     name: '会员等级', // 字段name
     enums: [
       { label: '全部', value: '' },
       { label: 'LV1', value: 'LV1' },
       { label: 'LV2', value: 'LV2'},
       { label: 'LV3', value: 'LV3'},
       { label: 'LV4', value: 'LV4'},
       { label: 'LV5', value: 'LV5'},
       { label: 'LV6', value: 'LV6'},
       { label: 'LV7', value: 'LV7'},
       { label: 'LV8', value: 'LV8'},
       { label: 'LV9', value: 'LV9'},
       { label: 'LV10', value: 'LV10'},
     ]
   },
   {
     key: 'status', // 字段key
     name: '是否有效', // 字段name
     type:'enum',
     enums: [
       { label: '全部', value: '' },
       { label: '是', value: '是' },
       { label: '否', value: '否'}
     ]
   },
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
 const fieldsMapping={
   "display_name": "昵称",
   "phone": "账号（手机号）",
   "grade": "会员等级",
   "money": "余额",
   "gold": "积分",
   "role": "角色",
   "status": '是否有效',
 };
 export  {
   searchFields,
   tableFields,
   fieldsMapping
 }
