import express from "express";
import { CarController }  from '../controller/car-controller';
import {validateDto} from '../middleware/validate-dto';
import { carValidschema } from "../validator/ajv-schema";

const carController = new CarController();

const router = express.Router();

/**
 * All routes
 */

router.all("*", carController.authenticate);

/**
 * get car
 */
router.get("/car", carController.getCars);

/**
 * get car by Id
 */
router.get("/car/:id", carController.getCarById);

/**
 * create car
 */
router.post("/car" , validateDto(carValidschema), carController.createCar);

/**
 * update car data by id
 */
router.put("/car/:id", carController.updateCarById);

/**
 * delete car by id
 */
router.delete("/car/:id", carController.deleteCarById);

/**
 * delete all car
 */
router.delete("/car", carController.deleteAllCar);

export { router as CarRouter };
