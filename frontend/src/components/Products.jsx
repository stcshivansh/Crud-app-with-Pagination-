import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ product,setConfirm,deleteHandler,idToDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const findId = (id) => {
    const res = id.split('/')
    return res[res.length-1]
  }
  return (
    <div className="max-w-md p-6 bg-black rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>

      {/* Variants */}
      <div className="mb-4 ">
        <h3 className="text-lg font-medium mb-2">Variants:</h3>
        {(product.variants.length   > 0) ? (
          <ul className="space-y-2 overflow-y-auto max-h-64">
            {product.variants.map((variant) => {
              const isDefaultTitle = variant?.selectedOptions?.[0]?.value === "Default Title";
              return (<li
                key={variant.id}
                className="border p-2 rounded bg-black"
              >
                <strong>SKU:</strong> {variant.sku||"Empty"} <br />
                <strong>Options:</strong>{" "}
                {isDefaultTitle
                  ? "No specific options"
                  : variant.selectedOptions
                      .map((opt) => `${opt.name}: ${opt.value}`)
                      .join(", ")
                }
              </li>)
            })}
          </ul>
        ) : (
          <p className="italic text-gray-500">No variants available.</p>
        )}
      </div>

      {/* Metafields */}
      <div className="overflow-y-auto max-h-64">
        <h3 className="text-lg font-medium mb-2">Metafields:</h3>
        {product.metafields.length > 0 ? (
          <ul className="space-y-2">
            {product.metafields.map(({ key, value, type, namespace }) => (
              <li
                key={key}
                className="border p-2 rounded bg-black"
              >
                <strong>Namespace:</strong> {namespace} <br />
                <strong>Key:</strong> {key} <br />
                <strong>Value:</strong>{" "}
                {type === "metaobject_reference" ? (
                  <code>{value}</code>
                ) : (
                  value
                )}{" "}
                <br />
                <small className="text-gray-500 italic">Type: {type}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-500">No metafields available.</p>
        )}
      </div>
      <div className="mt-4">
        <button onClick={()=>navigate(`/products/${findId(product.id)}/edit`,{ state: { backgroundLocation: location } })}>Edit</button>
        <button onClick={()=>{setConfirm(true);idToDelete.current=product.id}}>Delete</button>
      </div>
      
    </div>
  );
};

export default ProductCard;
