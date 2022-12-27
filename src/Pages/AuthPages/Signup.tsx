import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  emailValidator,
  passwordCheck,
  userNameValidator,
} from "../../helpers/validators";
import { checkUsername } from "../../helpers/apiHelpers/userApi";
import { useAuth } from "../../Context/AuthContext";

export default function SignUp() {
  const { loading, signup } = useAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataObj = {
      email: email,
      password: password,
      username: username,
      confirmPassword: confirmPassword,
    };
    signup(
      dataObj.username,
      dataObj.password,
      dataObj.email,
      dataObj.confirmPassword
    );
  };

  const [showpassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  React.useEffect(() => {}, [username]);

  const checkUnique = React.useCallback(async () => {
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
      console.log("Username must be at least 3 characters long");
      return;
    } else if (!userNameValidator(username)) {
      setUsernameError(
        "Username must start with alphanumeric character or '_' and can only contain alphanumeric characters, '_', '.', and end with alphanumeric character or '_'"
      );
      console.log(
        "Username must start with alphanumeric character or '_' and can only contain alphanumeric characters, '_', '.', and end with alphanumeric character or '_'"
      );
      return;
    } else {
      setUsernameError("");
      const { response, error } = await checkUsername(username);
      if (response) {
        if (!response.data.valid) {
          setUsernameError("Username already exists");
          console.log("Username already exists", response.data);
        } else {
          setUsernameError("");
        }
      } else if (error) {
        console.log(error);
      }
    }
  }, [username]);

  const emailCheck = React.useCallback(() => {
    console.log("email check");
    if (email.length === 0) {
      setEmailError("Email cannot be empty");
      return;
    } else if (!emailValidator(email)) {
      setEmailError("Invalid email");
      return;
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    emailCheck();
  }, [emailCheck, email]);

  React.useEffect(() => {
    checkUnique();
  }, [checkUnique, username]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        width: "80%",
        margin: "auto",
        padding: "20px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
        maxWidth="30%"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h3
            style={{
              color: "white",
            }}
          >
            Sign Up
          </h3>
        </div>
        {/* Input should be visible in darkmode with white border */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          error={username.length < 3 || usernameError.length > 0}
          onChange={(e) => {
            const text = e.target.value.trim();
            setUsername(text);
          }}
          InputProps={{
            style: {
              color: "white",
              // border: "px solid white",
              backgroundColor: "#1e1e1e",
            },
          }}
          InputLabelProps={{
            style: {
              color: "white",
            },
          }}
        />
        {usernameError.length > 0 && (
          <div style={{ color: "red" }}>{usernameError}</div>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          error={emailError.length > 0}
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => {
            const text = e.target.value.trim();
            setEmail(text);
          }}
          InputProps={{
            style: {
              color: "white",
              // border: "px solid white",
              backgroundColor: "#1e1e1e",
            },
          }}
          InputLabelProps={{
            style: {
              color: "white",
            },
          }}
        />
        {emailError.length > 0 && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
        <CssBaseline />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          autoComplete="password"
          type={showpassword ? "text" : "password"}
          onChange={(e) => {
            setPassword(e.target.value);
            passwordCheck(e.target.value, setPasswordError);
          }}
          autoFocus
          InputProps={{
            style: {
              color: "white",
              // border: "px solid white",
              backgroundColor: "#1e1e1e",
            },
            endAdornment: (
              <InputAdornment
                position="end"
                style={{
                  color: "white",
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                  onClick={() => setShowPassword(!showpassword)}
                >
                  {showpassword ? (
                    <Visibility
                      style={{
                        color: "white",
                      }}
                    />
                  ) : (
                    <VisibilityOff
                      style={{
                        color: "white",
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: {
              color: "white",
            },
          }}
        />
        {passwordError.length > 0 && (
          <div style={{ color: "red" }}>{passwordError}</div>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          autoComplete="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          autoFocus
          InputProps={{
            style: {
              color: "white",
              // border: "px solid white",
              backgroundColor: "#1e1e1e",
            },
            endAdornment: (
              <InputAdornment
                position="end"
                style={{
                  color: "white",
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Visibility
                      style={{
                        color: "white",
                      }}
                    />
                  ) : (
                    <VisibilityOff
                      style={{
                        color: "white",
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: {
              color: "white",
            },
          }}
        />
        {password !== confirmPassword && (
          <div style={{ color: "red" }}>Passwords do not match</div>
        )}
        <Typography
          style={{
            color: "white",
          }}
          align="right"
        >
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            to="/forgotpassword"
          >
            Forgot password?
          </Link>
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress color="inherit" size={20} /> : "Sign Up"}
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link
              style={{
                color: "white",
                textDecoration: "none",
              }}
              to="/"
              // href="#"
            >
              {"Don't have an account?"}{" "}
              <span
                style={{
                  color: "#1FAEC7",
                }}
              >
                Sign In
              </span>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
