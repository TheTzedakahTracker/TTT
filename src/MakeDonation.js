
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PickTheDate from './PickTheDate';

export default function MakeDonation() {
  console.log('inmk');
    const [formData, setFormData] = useState({
      amount: '',
      beneficiary: '',
      note: '',
      date: null,
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
      date: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Donation Form</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAmount">
              <Form.Label>Donation Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter donation amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBeneficiary">
              <Form.Label>Beneficiary Name</Form.Label>
              <Form.Control
                as="select"
                name="beneficiary"
                value={formData.beneficiary}
                onChange={handleChange}
              >
                <option value="">Select a beneficiary</option>
                <option value="Beneficiary1">Beneficiary 1</option>
                <option value="Beneficiary2">Beneficiary 2</option>
                <option value="Beneficiary3">Beneficiary 3</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formNote">
              <Form.Label>Short Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={255}
                placeholder="Enter a short note"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Select Date</Form.Label>
              <PickTheDate selectedDate={formData.date} handleDateChange={handleDateChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Record Donation</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
