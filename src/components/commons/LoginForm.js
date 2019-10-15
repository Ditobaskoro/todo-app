import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';


/**
 * Login form input
 *
 */

const LoginForm = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onFormSubmit = (e, email, password) => {
    e.preventDefault();
    if (email && password) {
      onSubmit(email, password);
    } 
  }

  return (
    <Form>
      <Input className="form-input" placeholder="Email"  value={email} onChange={e => setEmail(e.target.value)}/>
      <Input type="password" className="form-input" placeholder="Password"  value={password} onChange={e => setPassword(e.target.value)}/>
      <Button key="submit" type="primary" onClick={e => onFormSubmit(e, email, password)} loading={loading}>Login</Button>
    </Form>
  )
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
};

export default LoginForm;