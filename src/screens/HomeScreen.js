import React, { useState, useEffect } from "react";
import { Button, Container, Grid, ListItem } from "@mui/material";
import ProductCard from "./ProductCard.js";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:3001/product/all"
      );
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product) => (
          <Grid item xs={2} sm={3} md={4} key={product._id}>
            <ListItem>
              <ProductCard product={product} />
            </ListItem>
          </Grid>
        ))}
      </Grid>
      {/* <Grid  style={{'margin':'auto','display':'flex','justifyContent':'center','alignItems':'center',}}>
        <ListItem>
          <Button variant="outlined">Show More</Button>
        </ListItem>
      </Grid> */}


      {/* <h1>elklhviuehfj</h1> */}


    </Container>
  );
};

export default HomeScreen;
