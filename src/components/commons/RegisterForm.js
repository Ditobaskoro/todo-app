import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';


/**
 * Register form input
 *
 */

const RegisterForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onFormSubmit = (e, email, password) => {
    e.preventDefault();
    if (email && password && name) {
      onSubmit(name, email, password);
    } 
  }

  return (
    <Form>
      <Input className="form-input" placeholder="Name"  value={name} onChange={e => setName(e.target.value)}/>
      <Input className="form-input" placeholder="Email"  value={email} onChange={e => setEmail(e.target.value)}/>
      <Input type="password" className="form-input" placeholder="Password"  value={password} onChange={e => setPassword(e.target.value)}/>
      <Button key="submit" type="primary" onClick={e => onFormSubmit(e, email, password, name)} loading={loading}>Register</Button>
    </Form>
  )
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
};

export default RegisterForm;