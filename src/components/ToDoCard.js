import { Button, notification } from 'antd'
import React, { useState, memo } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import ToDoModal from "./ToDoModal";
import { deleteToDo, changeStatusToDo } from '../store/slice/toDoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from "./index"
import "../styles/toDoCard.scss"

const ToDoCard = () => {

    const dispatch = useDispatch();
    const { selectedCategory } = useSelector(state => state.toDo);

    const [formModalVisible, setFormModalVisible] = useState(false);
    const [selectedToDo, setSelectedToDo] = useState(false);

    const addFormModal = () => {
        setSelectedToDo(false);
        setFormModalVisible(true);
    };

    const editFormModal = (record) => {
        setSelectedToDo(record);
        setFormModalVisible(true);
    };

    const handleDelete = async (record) => {
        const id = record._id
        const action = await dispatch(deleteToDo({ id }));
        if (deleteToDo.fulfilled.match(action)) {
            notification.success({
                message: 'Success',
                description: `ToDo deleted successfully`,
            });
        } else {
            notification.error({
                message: 'Error',
                description: "Error",
            });
        }
    };

    const handleStatusChange = async (record, key) => {
        const data = {
            id: record?._id,
            status: key
        }
        const action = await dispatch(changeStatusToDo(data));
        if (changeStatusToDo.fulfilled.match(action)) {
            notification.success({
                message: 'Success',
                description: `ToDo status changed successfully`,
            });
        } else {
            notification.error({
                message: 'Error',
                description: "Error",
            });
        }
    };


    const doneList = selectedCategory?.filter(item => item.status === "done");
    const inProgressList = selectedCategory?.filter(item => item.status === "in progress");
    const toDoList = selectedCategory?.filter(item => item.status === "to do");

    return (
        <div className='toDoCard'>
            < Card
                title="To Do"
                data={toDoList}
                editFormModal={editFormModal}
                handleDelete={handleDelete}
                handleStatusChange={handleStatusChange}
            />
            < Card
                title="In Progress"
                data={inProgressList}
                editFormModal={editFormModal}
                handleDelete={handleDelete}
                handleStatusChange={handleStatusChange}
            />
            < Card
                title="Done"
                data={doneList}
                editFormModal={editFormModal}
                handleDelete={handleDelete}
                handleStatusChange={handleStatusChange}
            />
            <Button className='toDoCard-list-button' onClick={addFormModal}>
                <PlusOutlined className='toDoCard-list-button-icon' />
            </Button>
            <ToDoModal
                modalVisible={formModalVisible}
                handleModalVisible={setFormModalVisible}
                selectedToDo={selectedToDo}
            />
        </div>
    )
}

export default memo(ToDoCard)