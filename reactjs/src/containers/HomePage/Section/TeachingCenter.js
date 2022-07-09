import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TeachingCenter.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllTeachingCenter } from '../../../services/userService';
import { withRouter } from 'react-router';

class TeachingCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTeachingCenters: [],
    };
  }

  async componentDidMount() {
    let res = await getAllTeachingCenter();
    if (res && res.errCode === 0) {
      this.setState({
        dataTeachingCenters: res.data ? res.data : [],
      });
    }
    console.log('check res', res);
  }

  handleViewDetailTeachingCenter = (teachingCenter) => {
    if (this.props.history) {
      this.props.history.push(`/detail-teaching-center/${teachingCenter.id}`);
    }
  };

  render() {
    let { dataTeachingCenters } = this.state;
    return (
      <div className="section-share section-teaching-center">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.out-standing-teaching-center" />
            </span>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataTeachingCenters &&
                dataTeachingCenters.length > 0 &&
                dataTeachingCenters.map((item, index) => {
                  return (
                    <div
                      className="section-customize teaching-center-child"
                      key={index}
                      onClick={() => this.handleViewDetailTeachingCenter(item)}
                    >
                      <div
                        className="bg-img section-teaching-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="teaching-center-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeachingCenter));
