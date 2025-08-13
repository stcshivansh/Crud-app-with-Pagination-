import { apiConnector } from "./axios.js";
import { getATfromDB } from "../utils/getATfromDb.js";

const fetchProducts = async (first,after,last,before)=>{
  try {
      const AT = await getATfromDB(process.env.SHOP)
      const headers = {
          "X-Shopify-Access-Token": AT ,
          "Content-Type": "application/json",
      };
    const query = `
      query ShopName($first: Int, $after: String,$last: Int, $before: String) {
        products(first: $first, after: $after ,last: $last, before: $before) {
          edges {
            node {
              id
              title
              description
              variants(first: 5) {
                edges {
                  node {
                    id
                    sku
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              metafields(namespace:"custom",first:50){
                edges {
                  node {
                    key
                    value
                    type
                    namespace
                  }
                }
              }
            }
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
        }
      }
    `;
    // const client = new shopify.api.clients.Graphql({ session });
    // console.log(client)
    // const countData = await client.request(query);
    const variables={
      
    }
    if(first){
      variables.first= +first,
      variables.after= after
    }
    if(last){
      variables.last= +last,
      variables.before=before
    }
    // console.log("first ",first)
    // console.log("last ",last)
    const countData = await apiConnector('POST',{query,variables},headers)
    // return countData
    
    // return filteredData
    const finalData = countData.data.products.edges.map((product)=>{
      return {
        id:product.node.id,
        title:product.node.title,
        description:product.node.description,
        variants:product.node.variants.edges.map((variant)=>{
          return{
            id:variant.node.id,
            sku:variant.node.sku,
            selectedOptions:variant.node.selectedOptions
          }
        }),
        metafields:product.node.metafields.edges.map((meta)=>meta.node
        )
      }}
    )
    finalData.push({pageInfo:countData?.data?.products?.pageInfo})
    return finalData;
    // return filteredData;
    } catch (error) {
        console.error("GraphQL error in service", error);
        throw error;
    }
}
const createProducts = async (title,description,metafields)=>{
    try {
      const AT = await getATfromDB(process.env.SHOP)
      const headers = {
          "X-Shopify-Access-Token": AT ,
          "Content-Type": "application/json",
      };
    const query = `
      mutation productCreate($input:ProductInput!){
        productCreate(input:$input){
          product{
            id
            title
            description
          }
          userErrors {
            field
            message
          }
        }
      }
    `
    const variables = {
      input: {
        title,descriptionHtml:`<strong>${description}</strong>`,metafields
      }
    };
    // const client = new shopify.api.clients.Graphql({ session });
    // const response = await client.request(query, {variables});
    const response = await apiConnector('POST',{query,variables},headers)
    return response;
    } catch (error) {
        console.error("GraphQL error in service", error);
        throw error;
    }
}
const deleteProduct = async(id)=>{
    try {
      const AT = await getATfromDB(process.env.SHOP)
      const headers = {
          "X-Shopify-Access-Token": AT ,
          "Content-Type": "application/json",
      };
        const query = `
        mutation productDelete($input:ProductDeleteInput!){
            productDelete(input:$input){
            deletedProductId
            userErrors {
                field
                message
            }
            }
        }
        `
        const variables = {
        input: {
            id
        }
        };
        // const client = new shopify.api.clients.Graphql({ session });
        // const response = await client.request(query, {variables});
        const response = await apiConnector('POST',{query,variables},headers)
        return response;
    } catch (error) {
        console.error("GraphQL error in service", error);
        throw error;
    }
}
const updateProduct = async(id,title,description)=>{
    try {
      const AT = await getATfromDB(process.env.SHOP)
      const headers = {
          "X-Shopify-Access-Token": AT ,
          "Content-Type": "application/json",
      };
        const query = `
      mutation productUpdate($input:ProductInput!){
        productUpdate(input:$input){
          product {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `
    const variables = {
      input:{
        id,title,descriptionHtml:description
      }
    };
    // const client = new shopify.api.clients.Graphql({ session });
    // const response = await client.request(query, {variables});
    const response = await apiConnector('POST',{query,variables},headers)
    return response;

    } catch (error) {
        console.error("GraphQL error in service", error);
        throw error;
    }
}
const deleteMetafield = async(id, namespace, key )=>{
  try {
     const AT = await getATfromDB(process.env.SHOP)
      const headers = {
          "X-Shopify-Access-Token": AT ,
          "Content-Type": "application/json",
      };
     const productGID = id.startsWith("gid://")
            ? id
            : `gid://shopify/Product/${id}`;
    const query = `
              mutation MetafieldsDelete($metafields: [MetafieldIdentifierInput!]!) {
            metafieldsDelete(metafields: $metafields) {
              deletedMetafields {
                key
                namespace
                ownerId
              }
              userErrors {
                field
                message
              }
            }
          }
        `
        const variables = {
            metafields: {
                ownerId: productGID,
                key,
                namespace
            }
        }
        const response = await apiConnector('POST',{query,variables},headers)
        return response
  } catch (error) {
        console.error("GraphQL error in service", error);
        throw error;
  }
}
const updateMetafield = async (id, namespace, key, value, type) => {
  try {
    const AT = await getATfromDB(process.env.SHOP);

    const headers = {
      "X-Shopify-Access-Token": AT,
      "Content-Type": "application/json",
    };

    const productGID = id.startsWith("gid://")
      ? id
      : `gid://shopify/Product/${id}`;

    const query = `
      mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            namespace
            key
            value
            type
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      metafields:
        [{
          ownerId: productGID,
          namespace,
          key,
          value,
          type,
        }]
    };

    const response = await apiConnector(
      "POST",{ query, variables },headers
    );

    return response;
  } catch (error) {
    console.error("GraphQL error in updateMetafield service", error);
    throw error;
  }
};

const updateSku = async (variantId, sku,productId) => {
  try {
    const AT = await getATfromDB(process.env.SHOP);
    const headers = {
      "X-Shopify-Access-Token": AT,
      "Content-Type": "application/json",
    };

      const query = `
         mutation productVariantUpdate($input: ProductVariantInput!) {
          productVariantUpdate(input: $input) {
            productVariant {
              id
              sku
            }
            userErrors {
              field
              message
            }
          }
        }`

    const variables = {
      input: {
        id: variantId,
        sku: sku,
      },
    };

    const response = await apiConnector(
      "POST",
      { query, variables },
      headers
    );

    return response;
  } catch (error) {
    console.error("GraphQL error in updateSku service", error);
    throw error;
  }
};

export {updateProduct, fetchProducts,createProducts,deleteProduct,deleteMetafield,updateMetafield,updateSku };