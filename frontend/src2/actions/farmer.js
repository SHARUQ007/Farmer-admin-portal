import API from "../utils/api";

export const ACTION_TYPES = {
    FARMER_CREATE: 'FARMER_CREATE',
    FARMER_UPDATE: 'FARMER_UPDATE',
    FARMER_DELETE: 'FARMER_DELETE',
    FARMER_FETCH: 'FARMER_FETCH',
    FARMER_FETCH_ALL: 'FARMER_FETCH_ALL',
    FARMER_PAGINATION: 'FARMER_PAGINATION'
}

const formatingInput = (input) => {


    return input
}

export const fetchAll = () => dispatch => {
    API.farmer().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FARMER_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 10, name = "", category = "all") => dispatch => {
    API.farmer().fetchPagination(page, Math.abs(limit), name, category)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.farmer().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    const formattedData = formatingInput(input)
    API.farmer().create(formattedData)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, input, onSuccess) => dispatch => {
    const formattedData = formatingInput(input)
    API.farmer().update(id, formattedData)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    API.farmer().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}