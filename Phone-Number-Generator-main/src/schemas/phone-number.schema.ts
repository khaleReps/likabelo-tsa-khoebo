import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PhoneNumber extends Document {
  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  countryCode: string;

  @Prop()
  phoneNumberType: string;

  @Prop({ required: true })
  possibleNumber: boolean;

  @Prop({ required: true })
  validNumber: boolean;
}

export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);
