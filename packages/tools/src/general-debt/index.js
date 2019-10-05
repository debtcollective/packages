import debtTypes from "../schemas/debt-types";
import usaStates from "../schemas/usa-states";

const generalDebtSchema = {
  json: {
    $schema: "http://json-schema.org/schema#",
    definitions: {
      "debt-types": {
        enum: debtTypes.values,
        enumNames: debtTypes.labels,
        type: "string",
      },
      "usa-states": {
        enum: usaStates.values,
        enumNames: usaStates.labels,
        type: "string",
      },
    },
    description:
      "This dispute is for all types of debt in collections except student loans.",
    properties: {
      collectionNotice: {
        properties: {
          "collection-notice-date": {
            format: "date",
            title: "Collection notice date",
            type: "string",
          },
        },
        required: ["collection-notice-date"],
        title: "Collection notice",
        type: "object",
      },
      debts: {
        dependencies: {
          debtType: {
            oneOf: [
              {
                properties: {
                  debtType: {
                    enum: [debtTypes.values[0]],
                    title: debtTypes.labels[0],
                  },
                },
              },
              {
                properties: {
                  debtType: {
                    enum: [debtTypes.values[1]],
                    title: debtTypes.labels[1],
                  },
                },
              },
              {
                properties: {
                  debtDescription: {
                    title: "Description",
                    type: "string",
                  },
                  debtType: {
                    enum: [debtTypes.values[2]],
                    title: debtTypes.labels[2],
                  },
                },
              },
            ],
          },
        },
        description:
          "Please provide the amount of debt collectors claim you owe. This will help us better understand the types of debt you and our members are fighting. ",
        properties: {
          debtAmount: {
            $format: "currency",
            title: "Amount",
            type: "number",
          },
          debtType: {
            $ref: "#/definitions/debt-types",
            title: "Debt Type",
            type: "string",
          },
        },
        required: ["debtType", "debtAmount"],
        title: "Amount of Debt Disputed",
        type: "object",
      },
      personalInformation: {
        properties: {
          address: {
            title: "Your Mailing Address",
            type: "string",
          },
          "agency-address": {
            title: "Collection agency’s or law firm’s mailing address",
            type: "string",
          },
          "agency-city": {
            title: "Collection agency’s or law firm’s City",
            type: "string",
          },
          "agency-name": {
            title: "Name of collection agency or law firm",
            type: "string",
          },
          "agency-state": {
            $ref: "#/definitions/usa-states",
            title: "Collection agency’s or law firm’s State",
          },
          "agency-zip-code": {
            pattern: "[0-9]{5}",
            title: "Collection agency’s or law firm’s Zip Code",
            type: "string",
          },
          city: {
            title: "Your City",
            type: "string",
          },
          name: {
            title: "Your Full Name",
            type: "string",
          },
          state: {
            $ref: "#/definitions/usa-states",
            title: "Your State",
          },
          "zip-code": {
            pattern: "[0-9]{5}",
            title: "Your Zip Code",
            type: "string",
          },
        },
        required: [
          "address",
          "agency-address",
          "agency-city",
          "agency-name",
          "agency-state",
          "agency-zip-code",
          "city",
          "name",
          "state",
          "zip-code",
        ],
        title: "Personal Information",
        type: "object",
      },
    },
    title: "Dispute Any Debt in Collections",
    type: "object",
  },
  ui: {
    debts: {
      debtAmount: {
        classNames: "prefix-currency",
      },
      debtType: {
        "ui:help": "If you don't see your type of debt, choose 'Other'",
        "ui:placeholder": "Select one",
      },
    },
    personalInformation: {
      address: {
        "ui:placeholder": "Street, unit number, floor, door number",
      },
      "agency-address": {
        "ui:placeholder": "Street, unit number, floor, door number",
      },
      "agency-city": {
        classNames: "field-address",
      },
      "agency-state": {
        classNames: "field-address",
        "ui:placeholder": "Select one",
      },
      "agency-zip-code": {
        classNames: "field-address",
      },
      city: {
        classNames: "field-address",
      },
      name: {
        "ui:placeholder": "Jane Doe",
      },
      state: {
        classNames: "field-address",
        "ui:placeholder": "Select one",
      },
      "ui:order": [
        "name",
        "address",
        "city",
        "state",
        "zip-code",
        "agency-name",
        "agency-address",
        "agency-city",
        "agency-state",
        "agency-zip-code",
      ],
      "zip-code": {
        classNames: "field-address",
      },
    },
    "ui:order": ["*", "debts", "personalInformation", "collectionNotice"],
  },
};

export default generalDebtSchema;
