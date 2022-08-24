import React from 'react'
import { Progress } from 'antd';
import { useSelector } from 'react-redux';
import "../styles/progress.scss"

const ProgressBar = () => {
    const { selectedCategory } = useSelector(state => state.toDo)

    const completed = Math.round(selectedCategory?.filter(todo => todo.status === "done").length / selectedCategory.length * 100)
    const inProgress = Math.round(selectedCategory?.filter(todo => todo.status === "in progress").length / selectedCategory.length * 100)
    const toDo = Math.round(selectedCategory?.filter(todo => todo.status === "to do").length / selectedCategory.length * 100)

    return (
        <div className='progress-bar'>
            <Progress type="circle" percent={toDo} width={50} status="exception" />
            <Progress type="circle" percent={inProgress} width={50} status="active" />
            <Progress type="circle" percent={completed} width={50} status="success" />
        </div>
    )
}

export default ProgressBar;