import axios from 'axios';
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import InfoIcon from '@material-ui/icons/Info';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SchoolIcon from '@material-ui/icons/School';
import PetsIcon from '@material-ui/icons/Pets';
import TelegramIcon from '@material-ui/icons/Telegram';
import ContactsIcon from '@material-ui/icons/Contacts';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { NavLink } from 'react-router-dom';
import Main from './Main';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  NavLink: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  mainHeading: {
    alignItems : 'center',
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios({
      url : 'http://localhost:8000/content/get-data',
      method : 'get'
  }).then((e) => {
      setData(e.data);
  });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Personal Portfolio
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <NavLink to='/banner' exact className={classes.NavLink}>
              <ListItem>
                <ListItemIcon><ImportContactsIcon/></ListItemIcon>
                <ListItemText primary="Banner" />
              </ListItem>
            </NavLink>
            <NavLink to='/about' exact className={classes.NavLink}>
              <ListItem>
                <ListItemIcon><InfoIcon/></ListItemIcon>
                <ListItemText primary="About Me" />
              </ListItem>
            </NavLink>
            <NavLink to='/skills' exact className={classes.NavLink}>
              <ListItem>
                <ListItemIcon><StarHalfIcon/></ListItemIcon>
                <ListItemText primary="Skills" />
              </ListItem>
            </NavLink>
            <NavLink to='/experience' exact className={classes.NavLink}>
              <ListItem>
                <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                <ListItemText primary="Experience" />
              </ListItem>
            </NavLink>
            <NavLink to='/education' exact className={classes.NavLink}>
              <ListItem>
                <ListItemIcon><SchoolIcon/></ListItemIcon>
                <ListItemText primary="Education" />
              </ListItem>
            </NavLink>
            <NavLink to='/project' exact className={classes.NavLink}>
              <ListItem>
                <ListItemIcon><PetsIcon/></ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItem>
            </NavLink>
            <NavLink to='/achievement' exact className={classes.NavLink}>
              <ListItem>
                <ListItemIcon><TelegramIcon/></ListItemIcon>
                <ListItemText primary="Achievements" />
              </ListItem>
            </NavLink>
            <NavLink to='/contact' exact className={classes.NavLink}>
              <ListItem>
                <ListItemIcon><ContactsIcon/></ListItemIcon>
                <ListItemText primary="Contact Me" />
              </ListItem>
            </NavLink>
        </List>
        <Divider />
        <List>
            <NavLink to='/logout' exact className={classes.NavLink}>
              <ListItem>
                <ListItemIcon><FingerprintIcon/></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </NavLink>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {data ? <Main division="skill" allData={data} heading="SKILLS"/> : null}
      </main>
    </div>
  );
}
