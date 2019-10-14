import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button } from 'antd';

const { TextArea } = Input;

/**
 * Modal form for adding Todo
 *
 */

const AddForm = ({ visible, onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  return (
    <Modal
      visible={visible}
      title="Add Todo"
      onOk={e => onSubmit(e, title, note)}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={e => onSubmit(e, title, note)}>Submit</Button>,
      ]}
    >
      <Input className="form-input" placeholder="Title"  value={title} onChange={e => setTitle(e.target.value)}/>
      <TextArea placeholder="Note" value={note} onChange={e => setNote(e.target.value)}/>
    </Modal>
  )
};

AddForm.propTypes = {
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AddForm;