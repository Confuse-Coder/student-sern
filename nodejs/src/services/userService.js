import db from '../models/index';
import bcrypt from 'bcrypt';

var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user allready exist
        let user = await db.User.findOne({
          attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
          where: { email: email },
          raw: true,
        });
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password); // false
          if (check) {
            userData.errCode = 0;
            userData.errMessage = 'ok';

            delete user.password;

            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = 'Wrong password';
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found!`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in your system. Please try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = '';
      if (userId === 'ALL') {
        users = await db.User.findAll({
          attributes: {
            exclude: ['password'],
          },
        });
      }
      if (userId && userId !== 'ALL') {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ['password'],
          },
        });
      }
      resolve(users);
      console.log(users);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ['id', 'firstName', 'lastName', 'email', 'address'],
      order: [['createdAt', 'DESC']],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    return {
      EM: 'OK!',
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: 'something wrong with service!',
      EC: 1,
      DT: [],
    };
  }
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email exist
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          errMessage: 'Your email is already in used, Pls try another email!',
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
        });

        resolve({
          errCode: 0,
          message: 'OK',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: `The user isn't exist!`,
      });
    }

    await db.User.destroy({
      where: { id: userId },
    });

    resolve({
      errCode: 0,
      errMessage: `The user is delete!`,
    });
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.firstName || !data.lastName || !data.address) {
        resolve({
          errCode: 2,
          errMessage: 'Missing required parameters!',
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.id = data.id;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        if (data.avatar) {
        }
        // user.image = data.avatar;
        await user.save();

        resolve({
          errCode: 0,
          errMessage: 'Update User Succeed!',
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `User's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin,
  getUserWithPagination,
  createNewUser,
  deleteUser,
  updateUserData,
  getAllUsers,
};
