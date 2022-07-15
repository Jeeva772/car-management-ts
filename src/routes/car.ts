import express from "express";
import { CarController }  from '../controller/car-controller';
import {validateDto} from '../middleware/validate-dto';
import { carValidschema } from "../validator/ajv-schema";

const carController = new CarController();

const router = express.Router();

router.all("*", carController.authenticate);

router.get("/car", carController.getCar);

router.get("/car/:id", carController.getCarById);

router.post("/car" , validateDto(carValidschema), carController.createCar);

router.put("/car/:id", carController.updateCarById);

router.delete("/car/:id", carController.deleteCarById);

router.delete("/car", carController.deleteAllCar);

export { router as CarRouter };
