import React, { useEffect } from 'react';
import { ToDoCard, CategoryCard } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getToDoList } from "./store/slice/toDoSlice"
import { message } from 'antd';
import "./styles/app.scss"

const App = () => {

  const dispatch = useDispatch();
  const { isLoading, toDos } = useSelector(state => state.toDo);

  useEffect(() => {
    dispatch(getToDoList())
  }, [])

  const seperateTodosByCategory = (todos) => {
    const categories = {};
    categories["All"] = todos;
    todos?.forEach(todo => {
      if (categories[todo.category]) {
        categories[todo.category].push(todo);
      } else {
        categories[todo.category] = [todo];
      }
    });
    return categories;
  }
  const categories = seperateTodosByCategory(toDos);

  if (isLoading) {
    message.loading('Action in progress..')
  }

  return (
    <div className='app'>
      <CategoryCard categories={categories} />
      <ToDoCard />
    </div>

  );
}

export default App;