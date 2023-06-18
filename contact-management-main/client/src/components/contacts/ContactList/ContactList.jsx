import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ContactList = () => {


  const [query, setQuery] = useState({})

  const [state, setState] = useState({ 
      loading: false,
      contacts: [],
      filteredContacts : [],
      errorMessage: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState(prevState => ({ ...prevState, loading: true }));
        let response = await ContactService.getAllContacts();
        setState(prevState => ({ ...prevState, loading: false, contacts: response.data, filteredContacts: response.data }));
      } catch (error) {
        setState(prevState => ({ ...prevState, loading: false, errorMessage: error.message }));
      }
    }
    fetchData();
  }, []);

  const clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState(prevState => ({ ...prevState, loading: true }));
        let response = await ContactService.getAllContacts();
        setState(prevState => ({ ...prevState, loading: false, contacts: response.data, filteredContacts: response.data  }));
      }
    }
    catch (error) {
      setState(prevState => ({ ...prevState, loading: false, errorMessage: error.message }));
    }
  };

  let searchContacts = (event) => {
    setQuery({...query, text: event.target.value});
    let theContacts = state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setState({
      ...state,
      filteredContacts: theContacts,
    })
  };



  const {loading, contacts, filteredContacts,  errorMessage} = state;

  return (
    <React.Fragment>
      {/* <pre>{query.text}</pre> */}
      {/* <pre>{JSON.stringify(contacts)}</pre> */}
      <section className='contact-search m-3'>
        <div className='container'>
            <div className='grid'>
              <div className="col">
                <h1>Lead Manager <Link to={'/contacts/add'} className="btn bg-primary ms-2 text-white"><i className="fa fa-plus-circle me-2"/> New!</Link></h1>
                <p className='fst-italic'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta laborum similique iusto suscipit vero nihil molestiae, incidunt consequuntur. Veritatis, error. Atque expedita magni est deserunt vitae quia debitis labore sint?</p>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <form className='col-12 row'>
                     <div className='mb-2 col-10'>
                      <input type="text" className='form-control ' placeholder='Search Names' name='text' value={query.text} onChange={searchContacts}/>
                     </div>
                     <button type="submit" className="btn btn-primary col-2">Search</button>
                  </form>
                </div>
              </div>
            </div>
        </div>
      </section>

      {
        loading ? <Spinner></Spinner> : <React.Fragment>



<section className='contact-list'>
        <div className='container'>
          <div className='row'>
            
            
            {
              filteredContacts.length > 0 ? (
                filteredContacts.map(contact => {
                  return (
                    <div className='col-md-6' key={contact.id}>
                    <div className="card my-2">
                      <div className='card-body'>
                        <div className='row align-items-center d-flex justify-content-around'>
                          <div className='col-md-4'>
                            <img src={contact.photo} alt="profile_image" className='img-fluid contact-img' />
                          </div>
                          <div className='col-md-7'>
                          
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item">Name: <span className="fw-bold">{contact.name}</span></li>
                                <li className="list-group-item">Mobile: <span className="fw-bold">{contact.mobile}</span></li>
                                <li className="list-group-item">Email: <span className="fw-bold">{contact.email}</span></li>
                              </ul>
                  
                          </div>
                          <div className='col-md-1 d-flex flex-column align-items-center'>
                            <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'><i className='fa fa-eye p-1'></i></Link>
                            <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'><i className='fa fa-pen p-1'></i></Link>
                            <Link onClick={() => clickDelete(contact.id)} className='btn btn-danger my-1'><i className='fa fa-trash p-1'></i></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                  )
                })
              ) : (
                <div className='col-md-12'>
                  <h1 className='text-danger'>Contact Not found </h1>
                </div>
              )
            }
     
          </div>
        </div>
      </section>


        </React.Fragment>
      }


      

    

    </React.Fragment>
  )
}

export default ContactList;
