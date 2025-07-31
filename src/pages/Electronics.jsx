import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from "../api/Baseurl";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";

function Electronics() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/products/?categorySlug=electronics`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const searchProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Electronics</h2>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search electronics"
      />

      <div className="row">
        {searchProducts.length === 0 ? (
          <div className="col-12 text-center">No products found</div>
        ) : (
          searchProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Electronics;
