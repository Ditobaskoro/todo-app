import React, { useState, useEffect } from 'react';
import './todo.css';
import { Spin, message } from 'antd';
import Header from '../Header';
import api from "../../apis";
import ListItem from '../commons/ListItem';
import AddForm from '../commons/AddForm';

/**
 * Todo Component
 * 
 */

const Todo = () => {
  const [todoList, setTodo] = useState([]) // todo list
  const [isAdding, addTodo] = useState(false); // toggle add new todo
  const [isLoading, setIsLoading] = useState(true); // loading
  const [tempContent, setTempContent] = useState(null); // temp content for editing todo

  useEffect(() => {
    // fetch todo from api
    const fetchData = async () => {
      try {
        setIsLoading(true);
        api.todo.list()
        .then(res => res && res.json())
        .then(data => {
          if(data.statusCode === 200){
            setTodo(data.data);
          } else {
            message.error('Failed getting list')
          }
          setIsLoading(false);        
        })
      } catch(err) {
        console.log(err)
        setIsLoading(false);
        message.error('Cannot connect to API');
      }
    };
    fetchData();
  }, []);

  const onRemoveTodo = (e, id) => {
    // remove todo
    e.preventDefault();
    setIsLoading(true);

    api.todo.remove(id)
    .then(res => res && res.json())
    .then(data => {
      if(todoList.length > 1){
        const newList = [...todoList];
        setTodo(newList.filter(item => item.id !== id));
        message.success(`Todo removed`);
      } else {
        setTodo([]);
        message.success(`Todo removed`);
      }
      setIsLoading(false);
    });
  };

  const onEditToggle = (e, id, content) => {
    // edit todo
    e.preventDefault();

    setTempContent(content);
    addTodo(!isAdding);
  };

  const onCompleteTodo = (e, id, isDone) => {
    // complete todo
    e.preventDefault();
    setIsLoading(true);

    api.todo.complete(id, !isDone)
    .then(res => res && res.json())
    .then(data => {
      const newList = [...todoList];
      const index = newList.findIndex(item => item.id === id);
      newList[index] = data.data;
      setTodo(newList);
      setIsLoading(false);
      message.success(`Todo changed to ${newList[index].isDone ? 'complete' : 'incomplete'}`);
    });
  };

  const onAddTodo = (title, priority, note) => {
    // add new todo
    api.todo.add(title, priority, note)
      .then(res => res && res.json())
      .then(data => {
        addTodo(false);
        setTodo([...todoList, data.data]);
        message.success('Todo added');
      })
  };

  const onUpdateTodo = (id, title, priority, note) => {
    // update todo
    api.todo.edit(id, title, priority, note)
      .then(res => res && res.json())
      .then(data => {
        addTodo(false);
        const newList = [...todoList];
        const index = newList.findIndex(item => item.id === id);
        newList[index] = data.data;
        setTodo(newList);
        message.success('Todo updated');
      })
  };

  const onSubmitTodo = (isEdit, id, title, priority, note) => {
    // submit todo
    if (!isEdit) {
      onAddTodo(title, priority, note);
    } else {
      onUpdateTodo(id, title, priority, note);
    }
  }

  const onCloseModal = () => {
    // close modal
    setTempContent(null);
    addTodo(false);
  }

  return (
    <div className="todo">
      <Header />
      <div className="home-content">
        {isLoading ? (
          <Spin /> // loading spinner
         ) : todoList.length === 0 ? (
          <div className="content-empty">
            Empty... <br /> Add some todo list
          </div> // if todo empty
        ) : (
          <div className="content-items">
            {todoList.length > 0 
              && todoList.map(item => (
                <ListItem  
                  key={item.id}
                  title={item.title}
                  note={item.note}
                  priority={item.priority}
                  status={item.isDone}
                  onRemove={onRemoveTodo}
                  onComplete={onCompleteTodo}
                  onEdit={onEditToggle}
                  id={item.id} 
                />
              )
            )}
          </div> // list todo
        )}
      </div>
      <div className="todo-action">
        {!isAdding ? (
          <div onClick={() => addTodo(!isAdding)} className="action-button">Add More Todo</div> // adding new Todo
        ) : (
          // add new todo modal
          <AddForm
            visible={isAdding}
            content={tempContent}
            onSubmit={onSubmitTodo}
            onCancel={onCloseModal}
          />
        )}
      </div>
    </div>
  )
};

export default Todo;
