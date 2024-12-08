import { Injectable } from '@nestjs/common';
import * as usersData from '../../data.json'; // Import raw data
import { User } from './types/user.interface'; // Import the User interface
import * as helpers from './utils/comms.helpers'; // Import helper functions

@Injectable()
export class CommsService {
  private users: User[]; // Declare users as an array of User

  constructor() {
    if (Array.isArray(usersData)) {
      this.users = usersData as User[];
    } else if (usersData && Array.isArray((usersData as any).default)) {
      this.users = (usersData as any).default as User[];
    } else {
      throw new Error('Invalid data.json format: Expected an array of users');
    }
  }

  getUserNextDelivery(userId: string) {
    const user = this.users.find((user) => user.id === userId); // Look for the user by ID
    if (!user) {
      console.error('User not found:', userId);
      throw new Error('User not found');
    }

    // Perform the required calculations
    const activeCats = user.cats.filter((cat) => cat.subscriptionActive);
    const formattedCatNames = helpers.formatCatNames(activeCats);
    const totalPrice = helpers.calculateTotalPrice(activeCats);
    const freeGiftEligible = helpers.isFreeGiftEligible(totalPrice);
    const message = helpers.generateMessage(
      user.firstName,
      formattedCatNames,
      totalPrice,
    );

    // Construct the response
    return {
      title: `Your next delivery for ${formattedCatNames}`,
      message: message,
      totalPrice,
      freeGiftEligible,
    };
  }
}
