import React, {useState} from 'react';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import moment from "moment";

function TimeslotCalender(props) {
    const [startDate, setStartDate] = useState(new Date());
    let timeslotProps = {
        format: 'h', // Each element in the timeslot array is an Hour
        showFormat: 'mm', // They will be displayed as Hour:Minutes AM/PM
    }

    return (
        <div>
            <ReactTimeslotCalendar
                onChange={(date) => setStartDate(date)}
                initialDate = { moment(startDate).format('LL') }
                timeslots = { [
                    ['9', '10'],
                    ['10', '11'],
                    ['11', '12'],
                    ['12', '13'],
                    ['13', '14'],
                ]}
            />
        </div>
    );
}

export default TimeslotCalender;