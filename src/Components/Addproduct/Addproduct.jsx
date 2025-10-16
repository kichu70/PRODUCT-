import React, { useEffect, useRef, useState } from "react";
import "./Addproduct.css";
import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
const Addproduct = ({ open, onClose ,onAdd}) => {
  const notify = () => toast("Iteam Has been added");

  const token = localStorage.getItem("token");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [image,setImage]=useState(null)
  const addref = useRef();

  const addProduct = async (req, res) => {
    try {
      const formData = new FormData();
      formData.append("title",productTitle)
      formData.append("description",productDescription)
      formData.append("price",productPrice)
      formData.append("image",image)
      const res = await axios.post(
        `https://backendofproducts.onrender.com/product/add-product`,
        formData
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("added prodect", res.data);
      notify();
      onAdd(res.data)
      setProductDescription("");
      setProductPrice("");
      setProductTitle("");
      onClose();
    } catch (err) {
      if(err.response){
        const errors=err.response.data.msg
        for(const key in errors){
          if(errors.hasOwnProperty(key))//hasOwnProperty is a reserved word in java script 
          {
            toast.error(errors[key])
          }
        }      
      }
      else{
        toast.error("sothing went wrong in the adding product")
        console.log(err, "error is in the adding product");
      }
    }
  };
  useEffect(()=>{
    const handleClickOutside=(event)=>{
      if(addref.current && !addref.current.contains(event.target)){
        onClose()
      }}
      document.addEventListener("mousedown",handleClickOutside)
      return ()=>document.removeEventListener("mousedown",handleClickOutside)
  },[onClose])
  return (
    
        <div className="main-edit" ref={addref} >
          <Button variant="contained" className="closebtn" onClick={onClose}>
            X
          </Button>
          <ToastContainer />
          <div className="edit">
            <h1>Add Product</h1>
            <div className="items">
              <TextField
                onChange={(e) => setProductTitle(e.target.value)}
                value={productTitle}
                className="textEditField"
                type="text"
                label="title"
                variant="filled"
                focused
              />
              <TextField
                onChange={(e) => setProductDescription(e.target.value)}
                value={productDescription}
                className="textEditField"
                label="discription"
                variant="filled"
                focused
              />
              <TextField
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
                className="textEditField"
                label="price"
                type="number"
                variant="filled"
                focused
              />

              <input
              type="file"
              accept="image/*"
              onChange={(e)=>setImage(e.target.files[0])}
              className="textEditField"
              />

              <Button onClick={addProduct} variant="contained">
                Add Product
              </Button>
            </div>
          </div>
        </div>
  );
};

export default Addproduct;
