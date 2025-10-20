import React, { useEffect, useRef, useState } from 'react'
import "./Edititem.css"
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { toast } from "react-toastify";

  

const notify3 = () => toast("dataUpdated");

const Edititem = ({open, onClose, id,Product}) => {
  const editboxRef = useRef()
  const [productTitle, setProductTitle] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const token =localStorage.getItem("token")


useEffect(()=>{
  if(Product){

    setProductTitle(Product.title||"")
    setProductDescription(Product.description||"")
    setProductPrice(Product.price||"")
  }
},[Product])

  const UpdateProduct = async () => {
   try{
    const res =await axios.put(`http://localhost:5000/product/update-product?id=${id}`,
      {
        title:productTitle,
        description:productDescription,
        price:productPrice
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(res,id)
        onClose(res.data.data)
   } 
   catch(err){
    alert(err,"error is it the update frontend")
   }
  }
  useEffect(()=>{
    const handleClickOutside=(event)=>{
      if(editboxRef.current && !editboxRef.current.contains(event.target)){
        onClose()
      }
    }
     document.addEventListener("mousedown",handleClickOutside)
     return ()=>document.removeEventListener("mousedown",handleClickOutside)
  },[onClose])
  
  return (
    <div className='main-edit' ref={editboxRef}>
      <Button variant='contained' className='closebtn' onClick={onClose}>X</Button>
      <div className="edit">
        <h1>Edit Product</h1>
        <div className="items">
          <TextField
            onChange={(e) => setProductTitle(e.target.value)}
            value={productTitle}
            className='textEditField'
            type='text'
            label="title"
            variant="filled"
            focused
          />

          <TextField
            onChange={(e) => setProductDescription(e.target.value)}
            value={productDescription}
            className='textEditField'
            label="Description"
            variant="filled"
            focused
          />
          <TextField
            onChange={(e) => setProductPrice(e.target.value)}
            value={productPrice}
            className='textEditField'
            label="price"
            variant="filled"
            type='number'
            focused
          />
          <Button onClick={()=>{UpdateProduct();notify3()}} variant='contained'>update Product</Button>
        </div>
      </div>
    </div>
  )
}

export default Edititem
