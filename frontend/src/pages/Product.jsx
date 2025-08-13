import React, { useEffect, useRef, useState } from 'react'
import ProductApi from '../apis/apis'
import { apiConnector } from '../apis/apiconnector'
import toast from 'react-hot-toast'
import ProductCard from '../components/Products'
import Button from '../components/Button'
import ShimmerCard from '../components/ShimmerCard'
const {GET_PRODUCT} =ProductApi


const Products = () => {
    const [allProducts, setAllProducts] = useState([])
    const [page, setPage] = useState(1)
    const [pageDetails,setPageDetails] = useState({})
    const headers = useRef(null)
    const [loading,setLoading]=useState(false)

  const fetchData= async()=>{
    try {

      // let toastId
      // if(first){
      //   toastId = toast.loading("Fetching data..")
      // }
      setLoading(true)
      console.log(headers?.current)
      const response = await apiConnector('GET',GET_PRODUCT,null,headers?.current);
      // console.log(Array.isArray(response))
      const pageApi = response[response.length-1]
      
      response.pop();
      response.reverse()
      // if(toastId){
      //   toast.dismiss(toastId)
      //   toast.success("Fetched successfully")
      // }

      setPageDetails(pageApi);


      setAllProducts(response)
    } catch (error) {
      console.log(error)
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
  useEffect(()=>{
    fetchData()
  },[])
  useEffect(()=>{
    fetchData(page)
  },[page])


  return (
    <div className=' pt-32'>

      <div className='max-w-7xl mx-auto flex justify-between'>
        <button onClick={()=>pageHandler(page-1,'prev')} disabled={loading} className={pageDetails?.pageInfo?.hasPreviousPage==false ? " opacity-0 invisible":" "}>Prev</button>
        <span className=' text-2xl'>Page No {page}</span>
        <button onClick={()=>pageHandler(page+1,'next')} disabled={loading} className={pageDetails?.pageInfo?.hasNextPage==false ? " opacity-0 invisible":" "}>Next</button>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        { loading
        ? Array(6)
            .fill("")
            .map((_, idx) => <ShimmerCard key={idx} />)
        : 
          allProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className='max-w-7xl mx-auto flex justify-between mb-7'>
        <button onClick={()=>pageHandler(page-1,'prev')} disabled={loading} className={pageDetails?.pageInfo?.hasPreviousPage==false ? " opacity-0 invisible":" "}>Prev</button>
        <span className=' text-2xl'>Page No {page}</span>
        <button onClick={()=>pageHandler(page+1,'next')} disabled={loading} className={pageDetails?.pageInfo?.hasNextPage==false ? " opacity-0 invisible":" "}>Next</button>
      </div>
    </div>
  )
}

export default Products