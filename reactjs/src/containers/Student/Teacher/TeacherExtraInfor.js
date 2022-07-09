import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TeacherExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { getExtraInforTeacherById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class TeacherExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.detailIdFromParent) {
      let res = await getExtraInforTeacherById(this.props.detailIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
    if (this.props.detailIdFromParent !== prevProps.detailIdFromParent) {
      let res = await getExtraInforTeacherById(this.props.detailIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    return (
      <div className="teacher-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="student.extra-infor-teacher.text-address" />
          </div>
          <div className="name-teachingCenter">
            {extraInfor && extraInfor.nameTeachingCenter ? extraInfor.nameTeachingCenter : ''}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressTeachingCenter ? extraInfor.addressTeachingCenter : ''}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false ? (
            <div className="short-infor">
              <FormattedMessage id="student.extra-infor-teacher.price" />
              {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                <NumberFormat
                  className="currency"
                  value={extraInfor.priceTypeData.valueVi}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'VND'}
                />
              )}
              {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                <NumberFormat
                  className="currency"
                  value={extraInfor.priceTypeData.valueEn}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'$'}
                />
              )}
              <span className="detail" onClick={() => this.showHideDetailInfor(true)}>
                <FormattedMessage id="student.extra-infor-teacher.detail" />
              </span>
            </div>
          ) : (
            <>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="student.extra-infor-teacher.price" />
                  </span>
                  <span className="right">
                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueVi}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'VND'}
                      />
                    )}
                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueEn}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'$'}
                      />
                    )}
                  </span>
                </div>
                <div className="note">{extraInfor && extraInfor.note ? extraInfor.note : ''}</div>
              </div>
              <div className="payment">
                <FormattedMessage id="student.extra-infor-teacher.payment" />
                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                  ? extraInfor.paymentTypeData.valueVi
                  : ''}
                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                  ? extraInfor.paymentTypeData.valueEn
                  : ''}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  {' '}
                  <FormattedMessage id="student.extra-infor-teacher.hide-price" />
                </span>
              </div>
            </>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherExtraInfor);
