import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login.css';
import { Tabs, message } from 'antd';
import api from "../../apis";
import LoginForm from '../commons/LoginForm';
import RegisterForm from '../commons/RegisterForm';
import {withRouter} from 'react-router-dom';

const { TabPane } = Tabs;

/**
 * Login component
 *
 */

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onLogin = (email, password) => {
    setLoading(true)
    api.todo.login(email, password)
    .then(res => res && res.json())
    .then(data => {
      if(data.statusCode === 200){
        localStorage.setItem('auth', data.data.token);
        history.push('/todo');
      } else {
        message.error('Login Failed')
      }
      setLoading(false);
     
    })
    .catch(() =>{
      setLoading(false)
      message.error('Login Failed')
    })
  }

  const onRegister = (name, email, password) => {
    setLoading(true)
    api.todo.register(name, email, password)
    .then(res => res && res.json())
    .then(data => {
      if(data.statusCode === 200){
        localStorage.setItem('auth', data.data.token);
        history.push('/todo');
      } else {
        message.error('Login Failed')
      }
      setLoading(false);
     
    })
    .catch(() =>{
      setLoading(false)
      message.error('Login Failed')
    })
  }

  return (
    <div className="login">
      <div className="login-title">TODO APP</div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Login" key="1">
          <LoginForm onSubmit={onLogin} loading={loading}/>
        </TabPane>
        <TabPane tab="Register" key="2">
          <RegisterForm onSubmit={onRegister} loading={loading}/>
        </TabPane>
      </Tabs>
    </div>
  )
};

Login.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Login);