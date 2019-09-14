import * as types from '../actions/action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    counters: [],
    isStartPage: true,
    lettersData: []
});

export default function MatrixReducer(state = initialState, action) {
  switch(action.type) {

    return state.merge({
        topicsByUrl: action.topicsByUrl
      });

    case types.GET_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users });

    case types.DELETE_USER_SUCCESS:

      // Use lodash to create a new user array without the user we want to remove
      const newUsers = _.filter(state.users, user => user.id != action.userId);
      return Object.assign({}, state, { users: newUsers });

    case types.USER_PROFILE_SUCCESS:
      return Object.assign({}, state, { userProfile: action.userProfile });

    default: return state
  }
}



// const person = {
//   id:'',
//   displayName: '',
//   firstname: '',
//   lastname: '',
//   patronymic: '',
//   isnopatronymic: '',
//   dtBirthday: '',
//   gender: {
//     male: false,
//     female: false,
//   },
//   email: '',
//   phone: '',
//   country: {
//     id: '',
//     displayName: '',
//   },
//   city: {
//     id: '',
//     displayName: '',
//   },
//   personStatus: '',
//   status: '',
// }

const initialState = {
    list: [],
  };
  
  export default (state = initialState, action = {}) => {
    switch(action.type) {
      case 'EMPLOYEE_FETCH_DATA_DONE':
  
        return {
          ...state,
          list: action.payload.data
        }
  
      case 'EMPLOYEE_CHANGE_STATUS':
  
        const { id, employeeStatus } = action.payload;
  
        console.log('id :', id, employeeStatus )
  
        return {
          ...state,
          list: state.list.map(el => el.id === +id ? {...el, employeeStatus} : el)
        }
      // break;
  
      default: return state
    }
  }
  