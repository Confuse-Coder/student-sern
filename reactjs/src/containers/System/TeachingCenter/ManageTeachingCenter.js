import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageTeachingCenter.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewTeachingCenter } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageTeachingCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewTeachingCenter = async () => {
    let res = await createNewTeachingCenter(this.state);
    if (res && res.errCode === 0) {
      toast.success('Add new TeachingCenter succeed!');
      this.setState({
        name: '',
        imageBase64: '',
        address: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
      });
    } else {
      toast.error('Add new TeachingCenter failed!');
    }
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id="teaching-center.manage-teaching-center.title" />
        </div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>
              {' '}
              <FormattedMessage id="teaching-center.manage-teaching-center.name-center" />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, 'name')}
            />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="teaching-center.manage-teaching-center.img-center" />
            </label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="teaching-center.manage-teaching-center.address-center" />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, 'address')}
            />
          </div>

          <div className="col-12">
            <MdEditor
              style={{ height: '300px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewTeachingCenter()}
            >
              <FormattedMessage id="teaching-center.manage-teaching-center.save" />
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeachingCenter);
