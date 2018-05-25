import { REMOVE as REMOVE_STUDENT } from './campuses.reducer';

/* -----------------    ACTION TYPES    ------------------ */
const SET_STUDENTS = 'SET_STUDENTS';
const CREATE = 'CREATE_STUDENT';
// const UPDATE = 'UPDATE_STUDENT';
const REMOVE = 'REMOVE_STUDENT';

/* ------------    ACTION CREATORS      ------------------ */
const setStudents = students => ({ type: SET_STUDENTS, students });
const create = student => ({ type: CREATE, student });
// const update = student => ({ type: UPDATE, student });
const remove = id => ({ type: REMOVE, id });

/* ------------         Initial State         ------------------ */
const initialState = {
  list: [],
  isFetching: false,
};

/* ------------         REDUCER         ------------------ */

export default function studentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STUDENTS:
      return { list: action.students, isFetching: true };

    case CREATE:
      return { list: [...state.list, action.student], isFetching: true };

    case REMOVE:
      return {
        list: state.list.filter(student => student.id !== action.id),
        isFetching: true,
      };
    case REMOVE_STUDENT:
      return {
        list: state.list.filter(student => student.campusId !== action.id),
        isFetching: true,
      };

    default:
      return state;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchStudents = () => {
  return async (dispatch, getState, { axios }) => {
    const { data } = await axios.get('/api/students');
    const action = setStudents(data);
    try {
      dispatch(action);
    } catch (err) {
      console.error(`Fetching student unsuccessful`, err);
    }
  };
};

export const addStudent = (student, ownProps) => {
  return async (dispatch, getState, { axios }) => {
    const { data } = await axios.post('/api/students', student);
    try {
      dispatch(create(data));
      ownProps.history.push(`/students/${data.id}`);
    } catch (err) {
      console.error(`Creating student : ${data} unsuccessful`, err);
    }
  };
};

export const removeStudent = id => {
  return async (dispatch, getState, { axios }) => {
    await axios.delete(`/api/students/${id}`);
    try {
      dispatch(remove(id));
    } catch (err) {
      console.error(`Removing student: ${id} unsuccessful`, err);
    }
  };
};