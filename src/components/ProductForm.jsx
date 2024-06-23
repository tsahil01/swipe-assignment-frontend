import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/productsSlice";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import generateRandomId from "../utils/generateRandomId";
import { useProductListData } from "../redux/hooks";

const ProductForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.pathname.includes("edit"); // True or False

  const { getOneProduct, productsListSize } = useProductListData();
  
  const [formData, setFormData] = useState(
    isEdit ? getOneProduct(params.id) : {
          id: generateRandomId(),
          name: "",
          productNumber: productsListSize + 1,
          description: "",
          rate: 0,
        }
  );

  const editField = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = () => {
    if (isEdit) {
      dispatch(updateProduct({ id: params.id, updatedProduct: formData }));
      alert("Product updated successfully 🥳");
    } else {
      dispatch(addProduct(formData));
      alert("Product added successfully 🥳");
    }
    navigate("/products");
  };

  return (
    <Form onSubmit={handleAddProduct}>
      <div className="d-flex align-items-center">
        <BiArrowBack size={18} />
        <div className="fw-bold mt-1 mx-2 cursor-pointer">
          <Link to="/">
            <h5>Go Back</h5>
          </Link>
        </div>
      </div>

      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">Product&nbsp;Number:&nbsp;</span>
                  <Form.Control
                    type="number"
                    value={formData.productNumber}
                    name="productNumber"
                    onChange={(e) => editField(e.target.name, e.target.value)}
                    min="1"
                    style={{ maxWidth: "70px" }}
                    required
                  />
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Product Name:</Form.Label>
                <Form.Control
                  placeholder="Enter product name"
                  rows={3}
                  value={formData.name}
                  type="text"
                  name="name"
                  className="my-2"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Rate:</Form.Label>
                <Form.Control
                  placeholder="Enter product rate"
                  value={formData.rate}
                  type="number"
                  name="rate"
                  className="my-2"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  required
                />
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Description:</Form.Label>
                <Form.Control
                  placeholder="Enter product description"
                  rows={3}
                  value={formData.description}
                  type="text"
                  name="description"
                  className="my-2"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button
              variant="dark"
              onClick={handleAddProduct}
              className="d-block w-100 mb-2"
            >
              {isEdit ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
