
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PickTheDate from './PickTheDate';

export default function MakeDonation(props) {
  const [allOrganizations, setAllOrganizations] = useState([]);

  useEffect(() => {
    let getOrganizations = async () => {
      try {

        const response = await fetch(`http://localhost:5000/get__all_organizations/${props.id}`);
        if (response.ok) {
          const data = await response.json();
          setAllOrganizations(data);
        } else {
          console.error('Failed to fetch organization data');
        }
      } catch (e) {
        console.error('Error:', e);
      }
    };
    getOrganizations();
  }, []);

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
              <Form.Label>Tzadaka Name</Form.Label>
              <Form.Control
                as="select"
                name="organization"
                value={formData.organization}
              >
                <option value="">Select a Tzedaka</option>
                
                 {allOrganizations.map((org) => {
                  return (
                    <option value={org.org_id}>{org.org_name}</option>
                  );
                })} 
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
