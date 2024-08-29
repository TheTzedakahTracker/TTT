import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DonationHistory({ userId }) {
    const [donations, setDonations] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        startDate: '',
        endDate:''
    });

    useEffect(() => {
        fetch('#')
            .then(response => response.json())
            .then(data => setDonations(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    
    useEffect(() => {
        fetchDonations();
    }, [filters]);

    const fetchDonations = async () => {
        try {
            const response = await axios.get('#', {
                params: {
                    user_id: userId,
                    organization: filters.search || undefined,
                    startDate: filters.startDate || undefined,
                    endDate: filters.endDate || undefined,
                    
                }
            });
            setDonations(response.data);
        } catch (error) {
            console.error('Error fetching donation history:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h3>Donation History</h3>
            <div className="filters" style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="search"
                    placeholder="Search by Organization"
                    value={filters.search}
                    onChange={handleFilterChange}
                    style={{ marginRight: '20px' }}
                />
                <input 
                    type="date" 
                    placeholder="Start Date" 
                    value={filters.search} 
                    onChange={handleFilterChange} 
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input 
                    type="date" 
                    placeholder="End Date" 
                    value={filters.search} 
                    onChange={handleFilterChange} 
                    style={{ padding: '5px' }}
                />
                <button onClick={fetchDonations}>Apply Filters</button>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {donations.length > 0 ? (
                    donations.map((donation, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                                <p><strong>Date:</strong> {donation.date}</p>
                                <p><strong>Organization:</strong> {donation.organization}</p>
                                <p><strong>Amount:</strong> ${donation.amount}</p>
                            </div>
                        </li>
                    ))
                ) : (<div>
                    <h1>Donation List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Organization</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation, index) => (
                                <tr key={index}>
                                    <td>{donation.amount}</td>
                                    <td>{donation.organization}</td>
                                    <td>{donation.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </ul>
        </div>
    );
}

export default DonationHistory