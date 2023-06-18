import { Controller, Post, Body } from '@nestjs/common';
import { PhoneNumberService } from './phone-number.service';
import { ValidatePhoneNumberDto } from '../dto/validate-phone-number.dto';

@Controller('phone-number')
export class PhoneNumberController {
  constructor(private readonly phoneNumberService: PhoneNumberService) {}

  @Post('validate')
  async validatePhoneNumber(@Body() validatePhoneNumberDto: ValidatePhoneNumberDto) {
    return this.phoneNumberService.validatePhoneNumber(validatePhoneNumberDto);
  }
}
