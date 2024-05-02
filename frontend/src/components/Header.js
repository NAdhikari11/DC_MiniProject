import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box } from "@mui/system";
import { getAllCars } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getAllCars()
      .then((data) => setCars(data.cars))
      .catch((err) => console.log(err));
  }, []);
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  const handleChange = (e, val) => {
  setValue(val);
  const car = cars.find((m) => m.brand === val);
  console.log(car);
  if (isUserLoggedIn && car) { // Check if 'car' is defined
    navigate(`/booking/${car._id}`);
  }
};

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <DirectionsCarIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={cars && cars.map((option) => option.brand)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Across Multiple Cars"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/car" label="Cars" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab label="Admin" LinkComponent={Link} to="/admin" />
                <Tab label="Auth" LinkComponent={Link} to="/auth" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab label="Profile" LinkComponent={Link} to="/user" />
                <Tab
                  onClick={() => logout(false)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab label="Add Car" LinkComponent={Link} to="/add" />
                <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
                <Tab
                  onClick={() => logout(true)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
