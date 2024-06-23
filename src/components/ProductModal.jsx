import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GenerateProductPDF = () => {
  html2canvas(document.querySelector("#productCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("product-details.pdf");
  });
};

const ProductModal = (props) => {
  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.closeModal}
        size="lg"
        centered
      >
        <div id="productCapture">
          <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
            <div className="w-100">
              <h6 className="fw-bold text-secondary mb-1">
                Product ID: {props.info.id || ""}
              </h6>
              <h4 className="fw-bold my-2">
                {props.info.name || "Unnamed Product"}
              </h4>
              <h7 className="fw-bold text-secondary mb-1">
                Product No.: {props.info.productNumber || ""}
              </h7>
            </div>
            <div className="text-end ms-4">
              <h6 className="fw-bold mt-1 mb-2">Rate:</h6>
              <h5 className="fw-bold text-secondary">
                {props.info.rate}
              </h5>
            </div>
          </div>
          <div className="p-4">
            <Row className="mb-4">
              <Col md={12}>
                <div className="fw-bold">Description:</div>
                <div>{props.info.description || "No description available"}</div>
              </Col>
            </Row>
          </div>
        </div>

      </Modal>
      <hr className="mt-4 mb-3" />
    </div>
  );
};

export default ProductModal;
