import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajvInstance = new Ajv({allErrors:true})
addFormats(ajvInstance);

const schema = {
    type: "object",
    properties: {
      brand: {
        type: "string"
      },
      color: {
        type: "string"
      },
      model: {
        type: "string"
      },
      name: {
        type: "string"
      },
      year: {
        type: "string"
      },
      countryCode: {
        type: "string",
        enum: ['US', 'EU']
      },
    },
    required: ["brand", "color", "model", "name", "year"],
    additionalProperties: false
  };
  // validate is a type guard  - type is inferred from schema type
 const carValidschema =  ajvInstance.compile(schema);
 export {carValidschema}
