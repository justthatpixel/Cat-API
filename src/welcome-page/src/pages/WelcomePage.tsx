import React, { useEffect, useState } from 'react';
import { DeliveryDetails, WelcomePageProps } from '../types/deliveryTypes'; // Import types
import '../styles/styles.css';

const WelcomePage: React.FC<WelcomePageProps> = ({ userId }) => {
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails | null>(null);

  useEffect(() => {
    // Set the mock data directly (this would be an async function in a real-life scenario)
    const mockData: DeliveryDetails = {
      title: "Your next delivery for Dorian and Ocie",
      message: "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
      totalPrice: 134,
      freeGiftEligible: true
    };

    // Set the mock data directly (instead of fetching from an API)
    setDeliveryDetails(mockData);
  }, [userId]);

  if (!deliveryDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="welcome-page-container">
      <div className="content-container">
        <div className="cat-image">
          <img src="http://geniusvets.s3.amazonaws.com/gv-blog/2017/08-cat-cancer-2.jpg" alt="Cat" />
        </div>
        <div className="text-content">
          <h1 id="delivery-title">{deliveryDetails.title}</h1>
          <p id="delivery-message">{deliveryDetails.message}</p>
          <p id="total-price">Total Price: £{deliveryDetails.totalPrice}</p>

          <div className="buttons">
            <button className="btn-green">SEE DETAILS</button>
            <button className="btn-outline-green">EDIT DELIVERY</button>
          </div>
          {deliveryDetails.freeGiftEligible && (
            <div className="free-gift-box">
              FREE GIFT
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
