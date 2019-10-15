import React from 'react';
import {withRouter} from 'react-router-dom';
import './header.css';
import { Icon } from 'antd';

/**
 * Header Component
 * 
 */

const Header = ({ history }) => {
  
  const onLogout = () => {
    // Log out
    localStorage.removeItem("auth");
    history.push('/login');
  }

  return (
    <div className="header">
      <div className="header-title">
        TODO LIST
      </div>
      <div className="header-button" onClick={onLogout}>
        <Icon type="logout" />
      </div>
    </div>
  )
};

export default withRouter(Header);;
