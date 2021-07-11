import API from "../utils/api";

export const ACTION_TYPES = {
    MAP_CREATE: 'MAP_CREATE',
    MAP_UPDATE: 'MAP_UPDATE',
    MAP_DELETE: 'MAP_DELETE',
    MAP_FETCH: 'MAP_FETCH',
    MAP_FETCH_ALL: 'MAP_FETCH_ALL',
    MAP_PAGINATION: 'MAP_PAGINATION',
    MAP_LOADING:"MAP_LOADING",
    ERROR_MSG:"ERROR_MSG"
}

const formatingInput = (input) => {
    return input
}

export const fetchAll = () => dispatch => {
     dispatch({
                type: ACTION_TYPES.MAP_LOADING,
                payload: true
            })
    API.map().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.MAP_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => {
                dispatch({
                type: ACTION_TYPES.ERROR_MSG,
                payload: "Sorry something went wrong while fetching the transporter data try again later"
            })
            console.log(err)
        })
}

export const Pagination = (page = 1, limit = 10, name = "", category = "all") => dispatch => {
     dispatch({
                type: ACTION_TYPES.MAP_LOADING,
                payload: true
            })
    API.map().fetchPagination(page, Math.abs(limit), name, category)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MAP_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => {
                dispatch({
                type: ACTION_TYPES.ERROR_MSG,
                payload: "Sorry something went wrong while fetching the transporter data try again later"
            })
            console.log(err)
        })
}

export const fetchById = (id, onSuccess) => dispatch => {
     dispatch({
                type: ACTION_TYPES.MAP_LOADING,
                payload: true
            })
    API.map().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MAP_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => {
                dispatch({
                type: ACTION_TYPES.ERROR_MSG,
                payload: "Sorry something went wrong while fetching the transporter data try again later"
            })
            console.log(err)
        })
}

export const create = (input, onSuccess) => dispatch => {
     dispatch({
                type: ACTION_TYPES.MAP_LOADING,
                payload: true
            })
    const formattedData = formatingInput(input)
    API.map().create(formattedData)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MAP_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => {
                dispatch({
                type: ACTION_TYPES.MAP_LOADING,
                payload: false
            })
            console.log(err)
        })
}

export const update = (id, input, onSuccess) => dispatch => {
     dispatch({
                type: ACTION_TYPES.MAP_LOADING,
                payload: true
            })
    const formattedData = formatingInput(input)
    API.map().update(id, formattedData)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MAP_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => {
                dispatch({
                type: ACTION_TYPES.MAP_LOADING,
                payload: false
            })
            console.log(err)
        })
}

export const Delete = (id, onSuccess) => dispatch => {
     dispatch({
                type: ACTION_TYPES.MAP_LOADING,
                payload: true
            })
    API.map().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MAP_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => {
                dispatch({
                type: ACTION_TYPES.MAP_LOADING,
                payload: false
            })
            console.log(err)
        })
}