import React, { useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useProductListData } from "../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productsSlice";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import ProductModal from "../components/ProductModal";

export const ProductList = () => {  
  const { productList, productsListSize } = useProductListData();
  const isListEmpty = productList.length === 0;
  const navigate = useNavigate();

  return (
    <Row>
      {console.log(productList)}
      <Col className="mx-auto" xs={12} md={8} lg={9}>
        <h3 className="fw-bold pb-2 pb-md-4 text-center">Products</h3>
        <Card className="d-flex p-3 p-md-4 my-3 my-md-4"> 
          {isListEmpty ? (
            <div className="d-flex flex-column align-items-center">
              <h3 className="fw-bold pb-2 pb-md-4">No products present</h3>
            </div>
          ) : (
            <Table responsive>

              <thead>
                <tr>
                  <th>Product No.</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </tbody>
            </Table>
          )}
          <div className="d-flex flex-column align-items-center">
            <Link to="/create-product">
                <Button variant="primary">Create Product</Button>
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

const ProductRow = ({ product }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEditClick = () => {
    navigate(`/edit/product/${product.id}`);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr>
      <td>{product.productNumber}</td>
      <td className="fw-normal">{product.name}</td>
      <td className="fw-normal">{product.description}</td>
      <td className="fw-normal">{product.rate}</td>
      <td style={{ width: "5%" }}>
        <Button variant="outline-primary" onClick={handleEditClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button>
      </td>
      <td style={{ width: "5%" }}>
        <Button variant="danger" onClick={() => handleDeleteClick(product.id)}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiTrash />
          </div>
        </Button>
      </td>
      <td style={{ width: "5%" }}>
        <Button variant="secondary" onClick={openModal}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BsEyeFill />
          </div>
        </Button>
      </td>

      <ProductModal
        showModal={isOpen}
        closeModal={closeModal}
        info={{
          isOpen,
          id: product.id,
          name: product.name,
          description: product.description,
          rate: product.rate,
          productNumber: product.productNumber,
        }}
      />
    </tr>
  );
};

export default ProductList;
