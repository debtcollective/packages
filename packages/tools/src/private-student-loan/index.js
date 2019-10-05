import debtTypes from "../schemas/debt-types";
import usaStates from "../schemas/usa-states";

const privateStudentLoanSchema = {
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
    description: `
    We can't tell you how long it will take for you to hear a response from the debt collector, since each collector handles disputes differently. We will prompt you to notify us when you get a reply. We are watching what happens with these disputes very closely so that we can find out which creditors are breaking the law and so we can find ways to work collectively to challenge them.
    Before you begin, please have on hand a digital copy of letter you received in the mail from the collection agency or law firm.',
    `,
    properties: {
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
                required: ["debtDescription"],
              },
            ],
          },
        },
        description:
          "Please provide the amount of debt collectors claim you owe. This will help us better understand the types of debt you and our members are fighting.",
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
        description: "Here we need some personal information.",
        properties: {
          "account-number": {
            title: "Account Number",
            type: "number",
          },
          address: {
            title: "Your Mailing Address",
            type: "string",
          },
          city: {
            title: "Your City",
            type: "string",
          },
          // TODO: validate upload type JPEG, PNG, PDF and max file size 5242880
          "collections-letter-uploader": {
            description:
              "Digital copy of letter you received in the mail from the collection agency or law firm",
            items: {
              properties: {
                file: {
                  format: "data-url",
                  title: "A collection Letter",
                  type: "string",
                },
              },
              type: "object",
            },
            title: "Collections Letter",
            type: "array",
          },
          "firm-address": {
            title: "Collection agency’s or law firm’s mailing address",
            type: "string",
          },
          "firm-city": {
            title: "Collection agency’s or law firm’s City",
            type: "string",
          },
          "firm-name": {
            title:
              "Name of the collection agency, firm, or creditor who last contacted you",
            type: "string",
          },
          "firm-state": {
            $ref: "#/definitions/usa-states",
            title: "Collection agency’s or law firm’s State",
          },
          "firm-zip-code": {
            pattern: "[0-9]{5}",
            title: "Collection agency’s or law firm’s Zip Code",
            type: "string",
          },
          "is-debt-in-default": {
            default: false,
            enum: [true, false],
            enumNames: ["Yes", "No"],
            title: "Is your debt in default?",
            type: "boolean",
          },
          "last-correspondence-date": {
            format: "date",
            title: "Date of Last Correspondence",
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
          "account-number",
          "address",
          "city",
          "collections-letter-uploader",
          "firm-address",
          "firm-city",
          "firm-name",
          "firm-state",
          "firm-zip-code",
          "is-debt-in-default",
          "last-correspondence-date",
          "name",
          "state",
          "zip-code",
        ],
        title: "Personal Information Form",
        type: "object",
      },
    },
    required: ["debts", "personalInformation"],
    title: "Gather Materials",
    type: "object",
  },
  ui: {
    debts: {
      debtType: {
        "ui:help": "If you don't see your type of debt, choose 'Other'",
        "ui:placeholder": "Select one",
      },
    },
    personalInformation: {
      address: {
        "ui:placeholder": "Street, unit number, floor, door number",
      },
      ssn: {
        "ui:placeholder": "###-##-####",
      },
      state: {
        "ui:placeholder": "Select one",
      },
      "ui:order": [
        "name",
        "address",
        "city",
        "state",
        "zip-code",
        "firm-name",
        "firm-address",
        "firm-city",
        "firm-state",
        "firm-zip-code",
        "account-number",
        "last-correspondence-date",
        "is-debt-in-default",
        "collections-letter-uploader",
      ],
    },
    "ui:order": ["*", "debts", "personalInformation"],
  },
};

export default privateStudentLoanSchema;
