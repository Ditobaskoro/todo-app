import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, Button, InputNumber } from 'antd';

const { TextArea } = Input;

/**
 * Modal form for adding Todo
 *
 */

const AddForm = ({ visible, content, onSubmit, onCancel }) => {
  const [title, setTitle] = useState((content && content.title) || '');
  const [note, setNote] = useState((content && content.note) || '');
  const [priority, setPriority] = useState((content && content.priority) || 1);

  const formItemLayout = {
    labelCol: { span: 19 },
    wrapperCol: { span: 4 },
  };

  const onFormSubmit = (e, title, priority, note) => {
    e.preventDefault();
    if (title && priority && note) {
      const isEdit = content ? true : false;
      const id = content ? content.id : null;
      onSubmit(isEdit, id, title, priority, note);
    } 
  }

  return (
    <Modal
      visible={visible}
      title={`${content ? 'Edit' : 'Add'} Todo`}
      onOk={e => onSubmit(e, title, note)}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={e => onFormSubmit(e, title, priority, note)}>Submit</Button>,
      ]}>
      <Input className="form-input" placeholder="Title" value={title}  onChange={e => setTitle(e.target.value)}/>
      <TextArea className="form-input" placeholder="Note" value={note} onChange={e => setNote(e.target.value)}/>
      <Form.Item {...formItemLayout} label="Priority">
        <InputNumber placeholder="Prio" min={1} max={3} value={priority} onChange={value => setPriority(value)} />
      </Form.Item>
    </Modal>
  )
};

AddForm.propTypes = {
  visible: PropTypes.bool,
  content: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default AddForm;