import { Controller, Post, Body } from '@nestjs/common';
import parsePhoneNumber from 'libphonenumber-js';

@Controller('phone')
export class PhoneController {
  @Post('submit')
  submitNumbers(@Body() body: { countryCode: string; numbers: string[] }): { validCount: number } {
    const validNumbers = body.numbers.filter((number) => {
      try {
        const parsedNumber = parsePhoneNumber(number, body.countryCode);
        return parsedNumber.isValid();
      } catch (error) {
        return false;
      }
    });
    return { validCount: validNumbers.length };
  }
}
