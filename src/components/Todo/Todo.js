import React, { useState, useEffect } from 'react';
import './todo.css';
import { Spin, message } from 'antd';
import Header from '../Header';
import ListItem from '../commons/ListItem';
import AddForm from '../commons/AddForm';

/**
 * Todo Component
 * 
 */

const list = [
  {
    id:1,
    title: 'test',
    note: 'note',
    status: 'undone'
  },
  {
    id:2,
    title: 'test',
    note: 'note',
    status: 'undone'
  },
  {
    id:3,
    title: 'test',
    note: 'note',
    status: 'done'
  },
  {
    id:4,
    title: 'test',
    note: 'note',
    status: 'done'
  },
  {
    id:5,
    title: 'test',
    note: 'note',
    status: 'done'
  },
]

const Todo = () => {
  const [todoList, setTodo] = useState(list)
  const [isAdding, addTodo] = useState(false); // toggle add new todo
  const [isLoading, setIsLoading] = useState(false); // loading

  const onRemoveTodo = (e, index) => {
    // remove todo
    e.preventDefault();
    const newList = [...todoList];
    setTodo(newList.filter((item, i) => i !== index));
    message.success('Todo removed');
  };

  const onCompleteTodo = (e, index) => {
    // remove todo
    e.preventDefault();
    const newList = [...todoList];
    newList[index].status = newList[index].status === 'done' ? 'undone' : 'done';
    setTodo(newList);
  };
  
  const onAddTodo = (e, title, note) => {
    // add todo
    e.preventDefault();
    setIsLoading(true);
    const newObj = {
      id: Date.now(),
      title: title,
      note: note,
      status: 'undone',
    }
    const newList = [...todoList, newObj];
    setTodo(newList);
    addTodo(false);
    setIsLoading(false);
    message.success('Todo added');
  }

  return (
    <div className="todo">
      <Header />
      <div className="home-content">
        {todoList.length === 0 ? (
          <div className="content-empty">
            Empty... <br /> Add some todo list
          </div> // if todo empty
        ) : !isLoading ? (
          <div className="content-items">
            {todoList.length > 0 && todoList.map((item,index) => <ListItem title={item.title} note={item.note} status={item.status} onRemove={onRemoveTodo} onComplete={onCompleteTodo} key={item.id} id={index} />)}
          </div> // list todo
        ) : (
          <Spin /> // loading spinner
        )}
      </div>
      <div className="todo-action">
        {!isAdding ? (
          <div onClick={() => addTodo(!isAdding)} className="action-button">Add More Todo</div> // adding new Todo
        ) : (
          <AddForm visible={isAdding} onSubmit={onAddTodo} onCancel={() => addTodo(false)} /> // add new todo form modal
        )}
      </div>
    </div>
  )
};

export default Todo;
