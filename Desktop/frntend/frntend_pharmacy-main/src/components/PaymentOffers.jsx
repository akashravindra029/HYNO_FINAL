import React from "react";
import "../styles/PaymentOffers.css";

function PaymentOffers() {
  const offers = [
    "Flat 10% OFF with HSBC",
    "Up to ₹600 cashback via Amazon Pay",
    "Flat ₹150 OFF with AU Bank",
    "Get up to ₹650 cashback via MobiKwik",
  ];

  return (
    <div className="payment-offers" id="payment-offers">
      <h3>Payment Offers</h3>
      <div className="offer-row">
        {offers.map((offer, index) => (
          <div className="offer-card" key={index}>
            <img src="https://via.placeholder.com/50x50/ffc107/000000?text=Offer" alt="Offer Icon" />
            <p>{offer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentOffers;
