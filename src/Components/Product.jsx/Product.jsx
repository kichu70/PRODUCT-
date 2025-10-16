import React, { useState } from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// const axios = require('axios');
import axios from "axios";
import "./Product.css"

const Product = () => {
  const { id } = useParams(); // get product ID from URL
  console.log(id, "idgeted");
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  useEffect(() => {
    // axios
    //   .get(`https://backendofproducts.onrender.com/product/${id}`)
    //   .then((response) => setProduct(response.data));
    // console.log(product);

    const viewProduct =async()=>{
      try{

      }
      catch(err){
        console.log(err,"this error is in the prodect view page")
      }
    }
  }, []);

  return (<div className="body">
    <div className="content1">
      <div className="Card1">
      <Card className="cardbox">
        <h4 className="title">{product.title}</h4>
        <CardMedia
          className="CardMedia"
          sx={{ width: "100%", objectFit: "contain" }}
          height="240px"
          image={product.image}
          component="img"
          title="green iguana"
        />
          <h3 className="price">₹ {product.price}</h3>
        <CardContent>
          <Typography
            className="discription"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {product.description}
          </Typography>
        </CardContent>

        <div className="btns">
          <Button onClick={()=>navigate("/")} className="mblgtn" variant="contained" size="small">
            go back
          </Button>
        </div>
      </Card>
      </div>
      <div className="card">
        <div className="imageDiv">
          <img src={product.image} alt="" />
        </div>
        <div className="pera">
          <h1>{product.title}</h1>
          <div>
            <h2>₹ {product.price}</h2>
            <h5>{product.category}</h5>
            <p>{product.description}</p>
            <button onClick={()=>navigate("/")}>go back </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Product;
