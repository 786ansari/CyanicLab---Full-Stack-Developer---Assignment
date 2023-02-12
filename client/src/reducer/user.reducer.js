const initialState = {
  USER_ADD:[],
  USER_GET:[],
  USER_UPDATE:[],
  USER_DELETE:[]
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_ADD':
        return {...state,  USER_ADD: action.payload };
        case 'USER_GET':
        return {...state,  USER_GET: action.payload };
        case 'USER_UPDATE':
        return {...state,  USER_UPDATE: action.payload };
        case 'USER_DELETE':
        return {...state,  USER_DELETE: action.payload };
      default:
        return state;
    }
  };