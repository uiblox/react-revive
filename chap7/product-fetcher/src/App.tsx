import { useState } from "react";
import { useFetch } from "./useFetch";
import { type Book } from "./ProductTypes";

function App() {
  // const [products, setProducts] = useState<Book[] | []>([]);
  const [url, setUrl] = useState("http://localhost:8000/products");
  const { data } = useFetch(url);
  console.log(data);

  return (
    <>
      <div className="products-layout">
        <div className="btn-wrapper">
          <button onClick={() => setUrl("http://localhost:8000/products")}>
            All
          </button>
          <button
            onClick={() =>
              setUrl("http://localhost:8000/products?in_stock=true")
            }
          >
            In Stock
          </button>
        </div>
        <ul className="product-list">
          {data
            ? data.map((product: Book) => {
                return (
                  <div key={product.id} className="product-card">
                    <h2 className="product-card_title">{product.name}</h2>
                    <span className="product-card_price">${product.price}</span>
                    <div>
                      <span className="product-card_stock">
                        {product.in_stock ? "In stock" : "Not in stock"}
                      </span>
                    </div>
                  </div>
                );
              })
            : "No Products to list"}
        </ul>
      </div>
    </>
  );
}

export default App;
