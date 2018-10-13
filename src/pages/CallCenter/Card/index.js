import React from 'react';
import classNames from 'classnames'
import logo from '../../../assets/logo.svg'
import './index.less'

class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    const  userObj=JSON.parse(sessionStorage.getItem('userObj'));
    return(
      <div className="card">
        <header>
          <img
            className="avatar"
            width="40"
            height="40"
            alt=" "
            src={`http://116.62.164.251/cgi-bin/download.pl?fid=${userObj.headFid}&proj=yyqq`}
          />
          <p className="name">{userObj.display_name}</p>
        </header>
        {/*<footer>*/}
          {/*<input className="search" type="text" placeholder="搜索用户..." />*/}
        {/*</footer>*/}
      </div>
    )
  }

}
export default Index
