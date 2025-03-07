import React, { useContext } from "react";
import "./AdminHome.css";
import config from "../../config.json";
import { NavLink } from "react-router-dom";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "../Common/CustomTabPannel";
import ProductHome from "./ProductHome";
import useData from "../../hooks/useData";

const AdminHome = ({ product }) => {
  const user = useContext(UserContext);

  const { data: prodList, refetch } = useData("/products", null, ["pddlist"]);

  const { data: catList, catrefetch } = useData("/category", null, ["ctglist"]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Products" {...a11yProps(1)} />
          <Tab label="Categories" {...a11yProps(2)} />
          <Tab label="Orders" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {prodList && catList && (
          <ProductHome dataModel={prodList} catList={catList} />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Four
      </CustomTabPanel>
    </Box>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default AdminHome;
