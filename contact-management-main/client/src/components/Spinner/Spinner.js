import React from 'react';
import loaderImg from '../../assets/img/loader.gif';

const Spinner = () => {
  return (
    <React.Fragment>
        <div>
            <img src={loaderImg} alt='' className='d-block m-auto' style={{width: '200px'}}></img>
        </div>
    </React.Fragment>
  )
};

export default Spinner
