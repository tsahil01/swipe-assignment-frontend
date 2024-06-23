import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import { ProductList } from "./pages/ProductList";
import ProductForm from "./components/ProductForm";
import Product from "./pages/Product";

const App = () => {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<Invoice />} />
          <Route path="/create/:id" element={<Invoice />} />
          <Route path="/edit/:id" element={<Invoice />} />
          <Route path="/products" element={<ProductList/>} />
          <Route path="/create-product" element={<ProductForm/>} />
          <Route path="/edit/product/:id" element={<Product/>} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
