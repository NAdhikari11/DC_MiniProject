import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllCars } from "../../helpers/api-helpers";
import CradLayout from "../HomePage/CradLayout";

const AllCars = () => {
  const [cars, setCars] = useState();
  useEffect(() => {
    getAllCars()
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin="auto" marginTop={4}>
      <Typography variant="h4" padding={2} textAlign="center">
        All Cars
      </Typography>
      <Box
        margin="auto"
        width="100%"
        display={"flex"}
        justifyContent="center"
        flexWrap={"wrap"}
        gap={4}
      >
        {cars &&
          cars.map((car, index) => (
            <CradLayout
            id={car._id}
            brand={car.title}
            model={car.releaseDate}
            posterUrl={car.posterUrl}
            price={car.description}
            key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default AllCars;
