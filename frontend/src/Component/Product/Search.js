import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";


const Search = (history) => {
    // const history = useHistory();
    let navigate = useNavigate();

//   const [keyword,setKeyword] =useState("");


  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    console.log({keyword});
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

//   const searchSubmitHandler=(e) => {
//     e.preventDefault();
//     if(keyword.trim()){
//         history.push(`/products/${keyword}`);


//     }
//     else{
//         history.push("/products");
//     }
//   }
  

  return (
    <>
    <form className='searchBox w-full h-screen flex gap-2 justify-center items-center bg-slate-200 fixed  ' onSubmit={searchSubmitHandler}> 

    <input className='shadow-lg bg-white border-none p-2 w-1/2 rounded box-border' type="text" placeholder='Search s product...' onChange={(e) => setKeyword(e.target.value)}/>
    <input className='rounded  bg-red-500 px-3 py-2 cursor-pointer text-white transition-all hover:bg-slate-200 hover:text-red-500 hover:border-red-500 border  ' type ="submit" value="Search"/>
    

    </form>
    
    </>
  )
}

export default Search