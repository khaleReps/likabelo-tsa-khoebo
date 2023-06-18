import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import PhoneNumber from 'libphonenumber-js';
import { ValidatePhoneNumberDto } from './../dto/validate-phone-number.dto';
import { PhoneNumber as PhoneNumberModel } from './../schemas/phone-number.schema';

@Injectable()
export class PhoneNumberService {
  constructor(@InjectModel('PhoneNumber') private readonly phoneNumberModel: Model<PhoneNumberModel>) {}

  async validatePhoneNumber(validatePhoneNumberDto: ValidatePhoneNumberDto) {
    const phoneNumber = PhoneNumber.parse(validatePhoneNumberDto.phoneNumber);
    const isValid = PhoneNumber.isValidNumber(phoneNumber);
    const countryCode = PhoneNumber.getCountryCodeForRegion(phoneNumber.country);
    const numberType = PhoneNumber.getNumberType(phoneNumber);
    const isPossibleLength = PhoneNumber.isPossibleNumber(phoneNumber);
    const isValidForRegion = PhoneNumber.isValidNumberForRegion(phoneNumber, phoneNumber.country);

    const phoneNumberModel = new this.phoneNumberModel({
      phoneNumber: phoneNumber.formatNational(),
      countryCode,
      numberType,
      isPossibleLength,
      isValidForRegion,
    });

    await phoneNumberModel.save();

    return {
      phoneNumber: phoneNumber.formatNational(),
      countryCode,
      numberType,
      isPossibleLength,
      isValidForRegion,
      isValid,
    };
  }
}
