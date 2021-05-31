import React from "react";
// import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TableData from "./TableData";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          // aria-label="simple tabs example"
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* All */}
        <TableData />

        {/* <div className="app__bottom">
              <table>
                <thead>
                  <tr>
                    <th>Summary</th>
                    <th>Priority</th>
                    <th>Created On</th>
                    <th>Due By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Purchase Notebook</td>
                    <td>low</td>
                    <td>2021-04-17</td>
                    <td>2021-04-20</td>
                    <td>
                      <Button>
                        <EditIcon color="primary" />
                      </Button>
                      <Button>
                        <CheckCircleOutlineIcon style={{ color: "green" }} />
                      </Button>
                      <Button>
                        <DeleteForeverIcon style={{ color: "red" }} />
                      </Button>
                    </td>
                  </tr>
                 </tbody> 
                 </table>
              </div> */}

      </TabPanel>
      <TabPanel value={value} index={1}>
        Pending
      </TabPanel>
      <TabPanel value={value} index={2}>
        Completed
      </TabPanel>
    </div>
  );
}

