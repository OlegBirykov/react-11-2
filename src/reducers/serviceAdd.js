import {
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
  CHANGE_SERVICE_FIELD,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FINISH,
} from '../actions/actionTypes'

const initialState = {
  item: { id: '', name: '', price: '', content: '' },
  loading: false,
  loadingError: null,
  adding: false,
  addingError: null,
  finish: false,
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingError: null,
        adding: false,
        addingError: null,        
      };

    case EDIT_SERVICE_FAILURE:
      const { loadingError } = action.payload;
      return {
        ...state,
        loading: false,
        loadingError,
      };

    case EDIT_SERVICE_SUCCESS:
      const { item } = action.payload;
      return {
        ...state,
        item,
        loading: false,
        loadingError: null,
      };

    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      return {
        ...state,
        item: {
          ...state.item,
          [name]: value,
        }
      };
      
    case ADD_SERVICE_REQUEST:
      return {
        ...state,
        adding: true,
        error: null,
      };

    case ADD_SERVICE_FAILURE:
      const { addingError } = action.payload;
      return {
        ...state,
        adding: false,
        addingError,
      };

    case ADD_SERVICE_SUCCESS:
      return {
        ...state,
        adding: false,
        addingError: null,
        finish: true,
      };

    case ADD_SERVICE_FINISH:
      return { ...initialState };
      
    default:
      return state;
  }
}
