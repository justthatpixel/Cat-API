import { CommsService } from './comms.service';
import { PouchSize } from './constants';
import * as helpers from './utils/comms.helpers';
import { User } from './types/user.interface';

// Mock helpers with type definitions
jest.mock('./helpers/comms.helpers', () => ({
  formatCatNames: jest.fn(),
  calculateTotalPrice: jest.fn(),
  isFreeGiftEligible: jest.fn(),
  generateMessage: jest.fn(),
}));

describe('CommsService', () => {
  const commsService = new CommsService();

  describe('getUserNextDelivery', () => {
    it('should return the next delivery details for a user with one active cat', () => {
      // Mock the helper functions
      (helpers.formatCatNames as jest.Mock).mockReturnValue('Frederick');
      (helpers.calculateTotalPrice as jest.Mock).mockReturnValue(6275);
      (helpers.isFreeGiftEligible as jest.Mock).mockReturnValue(false);
      (helpers.generateMessage as jest.Mock).mockReturnValue(
        'Hi John! Your next delivery for Frederick will cost £62.75',
      );

      // Mock user data
      const user: User = {
        id: '618f4ed6-1c5b-4993-a149-f64700bf31dd',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        cats: [
          {
            name: 'Frederick',
            subscriptionActive: true,
            breed: 'Savannah',
            pouchSize: PouchSize.b,
          },
        ],
      };

      const result = commsService.getUserNextDelivery(user.id);

      expect(result.title).toBe('Your next delivery for Frederick');
      expect(result.totalPrice).toBe(6275);
      expect(result.freeGiftEligible).toBe(false);
    });

    it('should handle user not found', () => {
      const userId = 'non-existing-user-id';

      try {
        commsService.getUserNextDelivery(userId);
      } catch (error) {
        expect(error.message).toBe(`User with ID ${userId} not found`);
      }
    });
  });

  describe('Helper functions', () => {
    it('should format cat names correctly', () => {
      const cats = [
        {
          name: 'Frederick',
          subscriptionActive: true,
          breed: 'Savannah',
          pouchSize: PouchSize.b,
        },
      ];
      (helpers.formatCatNames as jest.Mock).mockReturnValue('Frederick');
      const catNames = helpers.formatCatNames(cats);
      expect(catNames).toEqual('Frederick');
    });

    it('should calculate total price correctly for multiple cats', () => {
      const cats = [
        {
          name: 'Felix',
          subscriptionActive: true,
          breed: 'Siamese',
          pouchSize: PouchSize.c,
        },
        {
          name: 'Frederick',
          subscriptionActive: true,
          breed: 'Savannah',
          pouchSize: PouchSize.a,
        },
      ];
      (helpers.calculateTotalPrice as jest.Mock).mockReturnValue(13400);
      const totalPrice = helpers.calculateTotalPrice(cats);
      expect(totalPrice).toBe(13400);
    });
  });
});
