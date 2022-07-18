import { NextFunction, Request, Response } from "express";
import { Car } from "../models/car";

export class CarController {
  /**
   * authenticate authenticate api wit x-api-key
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const apiKey = req.get("x-api-key");
      if (!apiKey || apiKey !== "my-api-key1") {
        res.status(401).json({ error: "unauthorised" });
      } else {
        next();
      }
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  /**
   * Get all car meta-data
   * @param req Request
   * @param res Response
   */
  async getCar(req: Request, res: Response) {
    try {
      const cars = await Car.find({});
      const metaData = cars.map((car) => {
        return {"id": car.id, "brand" : car.brand, "color": car.color, "model": car.model}
      });
      res.status(200).send(metaData);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  /**
   * get car by Id
   * @param req Request
   * @param res Response
   * @returns res Response
   */
  async getCarById(req: Request, res: Response) {
    try {
      try {
        const car = await Car.findById(req.params.id);
        return res.status(200).json(car);
      } catch (e: any) {
        return res.status(404).json({ msg: "Car not found" });
      }
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  /**
   * create car in the system
   * @param req Reuest
   * @param res Response
   * @returns Response
   */
  async createCar(req: Request, res: Response) {
    try {
      //const { brand, color, model, name } = req.body;
      const car = new Car(req.body);
      await car.save();
      return res.status(201).send(car);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  /**
   * update a car data by Id
   * @param req Request
   * @param res Response
   * @returns 
   */
  async updateCarById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const carUpdate = req.body;
      try {
        await Car.findByIdAndUpdate(id, { $set: carUpdate });
        return res.status(200).json(carUpdate);
      } catch (e: any) {
        return res.status(404).json({ msg: "Car not found" });
      }
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  /**
   * Delete car by Id
   * @param req Request
   * @param res Response
   * @returns 
   */
  async deleteCarById(req: Request, res: Response) {
    try {
      try {
        const deleteResult = await Car.findByIdAndRemove(req.params.id);
        return res.status(200).json(deleteResult);
      } catch (e: any) {
        return res.status(404).json({ msg: "Car not found" });
      }
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  /**
   * Delete all car
   * @param req Request
   * @param res Response
   * @returns 
   */
  async deleteAllCar(req: Request, res: Response) {
    try {
      const deleteResult = await Car.remove();
      return res.status(200).json(deleteResult);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }
}
