import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { removeStudent } from '../reducers/students.reducer';

//*-----------------     COMPONENT     -----------------*/
const StudentDetail = props => {
  const { selectedStudent, selectedCampus, removeStudent } = props;
  const noCampus = 'No campus selected';
  const gpa = selectedStudent.gpa || 'New Student no GPA';
  return (
    <div>
      <div>
        <div className="stdentDetail">
          <img src={selectedStudent.imageUrl} />
        </div>
        <h1>
          {selectedStudent.firstName} {selectedStudent.lastName}
        </h1>
        <br />
        <h4>GAP: {gpa} </h4>
        <br />
        <div>
          <button className="editButton" type="button">
            <Link
              to={`/students/studentForm/${selectedStudent.id}`}
              className="editButton-link"
            >
              Edit
            </Link>
          </button>
          <button
            className="deleteButton"
            type="button"
            onClick={() => removeStudent(selectedStudent.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <br />
      <div>
        <h2> This student is registered to a campus </h2>
        <br />
        <div className="studentDetail-campus">
          <img className="campus-image" src={selectedStudent.campus.imageUrl} />
          <Link to={`/Campuses/${selectedStudent.campus.id}`}>
            {selectedStudent.campus.name}
          </Link>
          <br />
          <span>
            {selectedCampus
              ? `${selectedCampus.students.length} students`
              : noCampus}
          </span>
        </div>
      </div>
    </div>
  );
};

//*-----------------     MAPPING TO STORE     -----------------*/
const mapState = (state, ownProps) => {
  const id = +ownProps.match.params.id;
  const findStudent = state.students.list.find(student => student.id === id);
  return {
    selectedStudent: findStudent,
    selectedCampus:
      findStudent.campusId &&
      state.campuses.list.find(campus => findStudent.campus.id === campus.id),
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    removeStudent: id => {
      dispatch(removeStudent(id, ownProps));
      ownProps.history.push('/students');
    },
  };
};

export default connect(mapState, mapDispatch)(StudentDetail);
