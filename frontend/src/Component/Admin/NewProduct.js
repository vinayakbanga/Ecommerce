import { Button } from '@mui/material'
import React,{useEffect,useState} from 'react'
import { useAlert } from 'react-alert'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors,createProduct } from '../../actions/productAction'
import MetaData from '../Layout/MetaData'
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import DescriptionIcon from "@mui/icons-material/Description"
import StorageIcon from "@mui/icons-material/Storage"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
// NEW_PRODUCT_RESET
import { useNavigate, useParams } from 'react-router-dom'
// useNavigate

const NewProduct = () => {
    const {id}= useParams();
    const navigate = useNavigate();


    const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };








  return (
    <>
    <MetaData title="Create Prod"/>
    <div className="dashboard flex flex-col md:h-screen md:flex-row ">
    <div className=' md:w-1/4  md:border-r-2'>
      <Sidebar/>
      </div>
      <div className="newProductContainer border md:w-3/4">
          <form
            className="createProductForm mt-5 flex flex-col items-center px-2 gap-5 justify-center transition-all"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1 className='text-2xl'>Create Product</h1>

            <div className=' border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none'>
              <SpellcheckIcon />
              <input
              className='outline-none'
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='signUpName border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none'>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className='signUpName border border-slate-500 rounded flex gap-2  py-1 outline-none'>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="2"
              ></textarea>
            </div>

            <div className='signUpName border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none'>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div className='signUpName border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none'>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage" className='flex gap-2 overflow-x-auto'>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" className='w-28 ' />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
              className="bg-orange-500"
              
            >
              Create
            </Button>
          </form>
        </div>
    </div>
    </>
  )
}

export default NewProduct