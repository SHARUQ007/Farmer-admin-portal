import API from "../utils/api";

export const ACTION_TYPES = {
    FARMER_CREATE: 'FARMER_CREATE',
    FARMER_UPDATE: 'FARMER_UPDATE',
    FARMER_DELETE: 'FARMER_DELETE',
    FARMER_FETCH: 'FARMER_FETCH',
    FARMER_FETCH_ALL: 'FARMER_FETCH_ALL',
    FARMER_PAGINATION: 'FARMER_PAGINATION',
    FARMER_LOADING:"FARMER_LOADING"
}

const formatingInput = (input) => {
    return input
}

export const fetchAll = () => dispatch => {
    dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: true
            })
    API.farmer().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FARMER_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => {
                dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: false
            })
            console.log(err)
        })
}

export const Pagination = (page = 1, limit = 10, name = "", category = "all") => dispatch => {
    dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: true
            })
    API.farmer().fetchPagination(page, Math.abs(limit), name, category)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_PAGINATION,
                payload: res.data
            })
        })
       .catch(err => {
                dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: false
            })
            console.log(err)
        })
}

export const fetchById = (id, onSuccess) => dispatch => {
    dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: true
            })
    API.farmer().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
       .catch(err => {
                dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: false
            })
            console.log(err)
        })
}

export const create = (input, onSuccess) => dispatch => {
    dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: true
            })
    const formattedData = formatingInput(input)
    API.farmer().create(formattedData)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_CREATE,
                payload: res.data
            })
            onSuccess()
        })
       .catch(err => {
                dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: false
            })
            console.log(err)
        })
}

export const update = (id, input, onSuccess) => dispatch => {
    dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: true
            })
    const formattedData = formatingInput(input)
    API.farmer().update(id, formattedData)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
       .catch(err => {
                dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: false
            })
            console.log(err)
        })
}

export const Delete = (id, onSuccess) => dispatch => {
    dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: true
            })
    API.farmer().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FARMER_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
       .catch(err => {
                dispatch({
                type: ACTION_TYPES.FARMER_LOADING,
                payload: false
            })
            console.log(err)
        })
}