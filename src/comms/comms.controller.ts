import { Controller, Get, Param } from '@nestjs/common';
import { CommsService } from './comms.service'; // Import the comms service

@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  // Endpoint to get the user's next delivery details
  @Get('your-next-delivery/:userId')
  getUserNextDelivery(@Param('userId') userId: string) {
    console.log('Received userId from request:', userId);
    return this.commsService.getUserNextDelivery(userId);
  }
}
