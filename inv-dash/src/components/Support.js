import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import emailjs from "emailjs-com";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const sendEmail = (e) => {
  e.preventDefault();
  emailjs
    .sendForm(
      "service_l85jgqp",
      "template_r1b1syl",
      e.target,
      "user_oEFEjNM3NftFo8RPUv57m"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  alert("Form Submitted");
  e.target.reset();
};

const theme = createTheme();

export default function Support(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="m">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h3" variant="h5">
            Contact
          </Typography>
          <Box component="form" onSubmit={sendEmail} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={props.name}
              style={{ display: "none" }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="issue"
              label="Issue"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="organization"
              label="Organization"
              id="password"
              value={props.organization}
              style={{ display: "none" }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Typography
          variant="h5"
          style={{ marginBottom: "2%", marginTop: "4%" }}
          align="center"
        >
          Frequently Asked Questions
        </Typography>
        <Accordion maxWidth="m">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>How Secure Is My Site?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <u>HTTPS</u>
              <br />
              HTTPS, Hypertext Transfer Protocol Secure, is utilized to protect
              the confidential data exchange between you and your users.
              Everyone expects and deserves their own private, online
              experience, and HTTPS delivers this through data ciphering, data
              integrity, and user confirmation. It is our duty to ensure all
              custom products we deploy have an SSL certificate, delivered
              across HTTPS.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>What is SEO</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <u>Search Engine Optimization(SEO)</u>
              <br />
              SEO is an expression to describe techniques to make websites
              easily discoverable on the internet. If an individual uses a
              browser to search a topic that relates to your company, adequate
              SEO brings your website higher on the results page, resulting in
              increased awareness and traffic.
              <br /><br />
              This process can involve taking content from your site and
              enhancing it so browsers will have it higher, or at the top of the
              search results page. Keyword refinement and website responsiveness
              are some of the methods focused on for enhanced SEO. Which method
              is best? This will come down to your individual site needs, which
              we would be happy to help you with. Please visit our Contact page
              to start this conversation.
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
