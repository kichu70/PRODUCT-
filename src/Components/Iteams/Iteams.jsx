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
import { useAuth } from "../../auth/Authcontext";
import Addproduct from "../Addproduct/Addproduct";
// import logo from "../../logo.svg"
import {jwtDecode} from "jwt-decode";
const Iteams = () => {
  const notify = () => toast("Iteam Has been deleted");
  const notify2 = () => toast("Iteam not deleted");
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [openConfirm,setOpenConfirm]=useState(false)
  const [deleteId,setDeletId]=useState(null)
  const [openEdit,setopenEdit]=useState(false)
  const[openAddProduct,setOpenAddProduct]=useState(false)
  const[editid,setEditid]=useState(null)
  
  const[selectProduct,setSelectProduct]=useState(null)
  const [refresh,setRefresh]=useState(false)
  const [userId,setUserId]=useState(null)
  
  const token= localStorage.getItem("token")

  // --------------get user id from token---------

  useEffect(()=>{
    if(token){
      try{
        const decode =jwtDecode(token)//jwt-decod install to get id and  from token
        setUserId (decode.id)
      }
      catch(err){
        console.log(err,"error is in taking id from token")
      }
    }
  },[token])
    // --------refresh----------------

    const reloadComponent =()=>{
      setRefresh(prev=>!prev)
    }

  // ---------------------getdata--------------------------------

  useEffect(()=>{
    const Fetchdata =async()=>{

      try{
        const res = await axios.get("https://backendofproducts.onrender.com/product/",
          {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }
        )
        const idreplace =res.data.map(({_id,...rest})=>({
          id:_id,
          ...rest
        }))
        console.log(res.data)
        setItem(idreplace)
        
      }
      catch(err){
        console.log(err,"error is in the geting function")
      }
    }
    Fetchdata()
  },[refresh])
  // console.log(item,"-----------------")


// --------------additem---------------
const handleAddproduct=()=>{
  setOpenAddProduct(true)
}

// -------------------------delet data----------------------------
  const handleDeleteClick =(id)=>{
    setDeletId(id);
    setOpenConfirm(true)
  }
 

const onhandledlete =  (id) => {
    if(!deleteId)return;
      try {
         const dltdata=async()=>{
          const res =await axios.put(`https://backendofproducts.onrender.com/product/delete-product/?id=${deleteId}`,
           {},{ headers: {
           Authorization: `Bearer ${token}`,
            }}
          )
          setItem((prev)=>prev.filter((p)=>p.id !==deleteId))  
          console.log(res.data,"delete",token)
          notify()
         }
         dltdata()
      } catch (err) {
        alert(err);
      }
      finally{
        setOpenConfirm(false)
        setDeletId(null)
      }
  };


  // -----------------------------updatedata---------------------------

  const hadleUpdate =(id,item)=>{
    setEditid(id)
    setSelectProduct(item)
    setopenEdit(true)
  }


 
//  ----------------------------------------------------------------
  return (
    <div className="main-content">
      
      <div className="main">
        <h1>All Product</h1>
        <Button variant="contained" onClick={handleAddproduct}>add product</Button>
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
                image={`https://backendofproducts.onrender.com/${item.image}`}
                component="img"
                 title={item.title}
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
              {/* <Button
                className="viewbtn"
                variant="contained"
                onClick={() => navigate(`/viewProduct/${item.id}`)}
              >
                View product
              </Button> */}
              {item.user === userId && (

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
                onClick={()=>hadleUpdate(item.id, item)}>
                  edit
                </Button>
              </div>
                )}
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
      {openEdit&&(

        <Edititem
        open={openEdit}
        Product={selectProduct}
        id={editid}
        onClose={(updatedProduct)=>{setopenEdit(false);
          if(updatedProduct){
            setItem(prev=>prev.map(p=>p.id ===updatedProduct._id?{id:updatedProduct._id,...updatedProduct}:p))
            
          }}
        }
    

        />
      )}
      {openAddProduct &&(
        <Addproduct
        open={openAddProduct}
        onAdd={reloadComponent}
        onClose={()=>{setOpenAddProduct(false)
        }}/>
        

      )}
    </div>
  );
};

export default Iteams;
