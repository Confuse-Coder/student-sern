import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileTeacher from '../ProfileTeacher';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postStudentBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      birthDay: '',
      genders: '',
      selectedGender: '',
      teacherId: '',
      timeType: '',
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      if (this.props.genders.length > 0) {
        this.setState({
          genders: this.buildDataGender(this.props.genders),
        });
      }
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let teacherId = this.props.dataTime.teacherId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          teacherId: teacherId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handeleOnChangeDatePicker = (date) => {
    this.setState({
      birthDay: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
          : moment
              .unix(+dataTime.date / 1000)
              .locale('en')
              .format('ddd - MM/DD/YYYY');
      return `${time} - ${date}`;
    }
    return '';
  };

  buildTeacherName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.teacherData.lastName} ${dataTime.teacherData.firstName}`
          : `${dataTime.teacherData.firstName} ${dataTime.teacherData.lastName}`;

      return name;
    }
    return '';
  };

  handleConfirmBooking = async () => {
    //validate input
    // if (!data.email || !data.teacherId || !data.date || !data.timeType) {
    let date = new Date(this.state.birthDay).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let teacherName = this.buildTeacherName(this.props.dataTime);

    let res = await postStudentBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      teacherId: this.state.teacherId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      teacherName: teacherName,
    });
    if (res && res.errCode === 0) {
      toast.success('Booking a new appointment succeed');
      this.props.closeBookingModal();
      this.setState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthDay: '',
        genders: '',
        selectedGender: '',
        teacherId: '',
        timeType: '',
      });
    } else {
      toast.error('Booking a new appointment error!');
    }
  };

  render() {
    // toggle={}
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let teacherId = dataTime && !_.isEmpty(dataTime) ? dataTime.teacherId : '';
    return (
      <Modal isOpen={isOpenModal} className={'booking-modal-container'} size="lg" centered>
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="student.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="teacher-infor">
              <ProfileTeacher
                teacherId={teacherId}
                isShowDescriptionTeacher={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="student.booking-modal.fullname" />
                </label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="student.booking-modal.phonenumber" />
                </label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="student.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeInput(event, 'email')}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="student.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) => this.handleOnchangeInput(event, 'address')}
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="student.booking-modal.reason" />
                </label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="student.booking-modal.bỉrthday" />
                </label>
                <DatePicker
                  onChange={this.handeleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.birthDay}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="student.booking-modal.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn-booking-confirm" onClick={() => this.handleConfirmBooking()}>
              <FormattedMessage id="student.booking-modal.btnConfirm" />
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              <FormattedMessage id="student.booking-modal.btnCancel" />
            </button>
          </div>
        </div>
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
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
