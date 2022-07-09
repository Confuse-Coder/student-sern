import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageStudent.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllStudentForTeacher, postSendConfirmSchedule } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import ConfirmScheduleModal from './ConfirmScheduleModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManageStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataStudent: [],
      isOpenConfirmScheduleModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataStudent();
  }

  getDataStudent = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getAllStudentForTeacher({
      teacherId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataStudent: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
  }

  handeleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataStudent();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      teacherId: item.teacherId,
      studentId: item.studentId,
      email: item.studentData.email,
      timeType: item.timeType,
      studentName: item.studentData.firstName,
    };
    this.setState({
      isOpenConfirmScheduleModal: true,
      dataModal: data,
    });
  };

  closeConfirmScheduleModal = () => {
    this.setState({
      isOpenConfirmScheduleModal: false,
      dataModal: {},
    });
  };

  sendConfirmSchedule = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendConfirmSchedule({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      teacherId: dataModal.teacherId,
      studentId: dataModal.studentId,
      timeType: dataModal.timeType,
      language: this.props.language,
      studentName: dataModal.studentName,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success('Send Confirm Schedule succeed!');
      this.closeConfirmScheduleModal();
      await this.getDataStudent();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error('Send Confirm Schedule failed!');
    }
  };

  render() {
    let { dataStudent, isOpenConfirmScheduleModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading...">
          <div className="manage-student-container">
            <div className="m-p-title">
              <FormattedMessage id="manage-student.title" />
            </div>
            <div className="manage-student-body row">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-student.choose-schedule" />
                </label>
                <DatePicker
                  onChange={this.handeleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-student">
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <th>
                        <FormattedMessage id="manage-student.table.col-1" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-student.table.col-2" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-student.table.col-3" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-student.table.col-4" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-student.table.col-5" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-student.table.col-6" />
                      </th>
                    </tr>
                    {dataStudent && dataStudent.length > 0 ? (
                      dataStudent.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataStudent.valueVi
                            : item.timeTypeDataStudent.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.studentData.genderData.valueVi
                            : item.studentData.genderData.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.studentData.firstName}</td>
                            <td>{item.studentData.address}</td>
                            <td>{gender}</td>
                            <td>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                <FormattedMessage id="manage-student.confirm" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center' }}>
                          <FormattedMessage id="manage-student.data" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ConfirmScheduleModal
            isOpenModal={isOpenConfirmScheduleModal}
            dataModal={dataModal}
            closeConfirmScheduleModal={this.closeConfirmScheduleModal}
            sendConfirmSchedule={this.sendConfirmSchedule}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);
