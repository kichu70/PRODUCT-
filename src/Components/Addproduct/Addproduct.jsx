import React, { useEffect, useRef, useState } from "react";
import "./Addproduct.css";
import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
const Addproduct = ({ open, onClose, onAdd, onSuccess }) => {
  const token = localStorage.getItem("token");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const addref = useRef();

  const notify4 = () => toast("Iteam Has been added");

  const addProduct = async (req, res) => {
    try {
      const formData = new FormData();
      formData.append("title", productTitle);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      // formData.append("images",image)for single image
      image.forEach((img) => {
        formData.append("image", img);
      });
      const res = await axios.post(
        `http://localhost:5000/product/add-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("added prodect", res.data);

      onAdd(res.data);
      onSuccess?.();
      setProductDescription("");
      setProductPrice("");
      setProductTitle("");
      setImage([]);

      onClose();
    } catch (err) {
      if (err.response) {
        const errors = err.response.data.msg;
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            //hasOwnProperty is a reserved word in java script
            toast.error(errors[key]);
          }
        }
      } else {
        toast.error("sothing went wrong in the adding product");
        console.log(err, "error is in the adding product");
      }
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addref.current && !addref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage((prev) => [...prev, ...files]);
    const newPreview = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...newPreview]);
  };

  const removeImage = (index) => {
    setImage((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="main-edit" ref={addref}>
      <Button variant="contained" className="closebtn" onClick={onClose}>
        X
      </Button>
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
            onChange={handleImageChange}
            className="textEditField"
          />
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            {imagePreview.map((src, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  style={{ width: "30px", height: "30px", objectFit: "cover" }}
                />
                <button
                  onClick={() => removeImage(idx)}
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "15px",
                    height: "15px",
                    cursor: "pointer",
                    fontSize: "10px",
                    padding: 0,
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>

          <Button onClick={addProduct} variant="contained">
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
