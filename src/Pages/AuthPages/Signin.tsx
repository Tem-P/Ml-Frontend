import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../helpers/apiHelpers/userApi";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      Your Website
      {/* </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    const { response, error } = await login(data);
    if (error) {
      console.log(error);
    }
    if (response) {
      console.log(response.data);
    }
  };

  const [showpassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const checkUsername = async () => {};

  React.useEffect(() => {}, [username]);

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
            Sign In
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
          Sign In
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link
              style={{
                color: "white",
                textDecoration: "none",
              }}
              // href="#"
              to="/signup"
            >
              {"Don't have an account?"}{" "}
              <span
                style={{
                  color: "#1FAEC7",
                }}
              >
                Sign Up
              </span>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
