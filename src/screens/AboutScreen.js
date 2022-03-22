import React from "react";
import ing from '../images/ing.png';
import { Box } from "@mui/material";


function AboutScreen(props) {
  return (
    <>
      <div className="MainContainer" style={{"marginBottom" : "-90px"}}>
      <Box sx={{"backgroundColor" : '#ced8e2', "width" : "100%"}} style={{"marginBottom" : "-200px" }} className="p-5">
        <h1 style={{ "font-size": "100px"}} className="h1Header">Project Capture Beauty ✨</h1>
      </Box>

      <div className="containerFoodup" >
        <img
          id="ingredientImage"
           src={ing}
          alt="ingredientImage"
          style={{ width: "100%" }}
        />

        <div className="text-blockBig" >
          <h1>We have all the ingredients you need!</h1>
          <h3>
            Built by a photographer for photographers in order to compete with a
            competitive landscape.{" "}
          </h3>
        </div>
      </div>

      <div style={{"marginBottom" : "-50px"}} className="containerFoodupParent">
        <div className="TextboxAbout">
          <div className="">
            <h1 className="display-4 font-italic">Built with AstroLabs</h1>
            <p className="lead my-3">
              With special thanks to Dany. It was a fantastic bootcamp!
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default AboutScreen;
