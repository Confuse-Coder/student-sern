import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TeacherSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleTeacherByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class TeacherSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);

    if (this.props.detailIdFromParent) {
      let res = await getScheduleTeacherByDate(this.props.detailIdFromParent, allDays[0].value);
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }

    this.setState({
      allDays: allDays,
    });
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
        }
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);

      if (this.props.detailIdFromParent) {
        let res = await getScheduleTeacherByDate(this.props.detailIdFromParent, allDays[0].value);
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.detailIdFromParent !== prevProps.detailIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleTeacherByDate(this.props.detailIdFromParent, allDays[0].value);
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.detailIdFromParent && this.props.detailIdFromParent !== -1) {
      let teacherId = this.props.detailIdFromParent;
      let date = event.target.value;
      let res = await getScheduleTeacherByDate(teacherId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
    let { language } = this.props;
    return (
      <React.Fragment>
        <div className="teacher-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="student.detail-teacher.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          key={index}
                          className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                          onClick={() => this.handleClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="student.detail-teacher.choose" />{' '}
                      <i className="far fa-hand-point-up"></i>{' '}
                      <FormattedMessage id="student.detail-teacher.book-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="non-schedule">
                  <FormattedMessage id="student.detail-teacher.non-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSchedule);
