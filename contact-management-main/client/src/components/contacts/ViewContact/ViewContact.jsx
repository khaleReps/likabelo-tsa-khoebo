import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ViewContact = () => {
const {contactId} = useParams();

const [state, setState] = useState({
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
groups: [], // initialize as empty array
errorMessage: ''
});

useEffect(() => {
async function fetchData() {
try {
setState({ ...state, loading: true });
const [contactResponse, groupResponse] = await Promise.all([
ContactService.getContact(contactId),
ContactService.getGroups(contactId)
]);
setState({ ...state, loading: false, contact: contactResponse.data, groups: groupResponse.data });
} catch (error) {
setState({ ...state, loading: false, errorMessage: error.message });
}
}
fetchData();
}, [contactId]);

const {loading, contact, groups, errorMessage} = state;

const getGroupName = (group_id) => {
const group = groups.find(group => group.id === group_id);
return group ? group.name : '';
}

return (
<React.Fragment>
    {/* <pre>{JSON.stringify(contact)}</pre> */}
    <section className='view-contact-intro'>
        <div className='container'>
            <div className='row'>
                <div className='col py-3'>
                    <p className='h3 text-suceess fw-bold'>View Content</p>
                    <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aliquid,
                        enim minima minus fugit praesentium voluptatem cum nobis sint nesciunt ex, molestias tempora
                        nihil natus dignissimos! Tempore eum totam nihil.</p>
                </div>
            </div>
        </div>
    </section>
    {loading ?
    <Spinner /> : (
    <section className='view-contact'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                    <img src={contact.photo} className='img-fluid contact-img' alt='' />
                </div>
                <div className='col-md-8 align-items-center'>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>Name: <span className='fw-bold'>{contact.name}</span></li>
                        <li className='list-group-item'>Mobile: <span className='fw-bold'>{contact.mobile}</span></li>
                        <li className='list-group-item'>Email: <span className='fw-bold'>{contact.email}</span></li>
                        <li className='list-group-item'>Company: <span className='fw-bold'>{contact.company}</span></li>
                        <li className="list-group-item">Title: <span className="fw-bold">{contact.title}</span></li>
                        <li className="list-group-item">Group: <span className="fw-bold">{getGroupName(contact.group_id)}</span></li>

                    </ul>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Link to="./contacts/list" className='btn btn-warning'>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )}
</React.Fragment>
);
};

export default ViewContact;