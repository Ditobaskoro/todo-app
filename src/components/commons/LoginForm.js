import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

/**
 * Login form
 *
 */

const LoginForm = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onFormSubmit = (e, email, password) => {
    e.preventDefault();
    // form validation
    if (email && password) {
      if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        setError('Wrong Email Format');
      } else {
        setError('');
        onSubmit(email, password);
      }
    } else {
      setError('Please fill all fields');
    }
  }

  return (
    <Form onSubmit={e => onFormSubmit(e, email, password)}>
      <Input size="large" className="form-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
      <Input size="large" type="password" className="form-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      <p className="form-error">{error}</p>
      <Button size="large" key="submit" htmlType="submit" type="primary" loading={loading}>
        Login
      </Button>
    </Form>
  )
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
};

export default LoginForm;