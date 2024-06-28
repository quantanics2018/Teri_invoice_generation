import React from 'react';
import '../../assets/style/App.css'
import Navbar from '../layout/TopNavbar';
import Distributer_Detials_content from './Distributer_Detials_content';


function Distributer_Detials(props){
    // alert(props.age);
    return (
        <div className='device-page'>
            <Distributer_Detials_content position={props.position}/>
        </div>
    );
};
export default Distributer_Detials;




