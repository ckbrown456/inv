import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Manage(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            aria-label="basic tabs example"
          >
            <Tab
              label="General Overview"
              style={{ color: "white" }}
              {...a11yProps(0)}
            />
            <Tab
              label="Requirements"
              style={{ color: "white" }}
              {...a11yProps(1)}
            />
            <Tab
              label="Arch & Design"
              style={{ color: "white" }}
              {...a11yProps(2)}
            />
            <Tab
              label="Construction"
              style={{ color: "white" }}
              {...a11yProps(3)}
            />
            <Tab label="Testing" style={{ color: "white" }} {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div>
            A general overview of the product life cycle for{" "}
            {props.organization} Parallel Web Tool. <br />
            <br />
            <u>User Needs</u>
            <br />
            The user shall be able to find and execute all agreed upon actions
            set forth in this document by {props.organization} and Hypernova
            Technologies.
            <br />
            <br />
            <u>Assumptions and Dependencies</u>
            <br />
            This system operates best on major browsers including but not
            limited to Google Chrome, Safari and Firefox.
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <u>External Interface Requirements</u>
          <br />
          This tool is accessible and performant through mobile and desktop
          browsers. <br />
          <br />
          <u>System Features</u>
          <br />
          This tool shall come with a custom domain name (www.yoursite.com)
          given it is available on popular domain registrars such as Namecheap,
          Hostgator or Google Domains and an SSL certificate (https).
          <br />
          This tool shall come with limited free hosting on a cloud platform.
          <br />
          <br />
          <u>Non- functional Requirements</u>
          <br />
          Availability (Service and Product Commitment) - this tool shall be
          available with 99.95% uptime across all browsers with a proper- wifi
          connection. <br />
          Accessibility - this system shall be accessible to all users including
          those with disabilities. For special requests, please contact us at
          comms@hypernovadev.space.
          <br />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Three
        </TabPanel>
      </Box>
    </div>
  );
}
