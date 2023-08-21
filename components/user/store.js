import User from "./model.js";

export async function getUser(userId) {
  let filter = {
    active: true,
  };
  if (userId !== null) {
    filter._id = userId;
  }
  try {
    const list = await User.findOne(filter).select(
      "name lastname photo phone date email"
    );

    if (list) {
      return {
        status: 200,
        message: list,
      };
    } else {
      return {
        status: 400,
        message: "User not found",
      };
    }
  } catch (e) {
    console.log("getUser Store", e);
    return {
      status: 500,
      message: "Unexpected error",
      detail: e,
    };
  }
}

export async function getUsers() {
  let filter = {
    active: true,
  };
  try {
    const list = await User.find(filter).select(
      "name lastname photo phone active date email"
    );
    return {
      status: 200,
      message: list,
    };
  } catch (e) {
    return {
      status: 500,
      message: "Unexpected error",
      detail: e,
    };
  }
}

export async function addUser(user) {
  try {
    const myUser = new User(user);
    await myUser.save();
    const { _id, name, lastname, photo, email, date } = myUser;
    const token = await myUser.generateAuthToken();
    user = { _id, name, lastname, photo, email, date, token };
    return { status: 201, message: user };
  } catch (e) {
    return {
      status: 500,
      message: "User registration error",
      detail: e,
    };
  }
}

export async function updateUser(user) {
  try {
    const foundUser = await User.findOne({
      _id: user.id,
    });
    if (user.name) {
      foundUser.name = user.name;
    }
    if (user.lastname) {
      foundUser.lastname = user.lastname;
    }
    if (user.photo) {
      foundUser.photo = user.photo;
    }
    if (user.phone) {
      foundUser.phone = user.phone;
    }
    if (user.password) {
      foundUser.password = user.password;
    }

    await foundUser.save();
    const { _id, name, lastname, photo, email, date, active } = foundUser;
    user = { _id, name, lastname, photo, email, date, active };
    return { status: 200, message: user };
  } catch (e) {
    return {
      status: 500,
      message: "Unexpected store error",
      detail: e,
    };
  }
}

export async function deleteUser(id) {
  const foundUser = await User.findOne({
    _id: id,
  });
  foundUser.active = false;
  foundUser.save();

  return { status: 200, message: "User deleted" };
}

export async function loginUser(mail, pass) {
  try {
    const user = await User.findByCredentials(mail, pass);
    const { _id, name, lastname, photo, email, date } = user;
    const token = await user.generateAuthToken();
    const response = { _id, name, lastname, photo, email, date, token };
    return { status: 200, message: response };
  } catch (error) {
    console.log("ERROR STORE LOGIN", error);
    return { status: 401, message: "User or password incorrect" };
  }
}

export async function logoutUser(id, tokenUser) {
  const foundUser = await User.findOne({
    _id: id,
  });
  foundUser.tokens = foundUser.tokens.filter((token) => {
    return token.token != tokenUser;
  });
  await foundUser.save();
}

export async function logoutAll(id) {
  const foundUser = await User.findOne({
    _id: id,
  });
  foundUser.tokens.splice(0, foundUser.tokens.length);
  await foundUser.save();
}

export async function changePassword(user, newPass) {
  try {
    const foundUser = await User.findOne({
      email: user.email,
      active: true,
    });
    foundUser.password = newPass;
    foundUser.save();
    return {
      status: 200,
      message: "Password changed successfully",
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected error",
      detail: e,
    };
  }
}
