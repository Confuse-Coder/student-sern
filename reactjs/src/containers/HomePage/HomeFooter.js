import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { LANGUAGES } from '../../utils';
import * as actions from '../../store/actions';

class HomeFooter extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    const { language } = this.props;

    return (
      <div className="home-footer">
        <div className="social">
          <div className="d-flex justify-content-end">
            <div className="social-text">
              <p className="p-0 m-0">
                <FormattedMessage id="footer.social" />
              </p>
            </div>
            <div className="social-logo">
              <img
                className="px-4"
                src={
                  'https://about.udemy.com/wp-content/themes/wp-about-v4/assets/images/in_icon.svg'
                }
                alt=""
              />
              <img
                className="px-4"
                src={
                  'https://about.udemy.com/wp-content/themes/wp-about-v4/assets/images/fb_icon.svg'
                }
                alt=""
              />
              <img
                className="px-4"
                src={
                  'https://about.udemy.com/wp-content/themes/wp-about-v4/assets/images/insta_icon.svg'
                }
                alt=""
              />
              <img
                className="px-4"
                src={
                  'https://about.udemy.com/wp-content/themes/wp-about-v4/assets/images/twitter_icon.svg'
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="footer-container">
          <div className="row">
            <div className="col-md-2 footer-menu-col">
              <ul className="footer-menu-col__one ">
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.one.1" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.one.2" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.one.3" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.one.4" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.one.5" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 footer-menu-col">
              <ul className="footer-menu-col__one ">
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.second.1" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.second.2" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.second.3" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.second.4" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.second.5" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 footer-menu-col">
              <ul className="footer-menu-col__one ">
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.third.1" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.third.2" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.third.3" />
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <FormattedMessage id="footer.menu-col.third.4" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 footer-menu-col"></div>
            <div className="col-md-2 footer-menu-col"></div>
            <div className="col-md-2 footer-menu-col">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle style={{ backgroundColor: '#07bfff', padding: '0 10px' }} caret>
                  <img
                    src={
                      'https://about.udemy.com/wp-content/themes/wp-about-v4/assets/images/footer-menu-globe.svg'
                    }
                    alt=""
                  />{' '}
                  <FormattedMessage id="footer.language" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                    English
                  </DropdownItem>
                  <DropdownItem onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                    VietNamese
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
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
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
