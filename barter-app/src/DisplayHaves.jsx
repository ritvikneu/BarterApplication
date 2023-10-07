import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllHaves } from '../Actions/HaveAction';

const AllHaves = ({ havesList, getAllHaves }) => {
  useEffect(() => {
    getAllHaves();
  }, []);

  return (
    <div>
      <h1>All Haves</h1>
      <ul>
        {havesList.map((have) => (
          <li key={have.id}>{have.name}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  havesList: state.haveReducer.havesList,
});

const mapDispatchToProps = {
  getAllHaves,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllHaves);
