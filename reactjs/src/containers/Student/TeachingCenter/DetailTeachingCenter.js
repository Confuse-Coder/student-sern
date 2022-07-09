import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DetailTeachingCenter.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import TeacherSchedule from '../Teacher/TeacherSchedule';
import TeacherExtraInfor from '../Teacher/TeacherExtraInfor';
import ProfileTeacher from '../Teacher/ProfileTeacher';
import { getDetailTeachingCenterById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailTeachingCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTeacherId: [],
      dataDetailTeachingCenter: {},
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let res = await getDetailTeachingCenterById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        console.log('check res', res);
        let arrTeacherId = [];

        if (data && !_.isEmpty(res.data)) {
          let arr = data.teacherTeachingCenter;

          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrTeacherId.push(item.teacherId);
            });
          }
        }

        this.setState({
          dataDetailTeachingCenter: res.data,
          arrTeacherId: arrTeacherId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
  }

  render() {
    let { arrTeacherId, dataDetailTeachingCenter } = this.state;
    let { language } = this.props;
    console.log('WRLD>>> check res', this.state);

    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailTeachingCenter && !_.isEmpty(dataDetailTeachingCenter) && (
              <>
                <div>{dataDetailTeachingCenter.name}</div>
                <div
                  dangerouslySetInnerHTML={{ __html: dataDetailTeachingCenter.descriptionHTML }}
                ></div>
              </>
            )}
          </div>
          {arrTeacherId &&
            arrTeacherId.length > 0 &&
            arrTeacherId.map((item, index) => {
              return (
                <div className="each-teacher" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-teacher">
                      <ProfileTeacher
                        teacherId={item}
                        isShowDescriptionTeacher={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                        //  dataTime={dataTime}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="teacher-schedule">
                      <TeacherSchedule detailIdFromParent={item} />
                    </div>
                    <div className="teacher-extra-infor">
                      <TeacherExtraInfor detailIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailTeachingCenter);
