// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'; // For charting
import './App.css'; // For basic styling

// Get environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

function App() {
  const [prices, setPrices] = useState([]); // State to store fetched crypto prices
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Set loading to true before fetching
        setLoading(true);
        setError(null); // Clear previous errors

        // Make an authenticated GET request to the backend API
        const response = await axios.get(`${API_BASE_URL}/prices`, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`, // Send the authentication token
          },
        });

        // Update the prices state with the fetched data
        setPrices(response.data.data);
      } catch (err) {
        // Handle errors during the fetch operation
        console.error("Error fetching crypto prices:", err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(`Error: ${err.response.status} - ${err.response.data.detail || err.response.statusText}`);
        } else if (err.request) {
          // The request was made but no response was received
          setError("Network Error: No response from backend. Is the backend running?");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`An unexpected error occurred: ${err.message}`);
        }
      } finally {
        // Set loading to false after fetch operation completes (whether success or error)
        setLoading(false);
      }
    };

    // Call the fetch function when the component mounts
    fetchPrices();

    // Set up an interval to refetch data every 30 seconds (adjust as needed)
    const intervalId = setInterval(fetchPrices, 30000); // Fetch every 30 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="App p-4 bg-gray-100 min-h-screen flex flex-col items-center font-inter">
      <header className="App-header w-full max-w-4xl text-center py-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Crypto Price Dashboard</h1>
        <p className="text-lg text-gray-600">Real-time data from CoinCap API via FastAPI Backend</p>
      </header>

      <main className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl">
        {loading && (
          <div className="text-center text-blue-600 text-xl font-semibold">
            Loading crypto prices...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 text-xl font-semibold">
            {error}
          </div>
        )}

        {!loading && !error && prices.length === 0 && (
          <div className="text-center text-gray-600 text-xl font-semibold">
            No data available.
          </div>
        )}

        {!loading && !error && prices.length > 0 && (
          <div className="dashboard-content">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Top 10 Cryptocurrencies (USD)</h2>
            <div className="chart-container h-80 w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={prices}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="symbol" />
                  <YAxis domain={['auto', 'auto']} /> {/* Auto scale Y-axis */}
                  <Tooltip formatter={(value) => `$${parseFloat(value).toFixed(2)}`} />
                  <Legend />
                  {/* Dynamically generate lines for each cryptocurrency */}
                  {prices.map((p, index) => (
                    <Line
                      key={p.id}
                      type="monotone"
                      dataKey="priceUsd"
                      name={p.symbol}
                      stroke={`hsl(${index * 36}, 70%, 50%)`} // Generate distinct colors
                      activeDot={{ r: 8 }}
                      data={[{ symbol: p.symbol, priceUsd: p.priceUsd }]} // Pass single data point for individual line
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-3">Current Prices:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4 border-b border-gray-200">Name</th>
                    <th className="py-3 px-4 border-b border-gray-200">Symbol</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-right">Price (USD)</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-right">24h Change (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {prices.map((price) => (
                    <tr key={price.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{price.name}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{price.symbol}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900 text-right">${parseFloat(price.priceUsd).toFixed(4)}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-right">
                        <span className={price.changePercent24Hr >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {parseFloat(price.changePercent24Hr).toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full max-w-4xl text-center py-4 mt-8 text-gray-500 text-sm">
        Data provided by CoinCap API. Built with React, FastAPI, Docker, and AWS.
      </footer>
    </div>
  );
}

export default App;
