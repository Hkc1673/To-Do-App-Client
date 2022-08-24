import React, { useState } from 'react'
import { Badge, Button } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../store/slice/toDoSlice';
import { ProgressBar } from "./index"
import "../styles/categoryCard.scss"

const CategoryCard = ({ categories }) => {

    const dispatch = useDispatch();

    const { category } = useSelector(state => state.toDo);
    const [selected, setSelected] = useState(category);

    const handleCategory = (categoryList, categoryName) => {
        const payload = {
            categoryList,
            categoryName
        }
        dispatch(selectCategory(payload));
        setSelected(categoryName);
    }

    return (
        <div className='category'>
            <div>
                {
                    Object.keys(categories).map((category, index) => {
                        return (
                            <Button
                                className={selected === category ? "category-card-selected" : "category-card"}
                                key={index} onClick={() => handleCategory(categories[category], category)}>
                                <div>
                                    <TagOutlined style={{ color: '#15A5E1' }} />
                                    <span>{category}</span>
                                </div>
                                <Badge count={categories[category].length} />
                            </Button>
                        )
                    })
                }
            </div>
            <ProgressBar />
        </div>
    )
}

export default CategoryCard;