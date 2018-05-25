import React from 'react';
import CampusSelectForm from './CampusSelectForm';

const StudentForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>New Student Form</h2>
      <br />

      <div className="formCampus">
        <label>
          First Name:
          <input
            onChange={props.handleChange}
            value={props.firstName}
            name="firstName"
            type="text"
            placeholder="..."
          />
        </label>
        <br />
        <br />
        <label>
          Last Name:
          <input
            onChange={props.handleChange}
            value={props.lastName}
            name="lastName"
            type="text"
            placeholder="..."
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            onChange={props.handleChange}
            value={props.email}
            name="email"
            type="text"
            placeholder="..."
          />
        </label>
        <br />
        <br />
        <CampusSelectForm {...props} handleChange={props.handleChange} />
        <button
          disabled={!props.firstName || !props.lastName || !props.email}
          className="smallbutton"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StudentForm;