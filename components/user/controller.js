import {
  getUsers as _getUsers,
  getUser as _getUser,
  addUser as _addUser,
  updateUser as update,
  deleteUser as _deleteUser,
  loginUser as login,
  logoutUser as logout,
  logoutAll as _logoutAll,
  changePassword as _changePassword,
} from "./store.js";

export async function getUsers(filterUsers) {
  try {
    const result = await _getUsers(filterUsers);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected error",
      detail: e,
    };
  }
}

export async function getUser(id) {
  try {
    if (!id) {
      return {
        status: 400,
        message: "User ID is required",
      };
    }
    const result = await _getUser(id);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function addUser(user) {
  try {
    const fullUser = await _addUser(user);
    return fullUser;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function updateUser(user) {
  try {
    console.log(user);
    if (!user.id) {
      return {
        status: 400,
        message: "No user ID recived",
      };
    }
    const result = await update(user);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function deleteUser(id) {
  try {
    const result = await _deleteUser(id);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function loginUser(user) {
  try {
    const { email, password } = user;
    const result = await login(email, password);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function logoutUser(id, token) {
  try {
    const result = await logout(id, token);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function logoutAll(id) {
  try {
    const result = await _logoutAll(id);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function changePassword(user, newPass) {
  try {
    if (!user || !newPass) {
      return {
        status: 400,
        message: "User or Password not recived",
      };
    }
    return _changePassword(user, newPass);
  } catch (e) {
    return {
      status: 500,
      message: "Unexpected error",
      detail: e,
    };
  }
}
