import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

/**
 * Register form input
 *
 */

const RegisterForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onFormSubmit = (e, email, password) => {
    e.preventDefault();

    if (email && password && name) {
      if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        setError('Wrong Email Format');
      } else {
        setError('');
        onSubmit(name, email, password);
      }
    } else {
      setError('Please fill all fields');
    }
  }

  return (
    <Form onSubmit={e => onFormSubmit(e, email, password, name)}>
      <Input size="large" className="form-input" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
      <Input size="large" className="form-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
      <Input size="large" type="password" className="form-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      <p className="form-error">{error}</p>
      <Button size="large" key="submit" htmlType="submit" type="primary" loading={loading}>
        Register
      </Button>
    </Form>
  )
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
};

export default RegisterForm;