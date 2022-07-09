import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ProfileTeacher.scss';
import { getProfileTeacherById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { Link } from 'react-router-dom';

class ProfileTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforTeacher(this.props.teacherId);
    this.setState({
      dataProfile: data,
    });
  }

  getInforTeacher = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileTeacherById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
    if (this.props.teacherId !== prevProps.teacherId) {
      // this.getInforTeacher(this.props.teacherId)
    }
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  renderTimeBooking = (dataTime) => {
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

      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="student.booking-modal.freeBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescriptionTeacher, isShowLinkDetail, isShowPrice, dataTime, teacherId } =
      this.props;
    let nameVi = '',
      nameEn = '';
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi},  ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-teacher-container">
        <div className="intro-teacher">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
            </div>
            <div className="down">
              {isShowDescriptionTeacher === true ? (
                <>
                  {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                    <span>{dataProfile.Markdown.description}</span>
                  )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-teacher">
            <Link to={`/detail-teacher/${teacherId}`}>Xem thêm</Link>
          </div>
        )}

        {isShowPrice === true && (
          <div className="price">
            <FormattedMessage id="student.booking-modal.priceBooking" />
            {dataProfile && dataProfile.Teacher_Infor && language === LANGUAGES.VI && (
              <NumberFormat
                className="currency"
                value={dataProfile.Teacher_Infor.priceTypeData.valueVi}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'VND'}
              />
            )}
            {dataProfile && dataProfile.Teacher_Infor && language === LANGUAGES.EN && (
              <NumberFormat
                className="currency"
                value={dataProfile.Teacher_Infor.priceTypeData.valueEn}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'$'}
              />
            )}
          </div>
        )}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTeacher);
