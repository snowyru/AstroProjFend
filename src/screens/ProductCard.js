import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";


export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345 }} style={{width:'100%'}}>
      <CardHeader
        avatar={<Avatar alt="User Name" src='User profile photo' />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="User Name"
        subheader={product.dateCreated.substring(0, 10)}
      />
      <CardMedia
        component="img"
        height="194"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          Name : 
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category : 
          {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
