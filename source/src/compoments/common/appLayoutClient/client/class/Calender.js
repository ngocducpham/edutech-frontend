import React from 'react';
import { Calendar } from 'antd';


const Calender = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };

    return (
        <div className='site-calendar'>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
    )
}

export default Calender