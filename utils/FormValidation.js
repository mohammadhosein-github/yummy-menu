const usernamePattern = new RegExp(/^[a-zA-Z0-9._-]+$/);
const emailPattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/);
const phoneNumberPattern = new RegExp(/^\d{10}$/);
const addressPattern = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);

const validUsername = (username) => {
  if (!usernamePattern.test(username)) return { message: "invalid username" };
  if (username.length < 6) return { message: "username is too short" };
  if (username.length > 36) return { message: "username is too long" };

  return null;
};

const validEmail = (email) => {
  if (!emailPattern.test(email)) return { message: "invalid email address" };
  if (email.length < 3) return { message: "email is too short" };
  if (email.length > 254) return { message: "email is too long" };

  return null;
};

const validPassword = (password) => {
  if (password.length < 8) return { message: "password is too short" };
  if (!passwordPattern.test(password))
    return {
      message:
        "weak password, your password should contain at least numbers, lowercase and uppercase characters",
    };

  return null;
};

const validPhoneNumber = (phoneNumber) => {
  if (!phoneNumberPattern.test(phoneNumber))
    return { message: "invalid phone number" };
};

const validAddress = (address) => {
  if (!addressPattern.test(address)) return { message: "invalid address" };
};

const singUpValidation = (formData) => {
  let error = null;

  const inputNames = Object.keys(formData);

  for (const inputName of inputNames) {
    //check if input is empty
    if (!formData[inputName]) {
      error = { message: `${inputName} is required.` };
      if (error) break;
    }

    //Validation for: valid characters for username / min and max number of characters
    if (inputName === "username") {
      error = validUsername(formData["username"]);
      if (error) break;
    }

    //Validation for: valid characters for email / min and max number of characters
    if (inputName === "email") {
      error = validEmail(formData["email"]);
      if (error) break;
    }

    //Validation for: password strength / min number of characters
    if (inputName === "password") {
      error = validPassword(formData["password"]);
      if (error) break;
    }
  }

  return {
    error,
  };
};

const signInValidation = (formData) => {
  let error = null;

  const inputNames = Object.keys(formData);

  for (const inputName of inputNames) {
    //check if input is empty
    if (!formData[inputName]) {
      error = {
        message: `${
          inputName !== "usernameOrEmail" ? inputName : "username or email"
        } is required.`,
      };
      break;
    }

    //Validation for: min and max number of characters
    if (inputName === "usernameOrEmail") {
      if (formData["usernameOrEmail"].length < 3) {
        error = { message: "username or email address is too short" };
        break;
      }

      if (formData["usernameOrEmail"].length > 254) {
        error = { message: "username or email is too long" };
        break;
      }
    }

    //Validation for: password strength / min number of characters
    if (inputName === "password") {
      if (formData["password"].length < 8) {
        error = { message: "invalid username or password" };
        break;
      }

      if (!passwordPattern.test(formData["password"])) {
        error = {
          message: "invalid username or password",
        };
        break;
      }
    }
  }

  return {
    error,
  };
};

export {
  validUsername,
  validEmail,
  validPassword,
  validPhoneNumber,
  validAddress,
  signInValidation,
  singUpValidation,
};
