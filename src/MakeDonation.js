
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PickTheDate from './PickTheDate';
import './MemberMain.css';


export default function MakeDonation(props) {
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [message, setMessage] = useState('');
  const url = "http://localhost:5000/";
  const [formData, setFormData] = useState({
    userid: props.id,
    amount: '',
    orgid: '',
    note: '',
    dDate: null,
  });
  
  useEffect(() => {
    let getOrganizations = async () => {
      try {

        const response = await fetch(`${url}get__all_organizations/${props.id}`);
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
      dDate: date,
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
      // Prevent default form submission if used in a form
      e.preventDefault();
      

      
      try {
        let holdDate = formData.dDate
        formData.dDate = convertDate(holdDate);
        formData.userid = props.id
        //console.log(JSON.stringify(formData))
        const response = await fetch(`${url}donate`, {
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
            amount: '',
            orgid: '',
            note: '',
            dDate: null,
            });
        }
      
        formData.dDate = holdDate
      } catch (error) {
        console.error(error);
      }
      
      // console.log('Form Data:', JSON.stringify(formData));
      };


  return (
    <Container className="box">
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
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group controlId="formD">
              <Form.Label>Tzadaka Name</Form.Label>
              <Form.Control
                required
                as="select"
                name="orgid"
                value={formData.orgid}
                onChange={handleChange}>
                <option value="">Select a Tzedaka</option>
                
                 {allOrganizations.map((org) => {
                  return (
                    <option key={org.org_id} value={org.org_id}>{org.org_name}</option>
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
              <input type="hidden" name="userid" value={props.id}/>
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Select Date</Form.Label>
              <PickTheDate selectedDate={formData.dDate} handleDateChange={handleDateChange} />
            </Form.Group>
            <Button style={{ backgroundColor: '#444E8A', color: 'white', padding: '8px 16px', margin: '.5rem', border: 'none', borderRadius: '5rem' }} type="submit"  >
              Record Donation</Button>
              {message && <p>{message}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
