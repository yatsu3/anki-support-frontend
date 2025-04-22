import React, { Fragment, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate()

  const Login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Fragment>
      <Container>
        <Grid container>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <h2>ログイン</h2>
            <Box component="form">
              <TextField
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name="email"
                label="E-mail"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeEmail(event);
                }}
              />
              <TextField
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                id="outlined-password-input"
                type="password"
                autoComplete="current-password"
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangePassword(event);
                }}
              />
              <Button
                fullWidth
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                onClick={Login}
              >
                ログイン
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );

};

export default Auth;