import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import "./Item.css";
import "./Responsive.css";
import Product from "../Product.jsx/Product";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Confirm from "../Confirm/Confirm";
import Edititem from "../Edit/Edititem";
import { useAuth } from "../../auth/Authcontext";
import Addproduct from "../Addproduct/Addproduct";
// import logo from "../../logo.svg"
import Carousel from "react-material-ui-carousel";
import { jwtDecode } from "jwt-decode";
const Iteams = () => {
  const notify = () => toast("Iteam Has been deleted");
  const notify2 = () => toast("Iteam not deleted");
  const notify3 = () => toast("dataUpdated");
  const notify4 = () => toast("Iteam Has been added");

  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeletId] = useState(null);
  const [openEdit, setopenEdit] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [editid, setEditid] = useState(null);

  const [selectProduct, setSelectProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const token = localStorage.getItem("token");

  // --------------get user id from token---------

  useEffect(() => {
    if (token) {
      try {
        const decode = jwtDecode(token); //jwt-decod install to get id and  from token
        setUserId(decode.id);
      } catch (err) {
        console.log(err, "error is in taking id from token");
      }
    }
  }, [token]);
  // --------refresh----------------

  const reloadComponent = () => {
    setRefresh((prev) => !prev);
  };

  // ---------------------getdata--------------------------------

  useEffect(() => {
    const Fetchdata = async () => {
      try {
        const res = await axios.get(
          `https://backendofproducts.onrender.com/product/?page=${page}&limit=4`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const idreplace = res.data.products.map(({ _id, ...rest }) => ({
          id: _id,
          ...rest,
        }));
        console.log(idreplace);
        setItem(idreplace);
        setTotalPage(res.data.totalPage);
      } catch (err) {
        console.log(err, "error is in the geting function");
      }
    };
    Fetchdata();
  }, [page, refresh]);
  // console.log(item,"-----------------")

  // --------------additem---------------
  const handleAddproduct = () => {
    setOpenAddProduct(true);
  };

  // -------------------------delet data----------------------------
  const handleDeleteClick = (id) => {
    setDeletId(id);
    setOpenConfirm(true);
  };

  const onhandledlete = (id) => {
    if (!deleteId) return;
    try {
      const dltdata = async () => {
        const res = await axios.put(
          `https://backendofproducts.onrender.com/product/delete-product/?id=${deleteId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItem((prev) => prev.filter((p) => p.id !== deleteId));
        console.log(res.data, "delete", token);
        notify();
      };
      dltdata();
    } catch (err) {
      alert(err);
    } finally {
      setOpenConfirm(false);
      setDeletId(null);
    }
  };

  // -----------------------------updatedata---------------------------

  const hadleUpdate = (id, item) => {
    setEditid(id);
    setSelectProduct(item);
    setopenEdit(true);
  };

  //  ----------------------------------------------------------------
  return (
    <div className="main-content">
      <div className="main">
        <h1>All Product</h1>
        <Button variant="contained" onClick={handleAddproduct}>
          add product
        </Button>
      </div>
      <div className="gridss">
        {item.map((item) => (
          <div className="content" key={item.id}>
            <Card className="Card">
              <h4 className="title">{item.title}</h4>
              {/* {item.image?.map((img,index)=>( */}
              <Carousel
                autoPlay={true}
                interval={3000}
                navButtonsAlwaysVisible={false}
                indicators={false}
              >
                {(Array.isArray(item.image) ? item.image : [item.image])?.map(
                  (img, index) => (
                    //the working is first check the item.image is an array or not if it is not then it will wrapp
                    //[item.image] like this it used to prevent error on mapping maping only works for the array
                    <CardMedia
                      className="CardMedia"
                      sx={{ width: "100%", objectFit: "contain" }}
                      height="240px"
                      image={`https://backendofproducts.onrender.com/${img}`}
                      component="img"
                      title={`${item.title} - ${index + 1}`}//the index +1 make the index humber to understand human eg first index  0 -> 1 , 1-> 2 etc 
                    />
                  )
                )}
              </Carousel>

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
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => hadleUpdate(item.id, item)}
                  >
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
        onCancel={() => {
          setOpenConfirm(false);
          notify2();
          setDeletId(null);
        }}
      />

      {openEdit && (
        <Edititem
          open={openEdit}
          Product={selectProduct}
          id={editid}
          onClose={(updatedProduct) => {
            setopenEdit(false);

            if (updatedProduct) {
              setItem((prev) =>
                prev.map((p) =>
                  p.id === updatedProduct._id
                    ? { id: updatedProduct._id, ...updatedProduct }
                    : p
                )
              );
            }
          }}
        />
      )}

      {openAddProduct && (
        <Addproduct
          open={openAddProduct}
          onAdd={reloadComponent}
          onSuccess={notify4}
          onClose={() => {
            setOpenAddProduct(false);
          }}
        />
      )}

      <div className="pagination">
        <Button
          variant="contained"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </Button>

        <span style={{ margin: "0 10px" }}>
          {page} of {totalPage}
        </span>

        <Button
          variant="contained"
          onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
          disabled={page === totalPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Iteams;
