import {createStore, combineReducers} from 'redux';
import calendarReducer from './calendar-reducer';

let reducers = combineReducers({
    calendar: calendarReducer,
});

let store  = createStore(reducers);

export default store;