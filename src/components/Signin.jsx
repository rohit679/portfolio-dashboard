import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    // marginLeft: '0',
  },
  heading : {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0),
  }
}));

export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const [inputData, setInputData] = useState({email : "", password : ""});
  const signinFailed = () => toast.error("OOPS, Wrong Credentials !");
  
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("data : ",inputData);
    axios.post("https://rohit-prasad-portfolio.herokuapp.com/auth/admin-login",inputData)
    .then((res)=>{
      console.log("successful");
      console.log(res);
      if(res.status === 200){
        console.log('inside redirect')
        history.push({pathname:"/banner", state:{}})
      }
    })
    .catch((err)=>{
      signinFailed();
      console.log(err);
    })
  };

  const saveInput = (e) => {
    console.log(e.target.name);
    setInputData({...inputData, [e.target.name]: e.target.value});
  };

  return (
    <Container component="main" maxWidth="xs">
       <ToastContainer />
      <CssBaseline />
      <div className={classes.paper}>
      {/* <img className={classes.logo} src={LogoImg} alt="company logo"/> */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.heading} component="h3" variant="h6">
          Admin Account
        </Typography>
        <form className={classes.form} onSubmit={e=> onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            value={inputData.email}
            onChange={e => saveInput(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={inputData.password}
            onChange={e => saveInput(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}