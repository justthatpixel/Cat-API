// types.ts
export interface DeliveryDetails {
    title: string;
    message: string;
    totalPrice: number;
    freeGiftEligible: boolean;
  }
  
  export interface WelcomePageProps {
    userId: string;
  }
  