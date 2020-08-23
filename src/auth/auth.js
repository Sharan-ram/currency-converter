import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async ({ name, email, password }) => {
  const users = JSON.parse(localStorage.getItem("users"));
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
  const newUser = { id: userId, name, email, hashedPassword };
  const newUsers = users ? [...users, newUser] : [newUser];
  localStorage.setItem("users", JSON.stringify(newUsers));
  localStorage.setItem("token", token);
  return { token };
};
