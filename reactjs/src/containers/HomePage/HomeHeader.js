import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo-akademy.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';
import { changeLanguageApp } from '../../store/actions';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class HomeHeader extends Component {
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

  loginSystem = () => {
    if (this.props.history) {
      this.props.history.push(`/login`);
    }
  };

  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <img className="header-logo" src={logo} onClick={() => this.returnToHome()} />
            </div>
            <div className="center-content"></div>
            <div className="right-content">
              <div className="child-content">
                <div onClick={() => this.loginSystem()}>
                  <b>
                    <FormattedMessage id="homeheader.for-instructor" />
                  </b>
                </div>
              </div>

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
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="container">
              <div className="content-left">
                <div className="title1">
                  <FormattedMessage id="banner.title1" />
                </div>
                <div className="title2">
                  <FormattedMessage id="banner.title2" />
                  <a href="#">
                    <FormattedMessage id="banner.title3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
