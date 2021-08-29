import style from './Calendar.module.scss';

const Calendar = ({date, focusDate, onChangeCalendar, onFocusDate}) => {
    const createInfoBlock = (date) => {
         const months = ['january', 'february', 'march', 'april', 'may', 'june', 'jule', 'august', 'september', 'october', 'november', 'december'];
         return months[date.getMonth()] + ' ' + date.getFullYear();
     }

    return (
       <div className={style.calendar}>
           <div className={style.container}>
               <div className={style.infoAndChangeBlock}>
                   <div onClick={() => {onChangeCalendar(false)}} className={style.changeButtons}>{'<'}</div>
                   <div>{createInfoBlock(date)}</div>
                   <div onClick={() => {onChangeCalendar(true)}} className={style.changeButtons}>></div>
               </div>
               <table>
                   <CreateMonth
                       currentDate={date}
                       onFocusDate={onFocusDate}
                       focusDate={focusDate}
                   />
                   <tfoot>
                       <tr>
                           <td>S</td>
                           <td>M</td>
                           <td>T</td>
                           <td>W</td>
                           <td>T</td>
                           <td>F</td>
                           <td>S</td>
                       </tr>
                   </tfoot>
               </table>
           </div>
       </div>
    )
}

export default Calendar;

const CreateMonth = ({currentDate, focusDate, onFocusDate}) => {
      const fillDaysCalendar = () => {
         let days = [];
         for(let i = 1; i <= new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); i++) {  //new date for find last day of month
             days.push(i);
         }
         return days;
     }

     const fillFirstEmptyDays = (elemsCalendar) => {
         let firstDayOfWeek = dayOfWeek(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
         const shiftElems = 0 - firstDayOfWeek;
         if(shiftElems === -7) return elemsCalendar; //if month ended on sunday

         let lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

         for(let i = shiftElems; i < 0; i++) {
             elemsCalendar.unshift('!' + lastDayOfPrevMonth);
             lastDayOfPrevMonth--;
         }
         return elemsCalendar;
     }

     const fillLastEmptyDays = (elemsCalendar) => {
         let lastDayOfWeek = dayOfWeek(new Date(currentDate.getFullYear(), currentDate.getMonth() +1, 0));
         let popElems = 6 - lastDayOfWeek;
         if(lastDayOfWeek === 7)  popElems = 6; //if month ended on sunday

         let firstDaysOfNextMonth = 1;
         for(let i = popElems; i > 0; i--) {
             elemsCalendar.push('!0' + firstDaysOfNextMonth);
             firstDaysOfNextMonth++;
         }
         return elemsCalendar;
     }

    const dayOfWeek = (date) => {
        let firstDayOfWeek = date.getDay();
        if(firstDayOfWeek === 0) {
            return 7;
        } else {
            return firstDayOfWeek;
        }
    }

     const createMonth = (days ,numWeeks) => {
         let createMonth = [];
         const comparisonMonths = focusDate && currentDate.getMonth() === focusDate.getMonth();

         for(let i = 0; i < numWeeks; i++) {
             let createDayInWeek = [];
             for(let j = 0; j < 7; j++) {
                 const currentDay = days[i * 7 + j];

                 const classes = `${currentDay[0] !== '!' ? style.elemCalendar : ''} 
                                  ${comparisonMonths && currentDay === focusDate.getDate() ? style.focusDate : ''}
                                  ${currentDay[0] === '!' ? style.prevOrNextMonth: ''}`

                 createDayInWeek.push(<td
                     key={j}
                     onClick={
                         currentDay[0] !== '!'
                         ? () => {onFocusDate(new Date(currentDate.getFullYear() ,currentDate.getMonth(), currentDay))}
                         : null
                     }
                     className={classes}
                 >{currentDay[0] !== '!' ? currentDay < 10 ? '0' + currentDay : currentDay : currentDay.substring(1)}</td>);
             }
             createMonth.push(<tr key={i}>{createDayInWeek}</tr>);
         }
         return createMonth;
     }

    let elemsCalendar = fillDaysCalendar();
    elemsCalendar = fillFirstEmptyDays(elemsCalendar);
    elemsCalendar = fillLastEmptyDays(elemsCalendar);
    const weeks = elemsCalendar.length / 7;

    const calendar = createMonth(elemsCalendar, weeks);

     return (
         <tbody>
             {calendar}
         </tbody>
     )
 }

