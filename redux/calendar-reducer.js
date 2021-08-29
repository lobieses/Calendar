const CHANGE_MONTH = 'ON_CHANGE_MONTH';
const SET_FOCUS_DATE = 'SET_FOCUS_DATE';
const DISABLE_FOCUS_WINDOW = 'DISABLE_FOCUS_WINDOW';

let initialState = {
    date: new Date(),
    modalWindowIsEnable: false,
    focusDate: null,
    focusDateInfo: {
        month: '',
        day: ''
    }
};

const calendarReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_MONTH: {
            const nextOrPrev = action.isNext ? 1 : -1;
            return {
                ...state,
                date: new Date(state.date.getFullYear(), state.date.getMonth() + nextOrPrev)
            }
        }
        case SET_FOCUS_DATE: {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];
            const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            return {
                ...state,
                focusDate: action.date,
                focusDateInfo: {
                  month: months[action.date.getMonth()],
                  day: `${action.date.getDate()}th ${dayOfWeek[action.date.getDay()]}`
                },
                modalWindowIsEnable: true,
            }
        }
        case DISABLE_FOCUS_WINDOW: {
            return {
                ...state,
                modalWindowIsEnable: false
            }
        }
        default:
            return state;
    }
}

export const changeMonth = isNext => ({type: CHANGE_MONTH, isNext});
export const setFocusDate = date => ({type: SET_FOCUS_DATE, date});
export const disableFocusWindow = () => ({type: DISABLE_FOCUS_WINDOW});


export default calendarReducer