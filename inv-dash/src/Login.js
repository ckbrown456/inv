import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <a color="inherit" href="https://mui.com/">
        Hypernova Technologies
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = createTheme();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  return (
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
              <img src={"https://media-exp1.licdn.com/dms/image/C4E0BAQEmz3J7Fvf4EQ/company-logo_200_200/0/1632859355307?e=2159024400&v=beta&t=GPH4RzPA-wDklp5eRyBMHBkminbhLRy_4sQO0pYW78o"} />
           
            <Typography component="h1" variant="h5">
              Investor Portal - Sign in
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}             
                label="Email Address"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{backgroundColor: 'white', color: 'black'}}
                sx={{ mt: 3, mb: 2 }}
                onClick={() => logInWithEmailAndPassword(email, password)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
              <Link to="/reset">Forgot Password?</Link>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
         {/* <div>
           Don't have an account? <Link to="/register">Register</Link> now.
         </div>
         <div>
          <Link to="/reset">Forgot Password</Link>
         </div> */}
      </Grid>
    </ThemeProvider>
    // </div>
  );
}

export default Login;
