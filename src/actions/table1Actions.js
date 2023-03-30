import axios from 'axios';
import { TABLE1_LOADING, TABLE1_GET_ALL_SUCCESS, TABLE1_ERROR, TABLE1_CLEAR_SNACKBAR, server_url } from '../constants/types';

export const table1GetAll = () => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            dispatch({
                type: TABLE1_LOADING,
                payload: {
                    loading: true
                }
            });
            axios.get(`${server_url}/table1`, {
            }).then(response => {
                dispatch({
                    type: TABLE1_GET_ALL_SUCCESS,
                    payload: {
                        table1List: response.data,
                        loading: false,
                        status: "success",
                        text: "Get All Table1 data successfully."
                    }
                });
                resolve();
            }).catch((e) => {
                dispatch({
                    type: TABLE1_ERROR,
                    payload: {
                        status: "error",
                        text: "Error occured during getting Table1 data.",
                        loading: false
                    }
                });
                resolve();
            })
        })
    }
}

export const table1Delete = (table1) => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            dispatch({
                type: TABLE1_LOADING,
                payload: {
                    loading: true
                }
            });
            axios.delete(`${server_url}/table1/${table1._id}`, {
            }).then(response => {
                axios.get(`${server_url}/table1`, {
                }).then(response => {
                    dispatch({
                        type: TABLE1_GET_ALL_SUCCESS,
                        payload: {
                            table1List: response.data,
                            loading: false,
                            status: "success",
                            text: "Delete Table1 data successfully."
                        }
                    });
                    resolve();
                }).catch((e) => {
                    dispatch({
                        type: TABLE1_ERROR,
                        payload: {
                            text: "Error occured during getting Table1 data.",
                            status: "error",
                            loading: false
                        }
                    });
                    resolve();
                })
            }).catch((e) => {
                dispatch({
                    type: TABLE1_ERROR,
                    payload: {
                        text: "Error occured during deleteing Table1 data.",
                        status: "error",
                        loading: false
                    }
                });
                resolve();
            })
        })
    }
}

export const table1AddOrUpdate = (table1, state) => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            dispatch({
                type: TABLE1_LOADING,
                payload: {
                    loading: true
                }
            });
            if (state === "add") {                
                axios.post(`${server_url}/table1`, table1).then(response => {
                    axios.get(`${server_url}/table1`)
                    .then(response => {
                        dispatch({
                            type: TABLE1_GET_ALL_SUCCESS,
                            payload: {
                                table1List: response.data,
                                loading: false,
                                status: "success",
                                text: "Add Table1 data successfully."
                            }
                        });
                        resolve();
                    }).catch((e) => {
                        dispatch({
                            type: TABLE1_ERROR,
                            payload: {
                                text: "Error occured during getting Table1 data.",
                                status: "error",
                                loading: false
                            }
                        });
                        resolve();
                    })
                }).catch((e) => {
                    dispatch({
                        type: TABLE1_ERROR,
                        payload: {
                            text: "Error occured during adding Table1 data.",
                            status: "error",
                            loading: false
                        }
                    });
                    resolve();
                })
            } else if (state === "edit") {                
                axios.put(`${server_url}/table1/${table1._id}`, table1).then(response => {
                    axios.get(`${server_url}/table1`)
                    .then(response => {
                        dispatch({
                            type: TABLE1_GET_ALL_SUCCESS,
                            payload: {
                                table1List: response.data,
                                loading: false,
                                status: "success",
                                text: "Update Table1 data successfully."
                            }
                        });
                        resolve();
                    }).catch((e) => {
                        dispatch({
                            type: TABLE1_ERROR,
                            payload: {
                                text: "Error occured during getting Table1 data.",
                                status: "error",
                                loading: false
                            }
                        });
                        resolve();
                    })
                }).catch((e) => {
                    dispatch({
                        type: TABLE1_ERROR,
                        payload: {
                            text: "Error occured during updating Table1 data.",
                            status: "error",
                            loading: false
                        }
                    });
                    resolve();
                })
            }
        })
    }
}

export const table1ClearShowSnackbar = () => {
    return (dispatch, getState) => {
        dispatch({
            type: TABLE1_CLEAR_SNACKBAR
        });
    }
}