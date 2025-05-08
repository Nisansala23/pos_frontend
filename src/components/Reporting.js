import React from 'react';
import './Reporting.css';

const Reporting = () => {
  // In a real application, you would fetch reporting data from a backend API
  const salesData = [
    { date: '2025-05-04', itemsSold: 15, totalRevenue: 1500.00 },
    { date: '2025-05-03', itemsSold: 20, totalRevenue: 2100.50 },
    // ... more data
  ];

  return (
    <div className="reporting-container">
      <h2>Sales Report</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Items Sold</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={index}>
              <td>{sale.date}</td>
              <td>{sale.itemsSold}</td>
              <td>${sale.totalRevenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"><strong>Total Revenue:</strong></td>
            <td>${salesData.reduce((sum, sale) => sum + sale.totalRevenue, 0).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      {/* You could add more reporting features here, like filtering by date, etc. */}
    </div>
  );
};

export default Reporting;