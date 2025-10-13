import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import "./Item.css";
import "./Responsive.css"
import Product from "../Product.jsx/Product";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Confirm from "../Confirm/Confirm";
import Edititem from "../Edit/Edititem";

const Iteams = () => {
  const notify = () => toast("Iteam Has been deleted");
  const notify2 = () => toast("Iteam not deleted");
  const notify3 = () => toast("dataUpdated");
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [openConfirm,setOpenConfirm]=useState(false)
  const [deleteId,setDeletId]=useState(null)
  const [openEdit,setopenEdit]=useState(false)
  const[editid,setEditid]=useState(null)



  // ---------------------getdata--------------------------------
  useEffect(() => {
    try {
      axios("https://fakestoreapi.com/products").then((response) =>
        setItem(response.data)
      );
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }, []);
  // console.log(item,"-----------------")



// -------------------------delet data----------------------------
  const handleDeleteClick =(id)=>{
    setDeletId(id);
    setOpenConfirm(true)
  }
 

const onhandledlete =  (id) => {
    if(!deleteId)return;
      try {
         axios
          .delete(`https://fakestoreapi.com/products/${deleteId}`)
          // .then(() => setItem(item.filter((i) => i.id !== id)));
       .then(()=> setItem(item.filter((i) => i.id !== deleteId)));
         notify()
         
      } catch (err) {
        alert(err);
      }
      finally{
        setOpenConfirm(false)
        setDeletId(null)
      }
  };


  // -----------------------------updatedata---------------------------

  const hadleUpdate =(id)=>{
    setEditid(id)
    setopenEdit(true)
  }


 
//  ----------------------------------------------------------------
  return (
    <div className="main-content">
      
      <div className="main">
        <h1>All Product</h1>
        <Button variant="contained">add product</Button>
      </div>
              <ToastContainer />
      <div className="gridss">
        {item.map((item) => (
          <div className="content" key={item.id}>
            <Card className="Card">
              <h4 className="title">{item.title}</h4>
              <CardMedia
                className="CardMedia"
                sx={{ width: "100%", objectFit: "contain" }}
                height="240px"
                image={item.image}
                component="img"
                title="green iguana"
              />

              <CardContent>
                <Typography
                  className="discription"
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  {item.description}
                </Typography>
                <h3 className="price">₹ {item.price}</h3>
              </CardContent>
              <Button
                className="viewbtn"
                variant="contained"
                onClick={() => navigate(`/viewProduct/${item.id}`)}
              >
                View product
              </Button>
              <div className="btns">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  delete
                </Button>
                <Button variant="contained" color="success" size="small"
                onClick={()=>hadleUpdate(item.id)}>
                  edit
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <Confirm 
      open={openConfirm}
      onConfirm={onhandledlete}
      onCancel={()=>{setOpenConfirm(false);notify2();
        setDeletId(null)
      }}/>
      <Edititem
      open={openEdit}
      // id={editid}
      productData={item.find(p => p.id === editid)}
      onClose={()=>setopenEdit(false)} 
      onUpdate={(updateProduct)=>{
        setItem(prev =>prev.map(p=>p.id  === updateProduct.id ? updateProduct :p))
     ; notify3() }}
      />
              {/* setItem(prev =>
          prev.map(p => {
            if (p.id === updateProduct.id) {
              return updateProduct; // replace this one
            } else {
              return p; // keep the old one
            }
          })
        ); */}

    </div>
  );
};

export default Iteams;
