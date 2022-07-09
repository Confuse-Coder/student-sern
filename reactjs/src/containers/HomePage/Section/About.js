import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './About.scss';
import logo1 from '../../../assets/images/home page/brands/Aflac_logo1.png';
import logo2 from '../../../assets/images/home page/brands/box_logo.png';
import logo3 from '../../../assets/images/home page/brands/Nordea.png';
import logo4 from '../../../assets/images/home page/brands/SurveyMonkey-logo-grey.png';
import logo5 from '../../../assets/images/home page/brands/Tata_logo.png';
import logo6 from '../../../assets/images/home page/brands/VW-logo-grey.png';
import logo7 from '../../../assets/images/home page/brands/eventbrite-logo-grey.png';
import logo8 from '../../../assets/images/home page/brands/gofundme.png';
import logo9 from '../../../assets/images/home page/brands/Kaiser-logo-grey.png';

class About extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about p-0 container">
          <div className="section-about-banner row">
            <div className="banner-title col-md-6">
              <h2>
                <FormattedMessage id="about.banner-title" />
              </h2>
            </div>
            <div className="banner-img col-md-6"></div>
          </div>
          <div className="section-about-content">
            <div className="content-left"></div>
            <div className="content-right"></div>
          </div>
        </div>
        <div className="company-news">
          <div className="news-content">
            <a href="#">
              <p className="p-0 m-0">
                <span>
                  <FormattedMessage id="about.company-new.line-1" />
                </span>
                <FormattedMessage id="about.company-new.line-2" />
                <i className="fas fa-chevron-right"></i>
              </p>
            </a>
          </div>
        </div>
        <div className="testimonial container mb-5">
          <div className="testimonial__title row">
            <p className="p-0 m-0 col-md-12">
              <FormattedMessage id="about.testimonial.title.content" />
            </p>
            <div className="col-md-12 d-flex justify-content-center mt-3">
              <button className="testimonial__btn">
                <FormattedMessage id="about.testimonial.title.button" />
              </button>
            </div>
          </div>
          <div className="testimonial__content mt-3">
            <div className="row">
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-12 p-0 quotes-sign">
                    <i className="fas fa-quote-left"></i>
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <div className="col-md-12 p-0 quotes-content">
                    <p className="p-0 m-0">
                      <FormattedMessage id="about.testimonial.content.line-1" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-12 p-0 quotes-sign">
                    <i className="fas fa-quote-left"></i>
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <div className="col-md-12 p-0 quotes-content">
                    <p className="p-0 m-0">
                      <FormattedMessage id="about.testimonial.content.line-2" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-12 p-0 quotes-sign">
                    <i className="fas fa-quote-left"></i>
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <div className="col-md-12 p-0 quotes-content">
                    <p className="p-0 m-0">
                      <FormattedMessage id="about.testimonial.content.line-3" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-4">
                <div className="testimonial__author row">
                  <div className="col-md-12 p-0 testimonial__author_name">
                    <p className="p-0 m-0">
                      <FormattedMessage id="about.testimonial.author.one.name" />
                    </p>
                  </div>
                  <div className="col-md-12 p-0 testimonial__author_position">
                    <p className="p-0 m-0">
                      <FormattedMessage id="about.testimonial.author.one.position" />
                    </p>
                  </div>
                  <div className="col-md-12 p-0 testimonial__author_link">
                    <a href="#">
                      <p className="p-0 m-0 ">
                        <FormattedMessage id="about.testimonial.author.one.link" />{' '}
                        <i className="fas fa-chevron-right"></i>
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="testimonial__author row">
                  <div className="col-md-12 p-0 testimonial__author_name">
                    <p className="p-0 m-0">
                      <FormattedMessage id="about.testimonial.author.second.name" />
                    </p>
                  </div>
                  <div className="col-md-12 p-0 testimonial__author_position">
                    <p className="p-0 m-0">
                      <FormattedMessage id="about.testimonial.author.second.position" />
                    </p>
                  </div>
                  <div className="col-md-12 p-0 testimonial__author_link">
                    <a href="#">
                      <p className="p-0 m-0 ">
                        <FormattedMessage id="about.testimonial.author.second.link" />{' '}
                        <i className="fas fa-chevron-right"></i>
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="testimonial__author row">
                  <div className="col-md-12 p-0 testimonial__author_name">
                    <p className="p-0 m-0">
                      <FormattedMessage id="about.testimonial.author.third.name" />
                    </p>
                  </div>
                  <div className="col-md-12 p-0 testimonial__author_position">
                    <p className="p-0 m-0">
                      <FormattedMessage id="about.testimonial.author.third.position" />
                    </p>
                  </div>
                  <div className="col-md-12 p-0 testimonial__author_link">
                    <a href="#">
                      <p className="p-0 m-0 ">
                        <FormattedMessage id="about.testimonial.author.third.link" />{' '}
                        <i className="fas fa-chevron-right"></i>
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="brands p-5">
          <div className="container">
            <div className="row">
              <div className="col-md-2 brand-content">
                <img className="img-fluid" src={logo2} alt="" />
              </div>
              <div className="col-md-2 brand-content">
                <img className="img-fluid" src={logo1} alt="" />
              </div>
              <div className="col-md-2 brand-content">
                <img className="img-fluid" src={logo3} alt="" />
              </div>
              <div className="col-md-2 brand-content">
                <img className="img-fluid" src={logo4} alt="" />
              </div>
              <div className="col-md-2 brand-content">
                <img className="img-fluid" src={logo6} alt="" />
              </div>
              <div className="col-md-2 brand-content">
                <img className="img-fluid" src={logo5} alt="" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 brand-content">
                <img className="img-fluid" src={logo8} alt="" />
              </div>
              <div className="col-md-4 brand-content">
                <img className="img-fluid" src={logo7} alt="" />
              </div>
              <div className="col-md-4 brand-content">
                <img className="img-fluid" src={logo9} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="reach p-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 reach__title">
                <p className="p-0 text-center">
                  <FormattedMessage id="about.testimonial.reach.title.title" />
                </p>
              </div>
              <div className="col-md-12 reach__sub-title">
                <p className="p-0 text-center">
                  <FormattedMessage id="about.testimonial.reach.title.sub-title" />
                </p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-3 reach__specifition">
                <p className="p-0 m-0 number text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.1.number" />
                </p>
                <p className="p-0 m-0 text text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.1.text" />
                </p>
              </div>
              <div className="col-md-3 reach__specifition">
                <p className="p-0 m-0 number text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.2.number" />
                </p>
                <p className="p-0 m-0 text text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.2.text" />
                </p>
              </div>
              <div className="col-md-3 reach__specifition">
                <p className="p-0 m-0 number text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.3.number" />
                </p>
                <p className="p-0 m-0 text text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.3.text" />
                </p>
              </div>
              <div className="col-md-3 reach__specifition">
                <p className="p-0 m-0 number text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.4.number" />
                </p>
                <p className="p-0 m-0 text text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.4.text" />
                </p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6 reach__specifition">
                <p className="p-0 m-0 number text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.5.number" />
                </p>
                <p className="p-0 m-0 text text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.5.text" />
                </p>
              </div>
              <div className="col-md-6 reach__specifition">
                <p className="p-0 m-0 number text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.6.number" />
                </p>
                <p className="p-0 m-0 text text-center">
                  <FormattedMessage id="about.testimonial.reach.specifition.6.text" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
