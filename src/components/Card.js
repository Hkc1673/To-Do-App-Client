import React from 'react'
import { Button, Popconfirm, Dropdown, Menu, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, MenuOutlined } from '@ant-design/icons';
import "../styles/toDoCard.scss"

const Card = ({ title, data, editFormModal, handleDelete, handleStatusChange }) => {

    const statusList = [
        {
            key: "done",
            value: "done",
            icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
        },
        {
            key: "in progress",
            value: "in progress",
            icon: <SyncOutlined spin style={{ color: '#1890ff' }} />
        },
        {
            key: "to do",
            value: "to do",
            icon: <ClockCircleOutlined style={{ color: '#faad14' }} />
        }
    ]

    const menu = (item) => (
        <Menu>
            {
                statusList.filter(status => status.key !== item.status).map((status, index) => {
                    return (
                        <Menu.Item key={index}>
                            <Button
                                type="text"
                                icon={status.icon}
                                style={{ color: "#000" }}
                                onClick={() => handleStatusChange(item, status.key)}
                            >
                                {status.value}
                            </Button>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    )
    return (
        <div className='toDoCard-list'>
            <div className='toDoCard-list-item'>
                <span>{title}</span>
                <span className='toDoCard-list-item-count'>{data?.length}</span>
            </div>
            {
                data?.map((item, index) => {
                    return (
                        <div className='toDoCard-list-box' key={index}>
                            <p>{item?.title}</p>
                            <div className='toDoCard-list-box-footer'>
                                {
                                    item?.status === 'to do' &&
                                    <Tag icon={<ClockCircleOutlined />} color="default">
                                        to do
                                    </Tag>
                                }
                                {
                                    item?.status === 'in progress' &&
                                    <Tag icon={<SyncOutlined spin />} color="processing">
                                        progress
                                    </Tag>
                                }
                                {
                                    item?.status === 'done' &&
                                    <Tag icon={<CheckCircleOutlined />} color="success">
                                        done
                                    </Tag>
                                }

                                <div className='toDoCard-list-action' >
                                    <Dropdown type="primary" overlay={menu(item)}>
                                        <Button type='link'>
                                            <MenuOutlined />
                                        </Button>
                                    </Dropdown>
                                    <Button type='link' onClick={() => editFormModal(item)}>
                                        <EditOutlined className='toDoCard-list-edit-icon' />
                                    </Button>
                                    <Popconfirm
                                        title="Are you sure to delete this todo?"
                                        onConfirm={() => handleDelete(item)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type='link'>
                                            <DeleteOutlined className='toDoCard-list-delete-icon' />
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Card