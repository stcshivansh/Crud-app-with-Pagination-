import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { PuffLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import ProductApi from '../apis/apis'
const {SINGLE_PRODUCT,UPDATE_PRODUCT,UPDATE_META, CREATE_PRODUCT,DELETE_META} = ProductApi
import ConfirmationModal from "../components/ConfirmationModal";
import { apiConnector } from "../apis/apiconnector";
import toast from "react-hot-toast";
const ProductsModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams(); 
  id="gid://shopify/Product/" + id;
  const [check,setCheck] = useState(false);
  const [m,setM]=useState(false)
  const isEditMode = location.pathname.includes("edit");
  const [product, setProduct] = useState({
    title:"",
    description:"",
    metafields:[]
  });
  const [meta,setMeta]=useState({
    key:"",
    value:"",
    namespace:"custom",
    type:"single_line_text_field"
  })
  const ids = useRef(null);
  const closeModal = () => {
    navigate(-1); // go back to previous page
  };
  const fetchData= async()=>{
      try {
        // setLoading
        setM(true)
        const response = await apiConnector('GET',SINGLE_PRODUCT,null,{id});
        setProduct(response)
      } catch (error) {
        console.log(error)
        navigate('/products'); 
      }
      finally{
        setM(false)
      }
    }
    const changeHandler=(e)=>{
      const { name, value } = e.target;
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    const metaHandler=(e)=>{
      const { name, value } = e.target;
      setMeta(prev => ({
        ...prev,
        [name === 'value' ? 'value' : 'key']: value
      }));
    }
    const addMetaHandler = () => {
      if (!meta.key || !meta.value) return;

      setProduct((prev) => {
        const existingIndex = prev.metafields.findIndex(m => m.key === meta.key);

        if (existingIndex !== -1) {
          const updatedMetafields = [...prev.metafields];
          updatedMetafields[existingIndex] = { ...updatedMetafields[existingIndex], value: meta.value };
          if (isEditMode) {
            updateMetaField();
          }
          return {
            ...prev,
            metafields: updatedMetafields
          };
        } else {
          if (isEditMode) {
            updateMetaField();
          }
          return {
            ...prev,
            metafields: [...prev.metafields, meta]
          };
        }
      });
      setMeta({    
        key: "",
        value: "",
        namespace: "custom",
        type: "single_line_text_field"
      });
    };

    const editHandler=(index)=>{
      const selectedMeta = product.metafields[index];
      selectedMeta.disable=true
      setMeta(selectedMeta)
    }
    const updateMetaField = async()=>{
      try {
            const toastId = toast.loading("Updating Meta..")
            const response = await apiConnector('PATCH',UPDATE_META,{
              id: product.id,
              namespace: meta.namespace,
              key: meta.key,
              value: meta.value,
              type: meta.type
            });
            toast.dismiss(toastId)
            
            toast.success("updated successfully")
            // console.log(response1)
            } catch (error) {
            console.log(error)
            }
            finally{

            }
    }
    const checkValidation =async( )=>{
      try {
        if(product.title==''){
          toast.error("Enter title")
          return
        }
        else if(!isEditMode){
          const toastId = toast.loading("Loading..")
          const response = await apiConnector('POST',CREATE_PRODUCT,{
              id: product.id,
              title: product.title,
              description: product.description,
              metafields: product.metafields
          });
            toast.dismiss(toastId)
            toast.success("Product Created successfully")
          }
        else{
          const toastId = toast.loading("Loading..")
          const response = await apiConnector('PATCH',UPDATE_PRODUCT,{
              id: product.id,
              title: product.title,
              description: product.description,
          });
          toast.dismiss(toastId)
          toast.success("Product Updated successfully")
        }
      } catch (error) {
        console.log(error)
      }
      finally{
        navigate('/products');
      }

    }
    const filterHelper=(id)=>{
      ids.current = id;
      setCheck(true)
    }
    const filterHandler = async ()=>{
      const id = ids.current;
      const obj = product.metafields[id]
      setProduct((prev) => ({
          ...prev,
          metafields: prev.metafields.filter((_, index) => index !== id)
        }));
        if(isEditMode){
        try {
            const toastId = toast.loading("Deleting Metafield..")
            const response = await apiConnector('DELETE',DELETE_META,{
                id: product.id,
                key: obj.key,
                namespace :obj.namespace
            });
            toast.dismiss(toastId)
            toast.success("Deleted successfully")
            fetchData()
            } 
        catch (error) {
            console.log(error)
            }
          finally{
              setCheck(false)
            }
        }
    }

  useEffect(() => {
    if (isEditMode) {
      fetchData();
    }
  },[id])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(2px)",  }}>
      <div className="bg-black p-6 rounded-md w-fit relative border border-white shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]">
       { m ?<PuffLoader color="#36d7b7" size={60} />:
        <div>
          <button
            className="absolute top-2 right-2 text-red-500"
            onClick={closeModal}
          >
            <ImCross size={16} />
          </button>
          <h2 className="text-xl font-bold mb-4">{isEditMode?"Edit":"Add"} Product</h2>

          {/* Your form content here */}
          <div className="flex gap-8 mb-4w">
            <div className="flex flex-col gap-4">
              <label htmlFor='title'>Title</label>
              <input id='title' name='title' value={product.title || ""} className=' p-1' onChange={changeHandler}/>
              <label htmlFor='description'>Description</label>
              <textarea className='border border-white rounded-md p-1.5'
              rows={4} id='description' name='description' value={product.description || ""} onChange={changeHandler}/>
              <label>Metafields</label>
              <label htmlFor='key'>Key</label>
              <input id='key' name='key' disabled={meta.disable} value={meta?.key|| ""} onChange={metaHandler}/>
              <label htmlFor='value'>Value</label>
              <input id='value' name='value' value={meta?.value || ""} onChange={metaHandler}/>
              <button className=' rounded-md w-fit' onClick={addMetaHandler}>Add meta</button>
              <button className=' rounded-md w-fit' onClick={()=>{
                checkValidation()
              }}>{isEditMode ?"Update Product" : "Add Product"}</button>
            </div>
            <div className=' flex flex-col gap-3 '>
              <span>Title : {product.title || ""}</span>
              <span>Description : {product.description|| ""}</span>
              <span>Metafields :</span>
              <div className=" max-h-32">
                {
                  product && product.metafields.map((prod,index)=>(
                  <div className='flex justify-between items-center gap-4'>
                    <div className=" w-fit">        
                      <span>Key : {prod.key}</span><br/>
                      <span>Value : {prod.value}</span>
                    </div>
                    <div className=" ">
                      <button className=' rounded-md h-10' onClick={()=>editHandler(index)}>edit</button>
                      <button className=' rounded-md h-10' onClick={()=>filterHelper(index)}>
                        <ImCross size={10} />
                      </button>

                    </div>
                  </div>
                ))
              }
              </div>
          </div>
          </div>
          {check&&<ConfirmationModal setCheck={setCheck} filterHandler={filterHandler}/>}
        </div>}
      </div>
      
    </div>
  );
};

export default ProductsModal;