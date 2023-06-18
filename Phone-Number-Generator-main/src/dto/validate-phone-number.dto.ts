import { IsNotEmpty } from 'class-validator';

export class ValidatePhoneNumberDto {
  @IsNotEmpty()
  phoneNumber: string;
}
