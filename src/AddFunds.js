import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PickTheDate from './PickTheDate';
import './MemberMain.css';


export default function MakeDonation(props) {
  const [message, setMessage] = useState('');
  const url = "http://localhost:5000/";
  const [formData, setFormData] = useState({
        userid: props.id,
        fAmount: '',
        fDesc: '',
        fDate: null,
        });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {

    setFormData((prevState) => ({
      ...prevState,
      fDate: date,
    }));
  };
  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        let holdDate = formData.dDate
        formData.dDate = convertDate(holdDate);
        formData.userid = props.id
        const response = await fetch(`${url}add_funds`, {
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
            fAmount: '',
            fDesc: '',
            fDate: null,
            });
        }
      
        formData.fDate = holdDate
      } catch (error) {
        console.error(error);
      }
      
      // console.log('Form Data:', JSON.stringify(formData));
      };


  return (
    <Container className="box">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Add Funds</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount of Funds</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="fAmount"
                value={formData.fAmount}
                onChange={handleChange}
                step="0.01"
                required
              />
            </Form.Group>

            

            <Form.Group controlId="formDesc">
              <Form.Label>Information about these funds</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={255}
                placeholder=""
                name="fDesc"
                value={formData.fDesc}
                onChange={handleChange}

              />
              <input type="hidden" name="userid" value={props.id}/>
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Select Date</Form.Label>
              <PickTheDate selectedDate={formData.fDate} handleDateChange={handleDateChange} />
            </Form.Group>
            <Button style={{ backgroundColor: '#444E8A', color: 'white', padding: '8px 16px', margin: '.5rem', border: 'none', borderRadius: '5rem' }} type="submit"  >
              Add More Funds</Button>
              {message && <p>{message}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
