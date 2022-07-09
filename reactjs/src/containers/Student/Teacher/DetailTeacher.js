import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailTeacher.scss';
import { getDetailInfoTeacher } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import TeacherSchedule from './TeacherSchedule';
import TeacherExtraInfor from './TeacherExtraInfor';

class DetailTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailTeacher: {},
      curentTeacherId: -1,
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        curentTeacherId: id,
      });
      let res = await getDetailInfoTeacher(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailTeacher: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { language } = this.props;
    let { detailTeacher, curentTeacherId } = this.state;
    console.log('check curentTeacherId', curentTeacherId);
    let nameVi = '',
      nameEn = '';
    if (detailTeacher && detailTeacher.positionData) {
      nameVi = `${detailTeacher.positionData.valueVi},  ${detailTeacher.lastName} ${detailTeacher.firstName}`;
      nameEn = `${detailTeacher.positionData.valueEn}, ${detailTeacher.firstName} ${detailTeacher.lastName}`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="teacher-detail-container">
          <div className="intro-teacher">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailTeacher && detailTeacher.image ? detailTeacher.image : ''
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
              </div>
              <div className="down">
                {detailTeacher && detailTeacher.Markdown && detailTeacher.Markdown.description && (
                  <span>{detailTeacher.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>

          <div className="schedule-teacher">
            <div className="content-left">
              <TeacherSchedule detailIdFromParent={this.state.curentTeacherId} />
            </div>
            <div className="content-right">
              <TeacherExtraInfor detailIdFromParent={this.state.curentTeacherId} />
            </div>
          </div>

          <div className="detail-infor-teacher">
            {detailTeacher && detailTeacher.Markdown && detailTeacher.Markdown.contentHTML && (
              <div dangerouslySetInnerHTML={{ __html: detailTeacher.Markdown.contentHTML }}></div>
            )}
          </div>

          <div className="comment-teacher"></div>
          <HomeFooter />
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailTeacher);
