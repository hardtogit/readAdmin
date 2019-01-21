 const  searchFields=[
  {
    key: 'content', // 字段key
    name: '状态', // 字段name
    enums: [
      { label: '全部', value: '全部' },
      { label: '待付款', value: '待付款' },
      { label: '待发货', value: '待发货'},
      { label: '待收货', value: '待收货'},
      { label: '待评价', value: '待评价'},
      { label: '已完成', value: '已完成'},
    ]
  }
];
 const  tableFields=[
   {
     key: 'goodsname',
     name:'商品名称'
   },
   {
     key:'guige',
     name:'规格'
   },
   {
     key:'name',
     name:'购买人'
   },
   {
     key:'phone',
     name:'手机号'
   },
   {
     key:'address',
     name:'地址'
   },
   {
     key: 'time',
     name: '时间',
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
