export default ({code,children})=>{
  const right=JSON.parse(sessionStorage.getItem('right'));
  if(right.indexOf(code)!==-1){
    return (<span>{children}</span>)
  }
  return (<span />)






}
