import { User, Cat } from '../types/user.interface';
import { PouchSize } from '../constants';
import { pouchSizePrices } from '../constants';

// Helper to get a user by their ID
export function getUserById(users: User[], userId: string): User | undefined {
  return users.find((user) => user.id === userId);
}

// Helper to format the cat names based on their number
export function formatCatNames(cats: Cat[]): string {
  const catNames = cats.map((cat) => cat.name);

  if (catNames.length === 1) {
    return catNames[0];
  } else if (catNames.length === 2) {
    return `${catNames[0]} and ${catNames[1]}`;
  } else if (catNames.length > 2) {
    const lastCat = catNames.pop();
    return `${catNames.join(', ')} and ${lastCat}`;
  }

  return ''; // Return empty string if no cats
}

// Helper to calculate the total price based on active cats' pouch sizes
export function calculateTotalPrice(cats: { pouchSize: PouchSize }[]): number {
  return cats.reduce((total, cat) => {
    // Ensure the cat's pouchSize is a valid key in pouchSizePrices
    const price = pouchSizePrices[cat.pouchSize as PouchSize]; // Type assertion to guarantee that pouchSize is valid
    return total + (price || 0);
  }, 0);
}

// Helper to check if the user is eligible for a free gift based on total price
export function isFreeGiftEligible(totalPrice: number): boolean {
  return totalPrice > 120;
}


export function generateMessage(
  firstName: string,
  formattedCatNames: string,
  totalPrice: number,
): string {
  return `Hey ${firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatNames}'s fresh food. The total price is £${totalPrice.toFixed(2)}.`;
}
