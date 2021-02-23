import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_FAILURE,
  DELETE_SERVICE_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
  items: [],
  loading: false,
  error: null,
  deletingFinish: false,
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        deletingFinish: false,
      };

    case FETCH_SERVICES_FAILURE:
      {
        const { error } = action.payload;
        return {
          ...state,
          loading: false,
          error,
        };
      }

    case FETCH_SERVICES_SUCCESS:
      {
        const { items } = action.payload;
        return {
          ...state,
          items,
          loading: false,
          error: null,
        };
      }

    case DELETE_SERVICE_REQUEST:
      {
        const { id } = action.payload;
        return {
          ...state,
          items: state.items.map(o => o.id === id ? { ...o, deleting: true } : o)
        };
      }

    case DELETE_SERVICE_FAILURE:
      {
        const { error } = action.payload;
        return {
          ...state,
          error,
        };
      }

    case DELETE_SERVICE_SUCCESS:
      {
        const { id } = action.payload;
        const result = {
          ...state,
          items: state.items.map(o => o.id === id ? { ...o, deleting: false, isDeleted: true } : o),
        };
        return {
          ...result,
          deletingFinish: result.items.reduce((flag, o) => flag && !o.deleting, true),
        };
      }

    default:
      return state;
  }
}
