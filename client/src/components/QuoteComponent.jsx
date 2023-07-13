import { useState } from 'react';
import axios from 'axios';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function QuoteComponent() {
  const [quote, setQuote] = useState({ text: '', author: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);

  const generateQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://quote-generator-keqq.onrender.com');
      const quoteData = response.data;
      setQuote({
        text: quoteData.text,
        author: quoteData.author,
        category: quoteData.category,
      });
      setLoading(false);
      setCopied(false);
      setShowCopyButton(true);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setLoading(false);
      setCopied(false);
      setShowCopyButton(false);
    }
  };

  const copyToClipboard = () => {
    const quoteText = `${quote.text}`;
    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <div className='greeting-text-div'>
      <h1 className='greeting-text'>WELCOME TO THE QUOTE GENERATOR!</h1>
      </div>
      <p className="quote-description">
      Unleash the magic of words with our captivating quote generator. Find the perfect quote to uplift, motivate, and inspire you.
      </p>
      <div className="button-container">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <button className="generate-quote-button" onClick={generateQuote}>
            Generate Quote
          </button>
        )}
      </div>
      {quote.text && (
        <div className="quote-content">
          <div className="quote-box">
            <h1 className="quote-text">{quote.text}</h1>
            <p className="quote-paragraph">Author: {quote.author}</p>
            <p className="quote-paragraph">Category: {quote.category}</p>
          </div>
        </div>
      )}
      {showCopyButton && (
        <div className="copy-button-container">
          <button className="copy-button" onClick={copyToClipboard}>
            {copied ? (
              <span>
                <FontAwesomeIcon icon={faCheck} /> {''}
                Copied
              </span>
            ) : (
              'Copy Quote'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuoteComponent;
