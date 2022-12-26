const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userNameRegex = /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/;

const specialRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export const emailValidator = (email: string) => {
  return emailRegex.test(email);
};

export const userNameValidator = (username: string) => {
  return userNameRegex.test(username);
};

/**
 * Function to check if password is valid or not
 * @param {String} value
 * @param {Function} setError
 */
export const passwordCheck = (value: string, setError: any) => {
  if (value.length < 8) {
    setError("Password must have 8 letters");
  }
  if (!/[A-Z]/.test(value)) {
    setError("Password must have an uppercase letter");
  }
  if (!/[a-z]/.test(value)) {
    setError("Password must have a lowercase letter");
  }
  if (!/\d/.test(value)) {
    setError("Password must contain a number");
  }
  if (!specialRegex.test(value)) {
    //setPasswordSpecial(true);
    setError("Password must contain a special character");
  }
  if (
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /\d/.test(value) &&
    specialRegex.test(value) &&
    value.length > 7
  ) {
    setError({
      type: "",
      msg: "",
    });
  } else {
    setError(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and at least 8 letters"
    );
  }
};
