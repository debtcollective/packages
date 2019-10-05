import debtTypes from "../schemas/debt-types";
import usaStates from "../schemas/usa-states";

const creditReportSchema = {
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
    Please have a photo of your picture ID ready to upload (taking a picture with your camera phone is fine).
    <br><br>
    Please make a list of all the errors that you want to dispute and be prepared to write a short statement explaining why those items should not negatively impact your credit. You will also have the option to upload a document highlighting errors on your report.
    <br><br>
    Please prepare all these materials before beginning this dispute. Once you begin, it will only take a few minutes to complete the dispute. Once you complete the dispute, a hard copy will be mailed to the credit reporting agency or agencies.',
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
        properties: {
          address: {
            title: "Your Mailing Address",
            type: "string",
          },
          agencies: {
            description: "Reporting agencies your dispute will be sent to",
            items: {
              enum: ["Experian", "Equifax", "TransUnion"],
              type: "string",
            },
            minItems: 1,
            title: "Reporting agencies",
            type: "array",
            uniqueItems: true,
          },
          city: {
            title: "Your City",
            type: "string",
          },
          currentCreditor: {
            title: "Current Creditor",
            type: "string",
          },
          dob: {
            format: "date",
            title: "Your date of birth?",
            type: "string",
          },
          email: {
            format: "email",
            title: "Your email",
            type: "string",
          },
          name: {
            title: "Your Full Name",
            type: "string",
          },
          originalCreditor: {
            title: "Original Creditor",
            type: "string",
          },
          phone: {
            $format: "telephone",
            title: "Your telephone",
            type: "number",
          },
          ssn: {
            $format: "ssn",
            title: "Your SSN",
            type: "number",
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
          "agencies",
          "city",
          "currentCreditor",
          "dob",
          "email",
          "name",
          "originalCreditor",
          "phone",
          "ssn",
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
      agencies: {
        "ui:widget": "checkboxes",
      },
      city: {
        classNames: "field-address",
      },
      name: {
        "ui:placeholder": "Jane Doe",
      },
      ssn: {
        "ui:placeholder": "###-##-####",
      },
      state: {
        classNames: "field-address",
        "ui:placeholder": "Select one",
      },
      "ui:order": [
        "name",
        "dob",
        "ssn",
        "address",
        "city",
        "state",
        "zip-code",
        "email",
        "phone",
        "currentCreditor",
        "originalCreditor",
        "agencies",
      ],
      "zip-code": {
        classNames: "field-address",
      },
    },
    "ui:order": ["*", "debts", "personalInformation"],
  },
};

export default creditReportSchema;
