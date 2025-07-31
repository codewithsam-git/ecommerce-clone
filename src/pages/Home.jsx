import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api/Baseurl";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";

export default function Home({ category = "all" }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        const allProducts = response.data;
        // console.log(allProducts)
        const filterByCat =
          category === "all"
            ? allProducts
            : allProducts.filter(
                (product) =>
                  product.category?.name?.toLowerCase() === category.toLowerCase()
              );
        setProducts(filterByCat);
        setFilteredProducts(filterByCat);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // console.log(filtered);
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  if (loading) {
    return <div className="container my-4 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="container my-4 text-center text-danger">{error}</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">
        {category === "all" ? "All Products" : category}
      </h2>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products"
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