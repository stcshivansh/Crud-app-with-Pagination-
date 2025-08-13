import {updateProduct as updateProductService, fetchProducts ,createProducts,deleteProduct as deleteProductService,deleteMetafield as deleteMeta,updateMetafield,updateSku as updateSkuField ,fetchSingleProduct} from '../service/product.service.js';
const getSingleProduct =  async (req, res) => {
  try {
    const {id}= req.headers
    // console.log(req.headers)
    // console.log(id)
    if(!id)return res.status(403).json({message:"idis required"})

    const products = await fetchSingleProduct(id);
    return res.status(200).json(products);

  } catch (error) {
    console.error("GraphQL error", error);
    return res.status(500).json({ error: error.message });
  }
}
const getProducts =  async (req, res) => {
  try {
    const {first,startcursor,endcursor,last}= req.headers
    if(first && last)return res.status(403).json({message:"first or last is required"})
    
    if(!first && !last){
      const products = await fetchProducts(10);
      return res.status(200).json(products);
    }
    const after = endcursor || null;
    const before = startcursor || null;
    const products = await fetchProducts(first,after,last,before);
    return res.status(200).json(products);

  } catch (error) {
    console.error("GraphQL error", error);
    return res.status(500).json({ error: error.message });
  }
}
const createProduct = async (req, res) => {
  try {
    const {title,description,options,variants,metafields} = req.body
    console.log(metafields)
    if(!title||!description)return res.status(401).json({message:"title or description is missing"})
    const result = await createProducts(title,description,metafields)
    res.status(201).json(result)
    
  } catch (error) {
    console.error("GraphQL error", error);
    res.status(500).json({ error: error.message });
  }
}
const deleteProduct =  async (req, res) => {
  try {
      const id = req.body?.id
      if(!id)return res.status(401).json({message:"id is missing"})
      const response = await deleteProductService(id)
      res.status(200).json(response.data)
    } catch (error) {
        console.error("GraphQL error", error);
        res.status(500).json({ error: error.message });
    }
}
const updateProduct = async (req, res) => {
  try {
    const {id,title,description} = req.body
    if(!id||!title||!description)return res.status(401).json({message:"id ,title or description is missing"})
    const response =await updateProductService(id,title,description)
    res.status(200).json(response.data);
    
  } catch (error) {
    console.error("GraphQL error", error);
    res.status(500).json({ error: error.message });
  }
}
const deleteMetafield = async (req, res) => {
    try {
        const { id, namespace, key } = req.body;
        if(!id||!namespace||!key)return res.status(401).json({message:"id ,namespace or key is missing"})
        const response =await deleteMeta(id, namespace, key);
        return res.status(200).json(response.data);
    } catch (err) {
        console.error("Error Deleting metafield:", err);
        return res.status(500).json({
            success: false,
            error: "Failed to update metafield"
        });
    }
}
// const updateSku = async (req, res) => {
//     try {
//       console.log("yaha pr ftra 1")
//         const { productId,variantId,sku} = req.body;
//         // console.log(id)
//         if(!productId||!variantId||!sku)return res.status(401).json({message:"productId ,variantId or sku is missing"})

//         const response =await updateMetafield(id, namespace, key, value, type);
//       console.log(response)
//         return res.status(200).json({message:response});
//     } catch (err) {
//         console.error("Error Deleting metafield:", err);
//         return res.status(500).json({
//             success: false,
//             error: "Failed to update metafield"
//         });
//     }
// }
const updateMeta = async (req, res) => {
    try {
      console.log("yaha pr ftra 1")
        const { id, namespace, key, value, type } = req.body;
        // if(!id||!namespace||!key||!value||!type)return res.status(401).json({message:"id ,namespace or key is missing"})
        const response =await updateMetafield(id, namespace, key, value, type);
        return res.status(200).json(response);
    } catch (err) {
        console.error("Error Deleting metafield:", err);
        return res.status(500).json({
            success: false,
            error: "Failed to update metafield"
        });
    }
  }
  
  
  const updateSku = async(req,res)=>{
    try {
      // console.log("yaha pr ftra 1")
        const { variantId,sku,productId } = req.body;
        // console.log(id)
      // if(!productId || !variants)return res.status(401).json({message:"product id or variants is missing"})
        const response =await updateSkuField(variantId,sku,productId);
        console.log("response is ",response)
        return res.status(200).json(response);
    } catch (err) {
        console.error("Error Deleting metafield:", err);
        return res.status(500).json({
            success: false,
            error: "Failed to update metafield"
        });
    }

}



export {getProducts,createProduct,deleteProduct,updateProduct,deleteMetafield,updateMeta,updateSku,getSingleProduct}
