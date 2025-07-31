import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from "../api/Baseurl";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";

function Furnitures() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/products?categorySlug=furnitures`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Furnitures</h2>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search furniture"
      />

      <div className="row">
        {filteredProducts.length === 0 ? (
          <div className="col-12 text-center">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Furnitures;
