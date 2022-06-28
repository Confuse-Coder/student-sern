import React, { Component, Fragment } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
  fetchAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from '../../services/userService';
import ReactPaginate from 'react-paginate';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      currentPage: 1,
      totalPages: 0,
      currentLimit: 5,
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.fetchUsers();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
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
          arrUsers: response.DT.users,
        });
      }
    }
  };

  handlePageClick = (event) => {
    this.setState({
      currentPage: +event.selected + 1,
    });
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.fetchUsers();
        this.setState({
          isOpenModalUser: false,
        });

        emitter.emit('EVENT_CLEAR_MODAL_DATA');
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
        console.log(response.errMessage);
      } else {
        await this.fetchUsers();
        this.setState({
          isOpenModalUser: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    console.log('check edit user: ', user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      console.log('>check res', res);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.fetchUsers();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let { totalPages, currentPage, arrUsers } = this.state;
    console.log('check ', arrUsers);
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          createNewUser={this.createNewUser}
          toggleFromParent={this.toggleUserModal}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage with Toohuynh</div>
        <div className="mx-1">
          <div className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
            <i className="fas fa-plus-circle px-2"></i>Add New User
          </div>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrUsers && arrUsers.length > 0 ? (
                <>
                  {arrUsers.map((item, index) => {
                    return (
                      <tr key={`users-index-${index}`}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button className=" btn-edit" onClick={() => this.handleEditUser(item)}>
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            <i className="fas fa-trash-alt "></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>
                      Not found User
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
