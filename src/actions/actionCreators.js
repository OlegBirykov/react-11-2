import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_FAILURE,
  DELETE_SERVICE_SUCCESS,
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
  CHANGE_SERVICE_FIELD,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FINISH,
} from './actionTypes';

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const deleteServiceRequest = id => ({
  type: DELETE_SERVICE_REQUEST,
  payload: {
    id,
  },
});

export const deleteServiceFailure = error => ({
  type: DELETE_SERVICE_FAILURE,
  payload: {
    error,
  },  
});

export const deleteServiceSuccess = id => ({
  type: DELETE_SERVICE_SUCCESS,
  payload: {
    id,
  },
});

export const editServiceRequest = () => ({
  type: EDIT_SERVICE_REQUEST,
});

export const editServiceFailure = loadingError => ({
  type: EDIT_SERVICE_FAILURE,
  payload: {
    loadingError,
  },  
});

export const editServiceSuccess = item => ({
  type: EDIT_SERVICE_SUCCESS,
  payload: {
    item,
  },
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const addServiceRequest = (name, price, content) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
    content,
  },
})

export const addServiceFailure = addingError => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    addingError,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const addServiceFinish = () => ({
  type: ADD_SERVICE_FINISH,
});

export const fetchServices = () => async dispatch => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
}

export const deleteService = id => async dispatch => {
  dispatch(deleteServiceRequest(id));
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(deleteServiceSuccess(id));
  } catch (e) {
    dispatch(deleteServiceFailure(e.message));
  }
}

export const editService = id => async dispatch => {
  dispatch(editServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(editServiceSuccess(data));
  } catch (e) {
    dispatch(editServiceFailure(e.message));
  }
}

export const addService = item => async dispatch => {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
  fetchServices(dispatch);
}

