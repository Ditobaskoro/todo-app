import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';

/**
 * List item component for listing todo
 *
 */

const ListItem = ({ title, note, priority, status, onRemove, onComplete, onEdit, id }) => {

  const content = {
    id: id,
    title: title,
    note: note,
    priority: priority
  }

  return (
    <Card
      title={
        <div className="content-container">
          <div className="content-title" style={{ textDecoration: status ? 'line-through' : '' }}>
            {title}
          </div>
        </div>
      }
      extra={
        <div>
          <a href="/" className="content-edit" onClick={e => onEdit(e, id, content)}>
            <Icon type="setting" />
          </a>
          <a href="/" className="content-complete" onClick={e => onComplete(e, id, status)}>
            <Icon type={!status ? 'check-circle' : 'undo'} />
          </a>
          <a href="/" className="content-delete" onClick={e => onRemove(e, id)}>
            <Icon type="close-circle" />
          </a>
        </div>
      }
      style={{ width: '100%' }}>
      <p style={{ textDecoration: status ? 'line-through' : '' }}>{note}</p>
    </Card>
  )
};

ListItem.propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  status: PropTypes.bool,
  id: PropTypes.number,
  onRemove: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func
};

export default ListItem;