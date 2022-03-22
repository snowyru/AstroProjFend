import React from "react";
// import ing from '../images/ing.png'
import './Aboutpage.css';


function AboutScreen(props) {
  return (
    <>
    
      <header class="pb-3 mb-4 border-bottom">
        {" "}
        <h1 class="h1Header">Project Capture Beauty</h1>
      </header>

      <div class="containerFoodup">
        {/* <img
          id="ingredientImage"
          // src={ing}
          alt="ingredientImage"
          style={{ width: "100%" }}
        /> */}

        <div class="text-blockBig">
          <h1>We have all the ingredients you need!</h1>
          <h3>
            Built by a photographer for photographers in order to compete with a
            competitive landscape.{" "}
          </h3>
        </div>
      </div>

      <div class="containerFoodupParent">
        <div class="TextboxAbout">
          <div class="col-md-12 px-0">
            <h1 class="display-4 font-italic">Built with AstroLabs</h1>
            <p class="lead my-3">
              With special thanks to Dany. It was a fantastic bootcamp!
            </p>
          </div>
        </div>
      </div>
    
    </>
  );
}

export default AboutScreen;
