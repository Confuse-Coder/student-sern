import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils';

class ConfirmScheduleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      imgBase64: '',
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendConfirmSchedule = () => {
    this.props.sendConfirmSchedule(this.state);
  };

  render() {
    // toggle={}
    let { isOpenModal, closeConfirmScheduleModal, dataModal, sendConfirmSchedule } = this.props;
    return (
      <Modal isOpen={isOpenModal} className={'booking-modal-container'} size="md" centered>
        <div className="modal-header">
          <h5 className="modal-title">
            <FormattedMessage id="confirm.title" />
          </h5>
          <button
            className="close"
            type="button"
            aria-label="Close"
            onClick={closeConfirmScheduleModal}
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="confirm.email" />
              </label>
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={(event) => this.handleOnchangeEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="confirm.choose-file" />
              </label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => this.handleOnchangeImage(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSendConfirmSchedule()}>
            <FormattedMessage id="confirm.send" />
          </Button>
          <Button color="secondary" onClick={closeConfirmScheduleModal}>
            <FormattedMessage id="confirm.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmScheduleModal);
