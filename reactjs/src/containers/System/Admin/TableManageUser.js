import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import ReactPaginate from 'react-paginate';
import { fetchAllUsers } from '../../../services/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      currentPage: 1,
      totalPages: 0,
      currentLimit: 3,
    };
  }

  async componentDidMount() {
    this.props.fetchUserRedux();
    await this.fetchUsers();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchUsers();
    }
  }

  fetchUsers = async () => {
    let response = await fetchAllUsers(this.state.currentPage, this.state.currentLimit);
    if (response && response.EC === 0) {
      this.setState({
        totalPages: response.DT.totalPages,
      });

      if (response.DT.totalPages > 0 && response.DT.users.length === 0) {
        this.setState({
          currentPage: +response.DT.totalPages,
        });
        await fetchAllUsers(+response.DT.totalPages, this.state.currentLimit);
      }
      if (response.DT.totalPages > 0 && response.DT.users.length > 0) {
        this.setState({
          usersRedux: response.DT.users,
        });
      }
    }
  };

  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  };

  handlePageClick = (event) => {
    this.setState({
      currentPage: +event.selected + 1,
    });
  };

  render() {
    let arrUsers = this.state.usersRedux;
    let { totalPages, currentPage } = this.state;
    return (
      <React.Fragment>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className=" btn-edit" onClick={() => this.handleEditUser(item)}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                        <i className="fas fa-trash-alt "></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {totalPages > 0 && (
          <div className="user-footer">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={this.handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={+currentPage - 1}
            />
          </div>
        )}

        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
