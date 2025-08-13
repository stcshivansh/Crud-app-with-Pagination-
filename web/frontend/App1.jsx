import { BrowserRouter } from "react-router-dom";
import Products from "../../frontend/src/components/Products";

export default function App1() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info


  return (
       <div>
        <Products/>
       </div>
  );
}
