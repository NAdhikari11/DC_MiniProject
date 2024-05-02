import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addCar } from "../../api-helpers/api-helpers";
const labelProps = {
  mt: 1,
  mb: 1,
};
const AddCar = () => {
  const [inputs, setInputs] = useState({
    brand: "",
    model: "",
    posterUrl: "",
    price: "",
    // featured: false,
  });
  // const [actors, setActors] = useState([]);
  // const [actor, setActor] = useState("");
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    addCar({ ...inputs })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Car
          </Typography>
          <FormLabel sx={labelProps}>Brand</FormLabel>
          <TextField
            value={inputs.brand}
            onChange={handleChange}
            name="brand"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>model</FormLabel>
          <TextField
            value={inputs.model}
            onChange={handleChange}
            name="model"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Price</FormLabel>
          <TextField
            // type={"date"}
            value={inputs.price}
            onChange={handleChange}
            name="price"
            variant="standard"
            margin="normal"
          />
          
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Car
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddCar;
