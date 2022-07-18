import app from "../../index";
import request from "supertest";
import { CarController } from "../car-controller";
import { NextFunction, Request, Response } from "express";

describe("Get all cars /getcars", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let sendResponse: Partial<Response<any, Record<string, any>>>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        sendResponse = {
            send: jest.fn() 
        };
        mockResponse = {
            status: jest.fn().mockImplementation((code:number) => {
                return sendResponse;
            })            
        };
    });

  it("throw error if auth not provided", async () => {
    const res = await request(app).get("/car");
    expect(res.statusCode).toEqual(401);
  });

  it("returns all the cars in the system w/o auth", async () => {
    const res = await request(app).get("/car").set("x-api-key", "my-api-key1");
    expect(res.statusCode).toEqual(200);    
  });

  it('should throw 400 error if id is empty string', async () => {
    mockRequest = {
        headers: {
            'x-api-key': 'my-api-key1'
        }
    }
    const expectedResponse = {
        "status": 200
    };
    const ctrlr = new CarController();
    const spy = jest
        .spyOn(ctrlr, "getCars")
    
    await ctrlr.getCars(mockRequest as Request, mockResponse as Response);
    expect(spy).toHaveBeenCalled();
  });
});

