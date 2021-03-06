/*
Copyright (C) 2017 Semester.ly Technologies, LLC

Semester.ly is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Semester.ly is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

import PropTypes from 'prop-types';
import React from 'react';
//import classnames from 'classnames';
//import ReactTooltip from 'react-tooltip';
//import Clipboard from 'clipboard';
//import PaginationContainer from './containers/pagination_container';
//import SlotManagerContainer from './containers/slot_manager_container';
//import CellContainer from './containers/cell_container';
//import { DAYS } from '../constants/constants';
//import { ShareLink } from './master_slot';
import * as SemesterlyPropTypes from '../../constants/semesterlyPropTypes';
import Modal from "boron/WaveModal";

class MockModal extends React.Component {
  componentDidMount() {
    if (this.props.isVisible) {
      this.modal.show();
    }
  }

  componentDidUpdate() {
    if (this.props.isVisible) {
      this.modal.show();
    }
  }

  render() {
    const modalHeader =
      (<div className="modal-content">
        <div className="modal-header">
          <h1>Mock Modal</h1>
          <div className="modal-close" onClick={() => this.modal.hide()}>
            <i className="fa fa-times" />
          </div>
        </div>
      </div>);
    const modalBody =
      (<div className="modal-body">
        <h3>First Name: { this.props.userInfo.userFirstName } </h3>
        <h3>Last Name: { this.props.userInfo.userLastName } </h3>
        <h3>Graduating Class: { this.props.userInfo.class_year } </h3>
        <h3>Mock One: { this.props.mockInfo.mock_one } </h3>
        <h3>Mock Two: { this.props.mockInfo.mock_two } </h3>
        <h3>Mock Three: { this.props.mockInfo.mock_three ? "True" : "False" } </h3>
      </div>);
    const modalStyle = {
      width: '100%',
    };
    return (
      <Modal
        ref={(c) => { this.modal = c; }}
        className="mock-modal abnb-modal max-modal"
        modalStyle={modalStyle}
        onHide={() => {
          this.props.toggleMockModal();
          history.replaceState({}, 'Semester.ly', '/');
        }}
      >
        {modalHeader}
        {modalBody}
      </Modal>
    );
  }
}

MockModal.propTypes = {
  toggleMockModal: PropTypes.func.isRequired,
  userInfo: SemesterlyPropTypes.userInfo.isRequired,
  mockInfo: SemesterlyPropTypes.mockInfo.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default MockModal;

