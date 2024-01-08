import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Calendar = (prop) => {
    return (
        <DatePicker selected={prop.date} dateFormat={"yyyy-MM-dd"} onChange={(date:Date) => {prop.setDate(date);
            console.log(date.toISOString().split("T")[0])}} />
    );
};
export default Calendar;