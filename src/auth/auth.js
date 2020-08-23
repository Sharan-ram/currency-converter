import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = JSON.parse(localStorage.getItem("users"));

export const registerUser = async ({ name, email, password }) => {
  const doesUserExist = users?.find((user) => user.email === email);
  if (doesUserExist) {
    return { error: "User already exists" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userId = users ? users.length + 1 : 1;

  const payload = {
    user: {
      id: userId,
    },
  };

  const token = jwt.sign(payload, "secret");
  const newUser = { id: userId, name, email, password: hashedPassword };
  const newUsers = users ? [...users, newUser] : [newUser];
  localStorage.setItem("users", JSON.stringify(newUsers));
  localStorage.setItem("token", token);
  return { token };
};

export const loginUser = async ({ email, password }) => {
  const user = users?.find((user) => user.email === email);
  if (!user) {
    return { error: "Email doesnt not exist" };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return { error: "Invalid Credentials" };
  }
  const payload = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(payload, "secret");
  localStorage.setItem("token", token);
  return { token };
};

export const resetPassword = async ({ email, password }) => {
  const user = users?.find((user) => user.email === email);
  if (!user) {
    return { error: "Email doesnt not exist" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const payload = {
    user: {
      id: user.id,
    },
  };

  const userWithNewPassword = { ...user, password: hashedPassword };
  const newUsers = [
    ...users.slice(0, user.id - 1),
    userWithNewPassword,
    ...users.slice(user.id),
  ];
  const token = jwt.sign(payload, "secret");
  localStorage.setItem("users", JSON.stringify(newUsers));
  localStorage.setItem("token", token);
  return { token };
};
