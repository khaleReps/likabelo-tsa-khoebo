import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
        <React.Fragment>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <div className="container-fluid">
                        {/* <a className="navbar-brand" href="#">primary</a> */}
                        <Link to={'/'} className="navbar-brand"><i className='fa fa-mobile text-success'></i> Lead <span className="text-success"><b>Manager</b></span></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarID"
                            aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarID">
                            <div className="navbar-nav">
                                {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                            </div>
                        </div>
                    </div>
                </nav>
        </React.Fragment>
    )
}

export default NavBar
