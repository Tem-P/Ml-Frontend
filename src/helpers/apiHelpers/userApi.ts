import axios from "axios";

type Response = {
  response: any;
  error: any;
};

export const checkUsername = async (username: string): Promise<Response> => {
  try {
    const res = await axios.get(`/user/checkusername?username=${username}`);
    if (res.status === 200) {
      return { response: res, error: null };
    } else {
      return { response: null, error: res };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const register = async ({
  username,
  password,
  email,
  confirmPassword,
}: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}): Promise<Response> => {
  try {
    const res = await axios.post("/user/register", {
      username,
      password,
      email,
      cpassword: confirmPassword,
    });
    if (res.status === 200) {
      return { response: res, error: null };
    } else {
      return { response: null, error: res };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<Response> => {
  try {
    const res = await axios.post("/user/login", { username, password });
    if (res.status === 200) {
      return { response: res, error: null };
    } else {
      return { response: null, error: res };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
