import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

const AddContact = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      group_id: "",
    },
    groups: [],
    errorMessage: "",
    showModal: false,
  });

  const updateInput = (event, field) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [field]: event.target.value,
      },
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getGroups();
        setState({ ...state, loading: false, groups: response.data });
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: error.message,
        }));
      }
    }
    fetchData();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        setState({
          ...state,
          showModal: true,
          contact: {
            name: "",
            photo: "",
            mobile: "",
            email: "",
            company: "",
            title: "",
            group_id: "",
          },
        });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  const { loading, contact, groups, errorMessage, showModal } = state;

  return (
    <React.Fragment>
      <section className="add-contact">
        <div className="container">
          <div className="row">
            <div className="col py-3">
              <p className="h3 text-suceess fw-bold">Create Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                aliquid, enim minima minus fugit praesentium voluptatem cum
                nobis sint nesciunt ex, molestias tempora nihil natus
                dignissimos! Tempore eum totam nihil.
              </p>
            </div>
            <div className="row">
              <div className="col-md-4">
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                {loading ? (
                  <Spinner />
                ) : (
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={contact.name}
                        required={true}
                        onChange={(e) => updateInput(e, "name")}
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="photo"
                        value={contact.photo}
                        required={true}
                        onChange={(e) => updateInput(e, "photo")}
                        placeholder="Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="number"
                        className="form-control"
                        id="mobile"
                        value={contact.mobile}
                        required={true}
                        onChange={(e) => updateInput(e, "mobile")}
                        placeholder="Phone"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={contact.email}
                        required={true}
                        onChange={(e) => updateInput(e, "email")}
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        value={contact.company}
                        required={true}
                        onChange={(e) => updateInput(e, "company")}
                        placeholder="Company"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={contact.title}
                        required={true}
                        onChange={(e) => updateInput(e, "title")}
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required={true}
                        name="group_id"
                        value={contact.group_id}
                        onChange={(e) => updateInput(e, "group_id")}
                        className="form-control"
                      >
                        <option value="">Select a Group</option>
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <button
                      type="submit"
                      value="Create"
                      className="btn btn-primary m-1"
                    >
                      Create
                    </button>
                    <Link to="/contacts/list" className="btn btn-dark m-1">
                      Cancel
                    </Link>
                    {state.errorMessage && (
                      <div className="alert alert-danger">
                        {state.errorMessage}
                      </div>
                    )}
                    {state.successMessage && (
                      <div className="alert alert-success">
                        {state.successMessage}
                      </div>
                    )}
                  </form>


                )}
              </div>
              <div className='col-md-6 align-item-center'>
                {contact.photo ? (
                  <img src={contact.photo} alt="profile" className='img-fluid contact-img'/>
                ) : (
                  <img src="https://cdn-icons-png.flaticon.com/512/3364/3364044.png" alt="placeholder" className='img-fluid contact-img'/>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default AddContact;
