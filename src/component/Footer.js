// import React from "react";
// import { Button, Col, Container, Row } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const FooterCmp = () => {

//     const navigate = useNavigate();

//     const handleNavigate = (path) => {
//         navigate(path);
//     }

//     return (
//         <footer className="bg-dark text-light text-center-md">
//             <Container className="pt-3">
//                 <Row>
//                 <Col md={4} className="mt-3">
//                         <h4>Company</h4>
//                         <p onClick={() => handleNavigate("/")} style={{ cursor : "pointer" }}>Home</p>
//                         <p onClick={() => handleNavigate("/registrationform")} style={{ cursor : "pointer" }}>Register Now</p>
//                         <p>About Us</p>
//                     </Col>

//                     <Col md={4} className="mt-3">
//                         <h4>Follow Us</h4>
//                         <p>Instagram</p>
//                         <p>Facebook</p>
//                         <p>Twitter</p>
//                     </Col>

//                     <Col md={4} className="mt-3" >
//                         <h4>Contact Us</h4>
//                         <p>Email : info@example.com</p>
//                         <p>Phone : +123 456 7890</p>
//                     </Col>
//                 </Row>
//                 <hr />
//                 <Row>
//                     <Col className="text-center">
//                         <p>&copy; 2024 E-Gaming. All Rights Reserved.</p>
//                     </Col>
//                 </Row>
//             </Container>
//         </footer>
//     );
// }

// export default FooterCmp;

import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

export default function FooterCmp() {
  return (
    // <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
    //   <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
    //     <div className='me-5 d-none d-lg-block'>
    //       <span>Get connected with us on social networks:</span>
    //     </div>

    //     <div>
    //       <p className='me-4 text-reset'>
    //         <MDBIcon fab icon="facebook-f" />
    //       </p>
    //       <p className='me-4 text-reset'>
    //         <MDBIcon fab icon="twitter" />
    //       </p>
    //       <p className='me-4 text-reset'>
    //         <MDBIcon fab icon="google" />
    //       </p>
    //       <p className='me-4 text-reset'>
    //         <MDBIcon fab icon="instagram" />
    //       </p>
    //       <p className='me-4 text-reset'>
    //         <MDBIcon fab icon="linkedin" />
    //       </p>
    //       <p className='me-4 text-reset'>
    //         <MDBIcon fab icon="github" />
    //       </p>
    //     </div>
    //   </section>

    //   <section className=''>
    //     <MDBContainer className='text-center text-md-start mt-5'>
    //       <MDBRow className='mt-3'>
    //         <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
    //           <h6 className='text-uppercase fw-bold mb-4'>
    //             <MDBIcon icon="gem" className="me-3" />
    //             Company name
    //           </h6>
    //           <p>
    //             Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
    //             consectetur adipisicing elit.
    //           </p>
    //         </MDBCol>

    //         <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
    //           <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
    //           <p>
    //             <p href='#!' className='text-reset'>
    //               Angular
    //             </p>
    //           </p>
    //           <p>
    //             <p href='#!' className='text-reset'>
    //               React
    //             </p>
    //           </p>
    //           <p>
    //             <p href='#!' className='text-reset'>
    //               Vue
    //             </p>
    //           </p>
    //           <p>
    //             <p href='#!' className='text-reset'>
    //               Laravel
    //             </p>
    //           </p>
    //         </MDBCol>

    //         <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
    //           <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
    //           <p>
    //             <p href='#!' className='text-reset'>
    //               Pricing
    //             </p>
    //           </p>
    //           <p>
    //             <p href='#!' className='text-reset'>
    //               Settings
    //             </p>
    //           </p>
    //           <p>
    //             <p href='#!' className='text-reset'>
    //               Orders
    //             </p>
    //           </p>
    //           <p>
    //             <p href='#!' className='text-reset'>
    //               Help
    //             </p>
    //           </p>
    //         </MDBCol>

    //         <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
    //           <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
    //           <p>
    //             <MDBIcon icon="home" className="me-2" />
    //             New York, NY 10012, US
    //           </p>
    //           <p>
    //             <MDBIcon icon="envelope" className="me-3" />
    //             info@example.com
    //           </p>
    //           <p>
    //             <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
    //           </p>
    //           <p>
    //             <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
    //           </p>
    //         </MDBCol>
    //       </MDBRow>
    //     </MDBContainer>
    //   </section>

    //   <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
    //     © 2024 E-Gaming. All Rights Reserved.
    //   </div>
    // </MDBFooter>
    <div className="">
      <div className="footer-divider" />
      <div className="text-center p-5">
        <h1>Essential E-Gaming</h1>
        <p>
          Immerse yourself in adrenaline-pumping battles and compete against the
          best to claim your victory on essential-egaming.web.app today!
        </p>
      </div>
      <div className="d-flex gap-5 justify-content-between ms-4 me-4 border-top border-secondary footer-responsive footer-padding">
        <div className="footer-rights">
          <p>&copy; 2024 Essentail E-Gaming | All Rights Reserved.</p>
        </div>
        <div className="d-flex flex-wrap gap-4 footer-tabs">
          <p>
            <NavLink to={"/"}>Home</NavLink>
          </p>
          <p>
            <NavLink to={"/events"}>Events</NavLink>
          </p>
          <p>
            <NavLink to={"/registrationform"}>Register Now</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
