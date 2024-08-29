
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './MemberMain.css';


export default function CreateOrganization(props) {
  const [message, setMessage] = useState('');
  const url = "http://localhost:5000/";
  const [formData, setFormData] = useState({
        userid: props.id,
        oName: '',
        oDesc: '',
        oCategory: '',
        oZip: ''
        });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        formData.userid = props.id

        const response = await fetch(`${url}add_organization`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
          setFormData({
            userid: props.id,
            oName: '',
            oDesc: '',
            oCategory: '',
            oZip: ''
            });
        }
    
      } catch (error) {
        console.error(error);
      }
      
      };


  return (
    <Container className="box">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Add New Organization</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Organization Name"
                name="oName"
                value={formData.oName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter A Category"
                name="oCategory"
                value={formData.oCategory}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formZip">
              <Form.Label>Organization Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zip Code"
                name="oZip"
                value={formData.oZip}
                onChange={handleChange}
                maxLength="5"
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description of the Organization</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={255}
                placeholder="Enter a description of this organization"
                name="oDesc"
                value={formData.oDesc}
                onChange={handleChange}

              />
              <input type="hidden" name="userid" value={props.id}/>
            </Form.Group>

            <Button style={{ backgroundColor: '#444E8A', color: 'white', padding: '8px 16px', margin: '.5rem', border: 'none', borderRadius: '5rem' }} type="submit"  >
              Add Organization</Button>
              {message && <p>{message}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
