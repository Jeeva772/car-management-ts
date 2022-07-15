//import Ajv from "ajv";
import express, { NextFunction, Request, Response } from "express";
import { Car } from "../models/car";

//const ajv = new Ajv();

// validation middleware
// function validateBody(schema: object) {
//   const validate = ajv.compile(schema);
//   return (req: any, res: any, next: NextFunction) => {
//     if (!validate(req.body)) return res.status(400).json(validate.errors);
//     return next();
//   };
// }

const router = express.Router();

router.all("*", async (req: Request, res: Response, next:NextFunction) => {
  try {
    const apiKey = req.get('x-api-key')
    if (!apiKey || apiKey !== "my-api-key1") {
      res.status(401).json({error: 'unauthorised'})
    } else {
      next()
    }
  } catch (e: any) {
    res.status(500).send(e);
  }
});

router.get("/car", async (req: Request, res: Response) => {
  try {
    const car = await Car.find({});
    return res.status(200).send(car);
  } catch (e: any) {
    res.status(500).send(e);
  }
});

router.get("/car/:id", async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);
    return res.status(200).json(car);
  } catch (e: any) {
    res.status(500).send(e);
  }
});

router.post("/car" 
//,validateBody(Car.schema)
, async (req: Request, res: Response) => {
  try {
    const { brand, color, model } = req.body;
    const car = new Car({ brand, color, model });
    await car.save();
    return res.status(201).send(car);
  } catch (e: any) {
    res.status(500).send(e);
  }
});

router.put("/car/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const carUpdate = req.body;
    await Car.findByIdAndUpdate(id, { $set: carUpdate });
    const updatedCar = await Car.findById(id);
    return res.status(200).json(updatedCar);
  } catch (e: any) {
    res.status(500).send(e);
  }
});

router.delete("/car/:id", async (req, res) => {
  try {
    const deleteResult = await Car.findByIdAndRemove(req.params.id);
    return res.status(204).json(deleteResult);
  } catch (e: any) {
    res.status(500).send(e);
  }
});

export { router as CarRouter };
