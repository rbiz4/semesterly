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
import Modal from 'boron/ScaleModal';
import * as SemesterlyPropTypes from '../../constants/semesterlyPropTypes';

class ChatModal extends React.Component {
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
        const modalStyle = {
            width: '100%',
        };

        return (<Modal
                ref={(c) => {
                    this.modal = c;
                }}
                className="max-modal"
                modalStyle={modalStyle}
                onHide={() => {
                    this.props.toggleMockModal();
                }}
            >
                {modalHeader}
                <ul className="pages">
                    <li className="chat page">
                        <div className="chatArea">
                            <ul className="messages"/>
                        </div>
                        <input className="inputMessage" placeholder="Type here..."/>
                    </li>
                    <li className="login page">
                        <div className="form">
                            <h3 className="title" style={{color: 'black'}}>What's your nickname?</h3>
                            <input className="usernameInput" type="text" maxLength="14" style={{color: 'black'}}/>
                        </div>
                    </li>
                </ul>
                <script src="/main.js"/>
            </Modal>
        );
    }
}

ChatModal.propTypes = {
    toggleChatModal: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default ChatModal;