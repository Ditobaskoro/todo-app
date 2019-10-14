import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';

/**
 * List item component for listing todo
 *
 */

const ListItem = ({ title, note, status, onRemove, onComplete, id }) => {

  return (
    <Card
      title={
        <div className="content-container">
          <div className="content-title" style={{ textDecoration: status === 'done' ? "line-through" : "" }}>{title}</div>
        </div>
      }
      extra={
        <div>
          <a href="/" className="content-complete" onClick={e => onComplete(e, id)}>
            <Icon type={status === 'undone' ? "check-circle" : "undo"} />
          </a>
          <a href="/" className="content-delete" onClick={e => onRemove(e, id)}>
            <Icon type="close-circle" />
          </a>
        </div>
      }
      style={{ width: '100%' }}>
      <p style={{ textDecoration: status === 'done' ? "line-through" : "" }}>{note}</p>
    </Card>
  )
};

ListItem.propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  status: PropTypes.string,
  id: PropTypes.number,
  onRemove: PropTypes.func,
  onComplete: PropTypes.func,
};

export default ListItem;