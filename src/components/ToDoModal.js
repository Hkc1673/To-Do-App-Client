import React, { useCallback, useState, useEffect, memo } from 'react'
import { Modal, Form, Input, Button, notification} from 'antd'
import { createToDo, updateToDo } from '../store/slice/toDoSlice'
import { useDispatch } from 'react-redux'
import "../styles/toDoModal.scss"

const ToDoModal = ({ modalVisible, handleModalVisible, selectedToDo }) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (modalVisible) {
            form.setFieldsValue(selectedToDo);
            if (selectedToDo) {
                setIsEdit(true);
            }
        }
    }, [modalVisible]);

    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
        setIsEdit(false);
    }, [handleModalVisible, form]);

    const onFinish = useCallback(
        async (values) => {
            if (values && values.category !== "All") {
                const body = {
                    title: values?.title,
                    category: values?.category,
                };
                const action = await dispatch(createToDo(body));
                if (createToDo.fulfilled.match(action)) {
                    notification.success({
                        message: 'Success',
                        description: `ToDo created successfully`,
                    });
                    handleClose();
                } else {
                    notification.error({
                        message: 'Error',
                        description: "Error",
                    });
                }
            } else {
                notification.error({
                    message: 'Error',
                    description: `Please enter the required fields and don't use All category`,
                });
            }
        },
        [dispatch, handleClose],
    );

    const onFinishEdit = useCallback(async (values) => {
        const data = {
            id: selectedToDo?._id,
            title: values?.title,
            category: values?.category,
        }
        const action = await dispatch(updateToDo(data))
        if (updateToDo.fulfilled.match(action)) {
            notification.success({
                message: 'Success',
                description: `ToDo updated successfully`,
            });
            handleClose();
        } else {
            notification.error({
                message: 'Error',
                description: "Error",
            });
        }
        setIsEdit(false);
    }, [handleClose, dispatch, selectedToDo])

    return (
        <Modal
            className='todo-modal'
            maskClosable={false}
            footer={false}
            title={isEdit ? 'Edit To Do' : 'Add New To Do'}
            visible={modalVisible}
            onCancel={handleClose}
        >
            <div className='todo-container'>
                <Form
                className='todo-form'
                    name='ToDoForm'
                    form={form}
                    initialValues={{}}
                    onFinish={isEdit ? onFinishEdit : onFinish}
                    autoComplete='off'
                    layout={'horizontal'}
                >
                    <Form.Item
                        label="ToDo"
                        name='title'
                    >
                        <Input
                            placeholder="Add new to do"
                            height={36}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name='category'
                    >
                        <Input
                            placeholder="Add new category"
                            height={36}
                        />
                    </Form.Item>
                    <Form.Item className='footer-form-item'>
                        <Button className='submit-btn' type='primary' htmlType='submit'>
                            {isEdit ? 'Edit' : 'Add'}
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}

export default memo(ToDoModal);