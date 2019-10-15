import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import './header.css';
import { Icon, Select, Input } from 'antd';

const InputGroup = Input.Group;
const { Option } = Select;

/**
 * Header Component
 *
 */

const Header = ({ history, query, filter, setQuery, setFilter }) => {

  const onLogout = () => {
    // Log out
    localStorage.removeItem('auth');
    history.push('/login');
  }

  // filter enum list
  const filterList = ['all', 'done', 'undone'];

  return (
    <div className="header">
      <div className="header-title">TODO LIST</div>
      <div className="header-filter">
        <InputGroup>
          <Input style={{ width: '70%' }} value={query} placeholder="Search" onChange={e => setQuery(e.target.value)}/>
          <Select style={{ width: '30%' }} value={filter} placeholder="Filter" onChange={setFilter}>
            {filterList.map(item => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </InputGroup>
      </div>
      <div className="header-button" onClick={onLogout}>
        <Icon type="logout" />
      </div>
    </div>
  )
};

Header.propTypes = {
  history: PropTypes.object,
  query: PropTypes.string,
  filter: PropTypes.string,
  setQuery: PropTypes.func,
  setFilter: PropTypes.func
};

export default withRouter(Header);
