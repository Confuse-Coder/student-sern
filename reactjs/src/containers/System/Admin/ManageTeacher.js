import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageTeacher.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoTeacher } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentMarkdown: '',
      contentHTML: '',
      selectedOption: '',
      description: '',
      listTeachers: [],
      hasOldData: false,

      //save to teacher infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listTeachingCenter: [],
      listSpecialty: [],

      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      selectedTeachingCenter: '',
      selectedSpecialty: '',

      nameTeachingCenter: '',
      addressTeachingCenter: '',
      note: '',
      teachingCenterId: '',
      specialtyId: '',
    };
  }

  componentDidMount() {
    this.props.fetchAllTeachers();
    this.props.getAllRequiredTeacherInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === 'USERS') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === 'PRICE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVI} VNĐ`;
          let labelEn = `${item.valueEN} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === 'PAYMENT' || type === 'PROVINCE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVI}`;
          let labelEn = `${item.valueEN}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === 'SPECIALTY') {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === 'TEACHING_CENTER') {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allTeachers !== this.props.allTeachers) {
      let dataSelect = this.buildDataInputSelect(this.props.allTeachers, 'USERS');
      this.setState({
        listTeachers: dataSelect,
      });
    }

    if (prevProps.allRequiredTeacherInfor !== this.props.allRequiredTeacherInfor) {
      let { resPayment, resPrice, resProvince, resSpecialty, resTeachingCenter } =
        this.props.allRequiredTeacherInfor;
      console.log('check price', this.props.allRequiredTeacherInfor);
      let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
      let dataSelectresSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
      let dataSelectresTeachingCenter = this.buildDataInputSelect(
        resTeachingCenter,
        'TEACHING_CENTER'
      );

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectresSpecialty,
        listTeachingCenter: dataSelectresTeachingCenter,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allTeachers, 'USERS');

      let { resPayment, resPrice, resProvince } = this.props.allRequiredTeacherInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

      this.setState({
        listTeachers: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailTeacher({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      teacherId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameTeachingCenter: this.state.nameTeachingCenter,
      addressTeachingCenter: this.state.addressTeachingCenter,
      note: this.state.note,
      teachingCenterId:
        this.state.selectedTeachingCenter && this.state.selectedTeachingCenter.value
          ? this.state.selectedTeachingCenter.value
          : '',
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listTeachingCenter } = this.state;
    let res = await getDetailInfoTeacher(selectedOption.value);
    console.log('check check res', res);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressTeachingCenter = '',
        nameTeachingCenter = '',
        note = '',
        paymentId = '',
        priceId = '',
        provinceId = '',
        specialtyId = '',
        teachingCenterId = '',
        selectedPrice = '',
        selectedPayment = '',
        selectedProvince = '',
        selectedSpecialty = '',
        selectedTeachingCenter = '';
      if (res.data.Teacher_Infor) {
        addressTeachingCenter = res.data.Teacher_Infor.addressTeachingCenter;
        nameTeachingCenter = res.data.Teacher_Infor.nameTeachingCenter;
        note = res.data.Teacher_Infor.note;

        paymentId = res.data.Teacher_Infor.paymentId;
        priceId = res.data.Teacher_Infor.priceId;
        provinceId = res.data.Teacher_Infor.provinceId;
        specialtyId = res.data.Teacher_Infor.specialtyId;
        teachingCenterId = res.data.Teacher_Infor.teachingCenterId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedTeachingCenter = listTeachingCenter.find((item) => {
          return item && item.value === teachingCenterId;
        });
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressTeachingCenter: addressTeachingCenter,
        nameTeachingCenter: nameTeachingCenter,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedTeachingCenter: selectedTeachingCenter,
      });
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasOldData: false,
        addressTeachingCenter: '',
        nameTeachingCenter: '',
        note: '',
        selectedPayment: '',
        selectedPrice: '',
        selectedProvince: '',
        selectedSpecialty: '',
        selectedTeachingCenter: '',
      });
    }
  };

  handleChangeSelectTeacherInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;

    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { hasOldData, listSpecialty } = this.state;
    return (
      <div className="manage-teacher-container">
        <div className="manage-teacher-title">
          <FormattedMessage id="admin.manage-teacher.title" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.select-teacher" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listTeachers}
              placeholder={<FormattedMessage id="admin.manage-teacher.select-teacher" />}
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-teacher.intro" />
            </label>
            <textarea
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'description')}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectTeacherInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-teacher.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectTeacherInfor}
              options={this.state.listPayment}
              placeholder={<FormattedMessage id="admin.manage-teacher.payment" />}
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectTeacherInfor}
              options={this.state.listProvince}
              placeholder={<FormattedMessage id="admin.manage-teacher.province" />}
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.nameTeachingCenter" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'nameTeachingCenter')}
              value={this.state.nameTeachingCenter}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.addressTeachingCenter" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'addressTeachingCenter')}
              value={this.state.addressTeachingCenter}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'note')}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.specialty" />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              options={this.state.listSpecialty}
              placeholder={<FormattedMessage id="admin.manage-teacher.specialty" />}
              onChange={this.handleChangeSelectTeacherInfor}
              name="selectedSpecialty"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              {' '}
              <FormattedMessage id="admin.manage-teacher.select-teachingCenter" />
            </label>
            <Select
              value={this.state.selectedTeachingCenter}
              options={this.state.listTeachingCenter}
              placeholder={<FormattedMessage id="admin.manage-teacher.select-teachingCenter" />}
              onChange={this.handleChangeSelectTeacherInfor}
              name="selectedTeachingCenter"
            />
          </div>
        </div>
        <div className="manage-teacher-editor">
          <MdEditor
            style={{ height: '300px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={hasOldData === true ? 'save-content-teacher' : 'create-content-teacher'}
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-teacher.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-teacher.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allTeachers: state.admin.allTeachers,
    allRequiredTeacherInfor: state.admin.allRequiredTeacherInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTeachers: () => dispatch(actions.fetchAllTeachers()),
    getAllRequiredTeacherInfor: () => dispatch(actions.getRequiredTeacherInfor()),
    saveDetailTeacher: (data) => dispatch(actions.saveDetailTeacher(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
