import React, { useEffect, useState } from 'react';
import loading from '../assets/logo/loading.png';

const Loading = () => {
    return (
        <div className='loading_page'>
            <img src={loading} alt="loading image" className='truck_img' />
            <div className="loading_text"> Loading...</div>
        </div>
    );
}

export default Loading;

