import mongoose, { model, Schema } from "mongoose";

/**
 * Interface for car
 */
interface ICar {
  brand: string;
  color: string;
  model: string;
  name: string;
  year: string;
  countryCode?: string;
}

/**
 * Car schema
 */
const carSchema = new Schema<ICar>({
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String
  },
});

const Car = model<ICar>("Car", carSchema);

export { Car };
