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
        fetchDonations();
    }, [filters]);

    const fetchDonations = async () => {
        try {
            const response = await axios.get('/api/donations', {
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
                ) : (
                    <li>No donations found</li>
                )}
            </ul>
        </div>
    );
}

export default DonationHistory