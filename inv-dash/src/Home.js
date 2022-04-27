import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Drawer from "@mui/material/Drawer";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import PeopleIcon from "@mui/icons-material/People";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import LogoutIcon from "@mui/icons-material/Logout";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Faq from "./components/Faq";
import BuildIcon from "@mui/icons-material/Build";
import LinearProgress from "@mui/material/LinearProgress";
import Manage from "./components/Manage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Test from "./components/Test";
import alanBtn from "@alan-ai/alan-sdk-web";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import History from "./components/History";
import Influx from "./assets/cinflux.png";
import Compare from "./assets/compare.png";
import MarkAuthors from "./components/Markauthors";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TeamMembers from "./assets/team.png";
import SEMS from "./assets/SEMS.png";
import Alert from "@mui/material/Alert";

const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a color="inherit" href="https://hypernovadev.space" target="_BLANK">
        Hypernova Technologies
      </a>{" "}
      {new Date().getFullYear()}. Made with 🖤 .
    </Typography>
  );
}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const backgroundtoGreen = async () => {
  const docRef = doc(db, "bgColors", "secondary");
  const docSnap = await getDoc(docRef);
  await updateDoc(docRef, {
    value: "#00ff00",
  });
  docRef.toString();
  console.log(docSnap.data().value);
};

const backgroundtoBlue = async () => {
  const docRef = doc(db, "bgColor", "secondary");
  const docSnap = await getDoc(docRef);
  await updateDoc(docRef, {
    value: "#0000ff",
  });
  docRef.toString();
  console.log(docSnap.data().value);
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [user, loading, error] = useAuthState(auth);
  const [themec, setThemec] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState("");
  const [lastPayment, setlastPayment] = useState("");
  const [organization, setOrganization] = useState("");
  const [url, setUrl] = useState("#");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setThemec(data.themec);
      setRisk(data.riskFactor);
      setName(data.name);
      setOrganization(data.organization);
      setStatus(data.status);
      setlastPayment(data.lastPayment);
      setUrl(data.url);
      setNotes(data.notes);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const [open1, setOpen1] = React.useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const [scroll, setScroll] = React.useState("paper");
  const handleClose1 = () => setOpen1(false);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    alanBtn({
      key: "API key scratched for interview",
      onCommand: (commandData) => {
        if (commandData.command === "team") {
          document.getElementById("teammodal").click();
        } else if (commandData.command === "backgroundGreen") {
          backgroundtoGreen();
        } else if (commandData.command === "backgroundBlue") {
          backgroundtoBlue();
        }
      },
    });
  }, []);

  const backgroundtoGreen = async () => {
    const docRef = doc(db, "users", "Brc8ONmU03HHDc5ha3vC");
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, {
      navb: "#00ff00",
    });
    docRef.toString();
    console.log(docSnap.data().value);
  };

  const backgroundtoBlue = async () => {
    const docRef = doc(db, "users", "Brc8ONmU03HHDc5ha3vC");
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, {
      navb: "#0000ff",
    });
    docRef.toString();
    console.log(docSnap.data().value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ backgroundColor: "white" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="black">
            Welcome, {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
       
        <Divider />

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Home" icon={<HomeWorkIcon />} {...a11yProps(0)} />
          <Tab label="History" icon={<HomeWorkIcon />} {...a11yProps(1)} />
          <Tab label="Go-to market" icon={<BuildIcon />} {...a11yProps(2)} />
          <Tab label="Funding" icon={<BuildIcon />} {...a11yProps(3)} />
          <Tab label="Next Steps" icon={<HomeWorkIcon />} {...a11yProps(4)} />
          <Tab label="Exit Strategy" icon={<PeopleIcon />} {...a11yProps(5)} />
          <Tab label="Q&A" icon={<QuestionAnswerIcon />} {...a11yProps(6)} />
          <Tab
            label="Logout"
            icon={<LogoutIcon />}
            onClick={logout}
            {...a11yProps(6)}
          />
        </Tabs>
        <Divider />
  
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Alert severity="info">
          Want to skip the content? Press the menu button and head to Q&A to ask
          Alan ( in the bottom right hand corner) direct questions.
        </Alert>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2} style={{ marginBottom: "3%" }}>
            <Grid item xs={12} sm={12}>
              <Card style={{ backgroundColor: themec, color: "white" }}>
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3">{organization}</Typography>
                  <Typography variant="h6" style={{ color: "gray" }}>
                    Organization
                  </Typography>
                </div>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card style={{ backgroundColor: themec, color: "white" }}>
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3" style={{ color: "green" }}>
                    Pilot Complete
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ backgroundColor: themec, color: "white" }}>
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3" style={{ color: "green" }}>
                    Generating Revenue
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ backgroundColor: themec, color: "white" }}>
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3" style={{ color: "white" }}>
                    IP Filed
                  </Typography>
                  <Typography variant="h6" style={{ color: "gray" }}>
                    Ulmer & Berne, LLP
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ backgroundColor: themec, color: "white" }}>
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3" style={{ color: "white" }}>
                    Strategic Partners
                  </Typography>
                  <Typography variant="h6" style={{ color: "gray" }}>
                    HR, Prospecting, Legal, Technology
                  </Typography>
                </div>
              </Card>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            style={{ marginBottom: "3%", marginTop: "3%" }}
          >
            <Grid item xs={12} sm={12}>
              <Card style={{ backgroundColor: themec, color: "white" }}>
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3">About Us</Typography>
                  <Typography
                    variant="h6"
                    style={{ color: "white", marginTop: "2%" }}
                  >
                    Information about Co.
                  </Typography>
                </div>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: "3%" }}>
            <Grid item xs={12} sm={12}>
              <Card style={{ backgroundColor: themec, color: "white" }}>
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3">Introduction</Typography>
                  <br />

                  <Typography variant="h3">Tools Explained</Typography>
                  <br />

                  <Typography
                    variant="h6"
                    style={{ color: "white", marginTop: "3%" }}
                  >
                    For a detailed use case, please visit{" "}
                    <a
                      href="https://usecase.space"
                      target="_BLANK"
                      style={{ color: "white" }}
                    >
                      usecase.space
                    </a>
                  </Typography>
                </div>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2} style={{ marginBottom: "3%" }}>
            <Grid item xs={12} sm={12}>
              <Card style={{ backgroundColor: themec, color: "white" }}>
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3" style={{ marginBottom: "5%" }}>
                    {name}, this is our history.
                  </Typography>

                  <Typography variant="h6" style={{ marginBottom: "3%" }}>
                    <History />
                  </Typography>
                </div>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={2} style={{ marginBottom: "3%" }}>
            <Grid item xs={12} sm={12} style={{ color: "white" }}>
              <Card style={{ backgroundColor: themec, color: "white" }}>
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3" style={{ marginBottom: "3%" }}>
                    {name}, it's time to execute.
                  </Typography>
                  <Typography variant="h6" style={{ marginBottom: "3%" }}>
                    <br />
                    <MarkAuthors />
                    <br />

                    <Typography
                      variant="h6"
                      style={{ marginBottom: "3%", textAlign: "center" }}
                    ></Typography>
                    <br />
                  </Typography>
                </div>
              </Card>

              <Card
                style={{
                  backgroundColor: themec,
                  color: "white",
                  marginTop: "3%",
                }}
              ></Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Grid container spacing={2} style={{ marginBottom: "3%" }}>
            <Grid item xs={12} sm={12}>
              <Card
                style={{ backgroundColor: themec, color: "white" }}
                elevation={8}
              >
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3">
                    {name}, this is why I need funding.
                  </Typography>
                  <br />
                  <Typography variant="h6">
                    Static content <br />
                    <br />
                    <br />
                    <div
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <br />
                    </div>
                    <br />
                  </Typography>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "3%",
                      }}
                    >
                      <br />
                      History of Cash Influx from Previous Investment
                    </div>
                    <img
                      src={Influx}
                      style={{
                        width: "70%",
                        height: "auto",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                  <br />
                </div>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Grid container spacing={2} style={{ marginBottom: "3%" }}>
            <Grid item xs={12} sm={12}>
              <Card
                style={{ backgroundColor: themec, color: "white" }}
                elevation={8}
              >
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3">
                    {name}, these are our next steps.{" "}
                  </Typography>
                  <br />
                  Static content
                  <br />
                </div>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={5}>
          <Grid container spacing={2} style={{ marginBottom: "3%" }}>
            <Grid item xs={12} sm={12}>
              <Card
                style={{ backgroundColor: themec, color: "white" }}
                elevation={8}
              >
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3">
                    {name}, we have a wonderful destination.
                  </Typography>
                  <br />
                 Static Content
                </div>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Grid container spacing={2} style={{ marginBottom: "3%" }}>
            <Grid item xs={12} sm={12}>
              <Card
                style={{ backgroundColor: themec, color: "white" }}
                elevation={8}
              >
                <div style={{ padding: "5%" }}>
                  <Typography variant="h3">
                    {name}, it's your time to ask questions.
                  </Typography>
                  <br />
                  <Typography variant="h6">
                    <u>Q&A with Alan</u>
                    <br />
                    <br />
                    Ask Alan some basic pitch questions...
                    <br />
                    <br />
                    <li>
                      <i>Who is your target customer?</i>
                    </li>
                    <li>
                      <i>Who is on the team?</i>
                    </li>
                    <li>
                      <i>What is the current traction?</i>
                    </li>
                    <li>
                      <i>What is your pricing structure?</i>
                    </li>
                    <li>
                      <i>What is the current toolset?</i>
                    </li>
                    <li>
                      <i>What are your revenue projections?</i>
                    </li>
                    <li>
                      <i>How is Hypertection better than it's competitors?</i>
                    </li>
                    <br />
                  </Typography>
                </div>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <div>
          <div>
            <Button
              variant="outlined"
              onClick={handleClickOpen1}
              style={{ display: "none" }}
              id="teammodal"
            >
              Open Team Dialog
            </Button>
            <BootstrapDialog
              onClose={handleClose1}
              aria-labelledby="customized-dialog-title"
              open={open1}
              fullWidth
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose1}
              >
                Team
              </BootstrapDialogTitle>
              <DialogContent dividers={scroll === "paper"}>
                <Typography gutterBottom>
                  <img
                    src={TeamMembers}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Typography>
                <br />
                <Typography gutterBottom style={{ textAlign: "center" }}>
                  <u>Executive Team Members</u>
                </Typography>
                <Typography gutterBottom style={{ textAlign: "center" }}>
                  Cristion Brown <br />
                  Mike Jones
                  <br />
                  Brandon Malofsky
                  <br />
                </Typography>
                <Typography gutterBottom style={{ textAlign: "center" }}>
                  <u>Governance & Advisory</u>
                </Typography>
                <Typography gutterBottom style={{ textAlign: "center" }}>
                  Luke <br />
                  Scott
                  <br />
                  Lee
                  <br />
                  Cassandra
                  <br />
                  Todd
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose1}>
                  Close
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </div>
        </div>
        <Copyright sx={{ mt: 8, mb: 4 }} style={{ marginTop: "4%" }} />
      </Main>
    </Box>
  );
}
