import { api } from './api';

const getAllToDos = () => {
    return api ({
        url:"/",
        method:"GET",
    })
};

const createToDo = (data) => {
    return api ({
        url:"/",
        method:"POST",
        data
    })
}

const updateToDo = ({id, title, category}) => {
    return api ({
        url:`/${id}`,
        method:"PUT",
        data:{
            title,
            category
        }
    })
}

const deleteToDo = ({id}) => {
    return api ({
        url:`/${id}`,
        method:"DELETE",
    })
}

const changeStatusToDo = ({id, status}) => {
    return api ({
        url:`/update/${id}`,
        method:"PUT",
        data:{
            status
        }
    })
}

const toDoServices = {
    getAllToDos,
    createToDo,
    updateToDo,
    deleteToDo,
    changeStatusToDo
}

export default toDoServices;