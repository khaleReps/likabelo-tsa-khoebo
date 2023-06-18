import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const EditContact = () => {


  const navigate = useNavigate();
  const {contactId} = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: '', 
      photo: '', 
      mobile: '', 
      email: '', 
      company: '',
      title: '',
      group_id: '',  
    },
    groups: [],
    errorMessage: ''
  });

  
  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups()
        setState({ ...state, loading: false, contact: response.data, groups: groupResponse.data });
      } catch (error) {
        setState({ ...state, loading: false,  errorMessage: error.message });
      }
    }
    fetchData();
  }, [contactId]);

  let updateInput = (e) => {
    setState({
      ...state,
      contact:{
        ...state.contact,
        [e.target.name] : e.target.value
      }
    });
  };
  
  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(state.contact, contactId);
      if (response) {
        navigate('/contacts/list', { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  }

  
  let {loading, contact, groups, errorMessage} = state;

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      {
         loading ? <Spinner/> : <React.Fragment>
            <section className='add-contact'>
      <div className='container'>
        <div className='row'>
          <div className='col py-3'>
            <p className='h3 text-suceess fw-bold'>Edit Content</p>
            <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aliquid, enim minima minus fugit praesentium voluptatem cum nobis sint nesciunt ex, molestias tempora nihil natus dignissimos! Tempore eum totam nihil.</p>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <form onSubmit={submitForm}>
                <div className='mb-2'>
                  <input type='text' required="true" className='form-control' placeholder='Name' value={contact.name} name="name" onChange={updateInput}/>
                </div>
                <div className='mb-2'>
                  <input type='text' required="true" className='form-control' placeholder='Photo Url' value={contact.photo} name="photo" onChange={updateInput}/>
                </div>
                <div className='mb-2'>
                  <input type='number' required="true" className='form-control' placeholder='Mobile' value={contact.mobile} name="mobile" onChange={updateInput}/>
                </div>
                <div className='mb-2'>
                  <input type='text' required="true" className='form-control' placeholder='Email' value={contact.email} name="email" onChange={updateInput}/>
                </div>
                <div className='mb-2'>
                  <input type='text' required="true" className='form-control' placeholder='Company' value={contact.company} name="company" onChange={updateInput}/>
                </div>
                <div className='mb-2'>
                  <input type='text' required="true" className='form-control' placeholder='Title' value={contact.title} name="title" onChange={updateInput}/>
                </div>
                {/* <div className='mb-2'>
                  <input type='text' required="true" className='form-control' placeholder={"Selected Group: " + (groups.length > 0 && groups[0].name)} aria-label="Disabled input example" disabled />
                </div> */}


                <select className='form-control' required={true} value={contact.group_id} name='group_id' onChange={(e) => setState({ ...state, contact: { ...state.contact, group_id: e.target.value } })}>
                  <option value=''>Select a Group</option>
                  <hr />
                  {groups.length > 0 &&
                    groups.map((group) => {
                      return (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      );
                    })}
                </select>
                <br/>

                <button type="submit" value="Update" className="btn btn-primary m-1">Update</button>
                <Link to="{'/contacts/list'}" className='btn btn-dark m-1'>Cancel</Link>
              </form>
            </div>
            <div className='col-md-6 align-item-center'>
              <img src={contact.photo} alt="profile" className='img-fluid contact-img'/>
            </div>
          </div>
        </div>
      </div>

    </section>
         </React.Fragment> 
      }

    
    </React.Fragment>
  )
}

export default EditContact
