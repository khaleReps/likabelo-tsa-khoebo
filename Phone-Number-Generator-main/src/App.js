import React, { useState } from 'react';
import { countries, callingCountries } from 'country-data';
import parsePhoneNumber from 'libphonenumber-js';
import axios from 'axios';
import mongoose from 'mongoose';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import connectDB from './db';


function App() {
  const [quantity, setQuantity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [totalValid, setTotalValid] = useState('');
  const [percentageValid, setPercentageValid] = useState(0);
  // const connectDB = require('./db');

  const generateNumbers = () => {
    const numbers = [];
    for (let i = 0; i < quantity; i++) {
      // generate a random phone number using the country code
      let number = `${countryCode}${Math.floor(Math.random() * 1000000000)}`;
      // make sure the number is 10 digits long including the country code
      while (number.length < 10) {
        number = `${countryCode}${Math.floor(Math.random() * 1000000000)}`;
      }
      numbers.push(number);
    }
    return numbers;
  };

  const submitNumbers = async () => {
    try {
      const numbers = generatedNumbers.map(number => parsePhoneNumber(number, countryCode));
      const validNumbers = numbers.filter(number => number.isValid());
      const invalidNumbers = numbers.filter(number => !number.isValid());
      const data = { validCount: validNumbers.length, invalidCount: invalidNumbers.length };
      const percentage = ((validNumbers.length / quantity) * 100).toFixed(2);
      setTotalValid(validNumbers.length);
      setPercentageValid(percentage);
    } catch (error) {
      console.error(error);
      // handle errors gracefully, providing helpful error messages to the user
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    const code = e.target.value;
    setCountryCode(code);
    const country = Object.values(countries.all).find(c => c.countryCallingCodes.includes(code));
    if (country) {
      setCountryName(country.name);
    } else {
      setCountryName('Invalid Country Code');
    }
  };

  const handleGenerateClick = () => {
    const numbers = generateNumbers();
    setGeneratedNumbers(numbers);
  };

  const handleSubmissionClick = () => {
    const validCount = submitNumbers();
    const percentage = ((validCount / quantity) * 100).toFixed(2);
    setTotalValid(validCount);
    setPercentageValid(percentage);
  };


  return (
    <div className="App">
      <Header />
      <div className="content mt-5">
        <label htmlFor="countryCode">Country Code:</label>
        <div className="col-lg-5 mx-auto">
          <input
            className="form-control"
            type="text"
            id="countryCode"
            placeholder="+1"
            value={countryCode}
            onChange={handleCountryCodeChange}
          />
        </div>
        <br />
        {countryName && (
          <div>
            <label htmlFor="countryName">Country: </label>
            <span id="countryName">{countryName}</span>
          </div>
        )}
        <br />
        <label htmlFor="quantity">Quantity:</label>
        <div className="col-lg-5 mx-auto">
          <input
            className="form-control"
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <br />
        <br />
        <button
          className="btn btn-outline-primary me-2"
          onClick={handleGenerateClick}
          disabled={!countryCode || !quantity}
        >
          Generate
        </button>
        <br />
        <br />
        {generatedNumbers.length > 0 && (
          <ul className="list-group col-lg-5 mx-auto">
            {generatedNumbers.map((number, index) => (
              <li className="list-group-item" key={index}>
                {number}
              </li>
            ))}
          </ul>
        )}
        <br />
        <button
          className="btn btn-primary"
          onClick={handleSubmissionClick}
          disabled={!generatedNumbers.length}
        >
          Submit
        </button>
        <br />
        {totalValid > 0 && (
          <p>
            Out of the {quantity} numbers generated, {totalValid} were found to be
            valid for the country, which calculates to {percentageValid}% valid
            results
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
  
}

export default App;
