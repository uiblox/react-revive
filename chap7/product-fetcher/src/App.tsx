import { useState, useEffect } from "react";
import { type Book } from "./ProductTypes";

function App() {
  const [products, setProducts] = useState<Book[] | []>([]);

  const fetchData = (params?: string) => {
    const url = params
      ? `http://localhost:8000/products${params}`
      : "http://localhost:8000/products";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  //localhost:8000/products?in_stock=true
  const handleBookList = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = (e.target as HTMLElement).textContent;

    if (action === "In Stock") {
      const result = products.filter((product) => {
        if (product.in_stock === true) return product;
      });
      fetchData("?in_stock=true");
      console.log("testing", result);
    }
    if (action === "All") {
      fetchData();
    }
  };
  return (
    <>
      <div className="products-layout">
        <div className="btn-wrapper">
          <button onClick={(e) => handleBookList(e)}>All</button>
          <button onClick={(e) => handleBookList(e)}>In Stock</button>
        </div>
        <ul className="product-list">
          {products.map((product) => {
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
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
