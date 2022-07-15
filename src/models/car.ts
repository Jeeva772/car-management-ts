import mongoose, { model, Schema } from "mongoose";

interface ICar {
  brand: string;
  color: string;
  model: string;
}

// interface CarModelInterface extends mongoose.Model<CarDoc> {
//   build(attr: ICar): CarDoc;
// }

// interface CarDoc extends mongoose.Document {
//   brand: string;
//   color: string;
//   model: string;
// }
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
});

// carSchema.statics.build = (attr: ICar) => {
//     return new Car(attr)
//   }

const Car = model<ICar>("Car", carSchema);

export { Car };
