import Calendar from './Calendar/Calendar';
import Modal from './Modal/Modal';
import { connect } from 'react-redux';
import style from './Home.module.scss';
import {changeMonth, setFocusDate, disableFocusWindow} from '../../redux/calendar-reducer';

const Home = (props) => {
    const onChangeCalendar = (isNext) => {
        props.changeMonth(isNext);
    }

    const onFocusDate = (date) => {
        props.setFocusDate(date)
    }

    return (
        <div className={style.home}>
            <div className={style.text}>
                <h1>
                    choose the day <br /> for the meeting
                </h1>
                <p>
                    We encourage you to book your <br /> appointment online.<br /> This will save you time.
                </p>
            </div>
            <div className={style.calendar}>
                <Calendar
                    date={props.date}
                    focusDate={props.focusDate}
                    onChangeCalendar={onChangeCalendar}
                    onFocusDate={onFocusDate}
                />
            </div>
            <Modal
                modalWindowIsEnable={props.modalWindowIsEnable}
                onDisableFocusWindow={props.disableFocusWindow}
                focusDateInfo={props.focusDateInfo}
            />
        </div>
    )
}


const mapStateToProps = (state) => ({
   date: state.calendar.date,
   focusDate: state.calendar.focusDate,
   focusDateInfo: state.calendar.focusDateInfo,
   modalWindowIsEnable: state.calendar.modalWindowIsEnable
});

export default connect(mapStateToProps, {changeMonth, setFocusDate, disableFocusWindow})(Home);