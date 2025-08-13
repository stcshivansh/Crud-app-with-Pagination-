import React from "react";

const ProductCard = ({ product }) => {
  
  return (
    <div className="max-w-md p-6 bg-black rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>

      {/* Variants */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Variants:</h3>
        {product.variants.length > 0 ? (
          <ul className="space-y-2">
            {product.variants.map((variant) => (
              <li
                key={variant.id}
                className="border p-2 rounded bg-black"
              >
                <strong>SKU:</strong> {variant.sku} <br />
                <strong>Options:</strong>{" "}
                {variant.selectedOptions
                  .map((opt) => `${opt.name}: ${opt.value}`)
                  .join(", ")}
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-500">No variants available.</p>
        )}
      </div>

      {/* Metafields */}
      <div>
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
    </div>
  );
};

export default ProductCard;
