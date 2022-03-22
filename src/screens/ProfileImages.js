import React, { useState, useEffect } from "react";
import { Container, Grid, ListItem } from "@mui/material";
import PictureCard from "./PictureCard.js";
import axios from "axios";

function ProfileImages(){
    
        const [pictures, setPictures] = useState([]);
        useEffect(() => {
          const fetchData = async () => {
            const { data } = await axios.get(
              "http://localhost:3000/users/allPictures"
            );
            setPictures(data);
          };
          fetchData();
        }, []);
    
    return(
        <>
        
        <Container>
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
        >
            {pictures.map((pictures) => (
            <Grid item xs={2} sm={3} md={4} key={pictures._id}>
                <ListItem>
                <PictureCard pictures={pictures} />
                </ListItem>
            </Grid>
            ))}
        </Grid>
        </Container>

{/* dummy card bellow */}
         {/* <main>
                
                <div className="container">
            
                        <div className="gallery-item" >
            
                            <img style={{"padding": "14px"}} width="370px" src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
            
                            <div className="gallery-item-info">
            
                            </div>
            
                        </div>          
                    <div className="loader"></div>
                </div>

            
            </main>         */}
{/* end of dummy card */}
        </>
    )
}

export default ProfileImages;