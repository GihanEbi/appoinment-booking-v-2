// schemas.ts
import Joi from 'joi';

// Schema for a user registration form
export const UserSchema = Joi.object({
  firstName: Joi.string().required().label('First Name'),
  lastName: Joi.string().required().label('Last Name'),
  email: Joi.string()
    .required()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .label('Email')
    .messages({ 'string.pattern.base': 'Invalid Email' }),
  phoneNo: Joi.string().required().label('Phone Number'),
});

// Schema for a user login form
export const LoginSchema = Joi.object({
  email: Joi.string()
    .required()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .label('Email')
    .messages({ 'string.pattern.base': 'Invalid Email' }),
  password: Joi.string().required().label('Password'),
});

// Schema for a user business details form
export const BusinessDetailsSchema = Joi.object({
  businessName: Joi.string().required().label('Business Name'),
  document: Joi.string().required().label('Document'),
  availableTimeSlotText: Joi.string()
    .required()
    .label('Available Time Slot Text'),
  appointmentTimePeriod: Joi.string()
    .required()
    .label('Appointment Time Period'),
});
