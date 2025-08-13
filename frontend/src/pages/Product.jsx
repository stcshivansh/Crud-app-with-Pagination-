import React, { useEffect, useRef, useState } from 'react'
import ProductApi from '../apis/apis'


import { apiConnector } from '../apis/apiconnector'
import toast from 'react-hot-toast'
import ProductCard from '../components/Products'
import Button from '../components/Button'
import ShimmerCard from '../components/ShimmerCard'
import ConfirmationModal from '../components/ConfirmationModal'
const {GET_PRODUCT,DELETE_PRODUCT} =ProductApi
import { Outlet, useNavigate } from 'react-router-dom'

const Products = () => {
    const [allProducts, setAllProducts] = useState([])
    const [page, setPage] = useState(1)
    const [pageDetails,setPageDetails] = useState({
      pageInfo:{
        hasNextPage:false,
        hasPreviousPage:false,
      }
    })
    const navigate = useNavigate()
    const [confirm,setConfirm] = useState(false)
    const headers = useRef(null)
    const [loading,setLoading]=useState(false)
    const idToDelete = useRef(null)
  const fetchData= async()=>{
    try {
      setLoading(true)
      const response = await apiConnector('GET',GET_PRODUCT,null,headers?.current);
      const pageApi = response[response.length-1]
      
      response.pop();
      setPageDetails(pageApi);


      setAllProducts(response)
    } catch (error) {
      console.log(error)
      setAllProducts([{error:error.message}])
    }
    finally{
      setLoading(false)
    }

  }
  const pageHandler=(updatedPage,operation)=>{
    if(page==0){
      console.log("cant be less than 0")
      return;
    }
    const header={
      
    }
    if(operation==="next"){
      header.first=10
      header.endCursor=pageDetails?.pageInfo?.endCursor
    }
    if(operation==="prev"){
      header.last=10
      header.startCursor=pageDetails?.pageInfo?.startCursor
    }
    headers.current=header;
    setPage(updatedPage)

  }
  const deleteHandler =async()=>{
    try {
      const id = idToDelete.current;
      const toastId = toast.loading("Loading..")
      const response = await apiConnector('DELETE',DELETE_PRODUCT,{id});
      toast.dismiss(toastId)
      const filteredData = allProducts.filter((ele)=>ele.id !==id)
      setAllProducts(filteredData)
      toast.success("Deleted successfully")
    } catch (error) {
      console.log(error)
    }
    finally{
      setConfirm(false)
    }
  }
  
  if(!loading && allProducts.length > 0 && allProducts[0].error){
    return <div  className="flex items-center justify-center min-h-screen w-full text-2xl">
      <span>Error in fetching data</span>
    </div>
  }
  // if(!loading && allProducts.length ==0){
  //   setPageDetails({pageInfo:{
  //       hasNextPage:false,
  //       hasPreviousPage:false,
  //     }})
  //     return <div  className="flex items-center justify-center min-h-screen w-full text-2xl">
  //     <span>No product found</span>
  //   </div>
  // }
  useEffect(()=>{
    fetchData()
  },[navigate])
  useEffect(()=>{
    fetchData(page)
  },[page])

  useEffect(() => {
    if (!loading && allProducts.length === 0) {
      setPageDetails({
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
        },
      });
    }
  }, [loading, allProducts]);
  return (
    <div className=' pt-32 '>
      <div className=' w-full flex justify-center'>
        <button onClick={ ()=>navigate('/products/add')}>Add Product</button>
      </div>
      <div className='max-w-7xl mx-auto flex justify-between mt-10'>
        <button onClick={()=>pageHandler(page-1,'prev')} disabled={loading} className={pageDetails?.pageInfo?.hasPreviousPage==false ? " opacity-0 invisible":" "}>Prev</button>
        <span className=' text-2xl'>Page No {page}</span>
        <button onClick={()=>pageHandler(page+1,'next')} disabled={loading} className={pageDetails?.pageInfo?.hasNextPage==false ? " opacity-0 invisible":" "}>Next</button>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
        
        { loading
        ? Array(6)
            .fill("")
            .map((_, idx) => <ShimmerCard key={idx} />)
        : 
          allProducts.map(product => (
          <ProductCard key={product.id} product={product} setConfirm={setConfirm} deleteHandler={deleteHandler} fetchData={fetchData} idToDelete={idToDelete} navigate={navigate}/>
        ))}
      </div>
      <div className='max-w-7xl mx-auto flex justify-between mb-7'>
        <button onClick={()=>pageHandler(page-1,'prev')} disabled={loading} className={pageDetails?.pageInfo?.hasPreviousPage==false ? " opacity-0 invisible":" "}>Prev</button>
        <span className=' text-2xl'>Page No {page}</span>
        <button onClick={()=>pageHandler(page+1,'next')} disabled={loading} className={pageDetails?.pageInfo?.hasNextPage==false ? " opacity-0 invisible":" "}>Next</button>
      </div>
      {confirm&&<ConfirmationModal setConfirm={setConfirm} deleteHandler={deleteHandler} />}
      <Outlet/>
    </div>
  )
}

export default Products