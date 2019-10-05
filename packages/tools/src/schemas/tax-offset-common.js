import debtTypes from "./debt-types";
import personalInfo from "./personal-info";
import usaStates from "./usa-states";
import yesnoSchema from "./yesno-schema";

const schemas = {
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
    properties: {
      FFELLoan: {
        properties: {
          "ffel-loan-radio-option-group": yesnoSchema({
            description:
              "If you have a FFEL loan, add the name and address of your guaranty agency in the box below. The name and address may appear on the tax offset notice you received in the mail. If you don't know the name and address of your guarantor, you can contact the Department of Education or call 1-800-304-3107 and ask for this information.",
            keyName: "ffel-loan-radio-option",
            title: "Are you a FFEL holder?",
            yesProps: {
              guarantyAgencyDetails: {
                properties: {
                  guarantyAgency: {
                    title: "Name",
                    type: "string",
                  },
                  guarantyAgencyCity: {
                    title: "City",
                    type: "string",
                  },
                  guarantyAgencyMailingAddress: {
                    title: "Address",
                    type: "string",
                  },
                  guarantyAgencyState: {
                    $ref: "#/definitions/usa-states",
                    title: "State",
                  },
                  guarantyAgencyZipCode: {
                    pattern: "[0-9]{5}",
                    title: "Zip Code",
                    type: "string",
                  },
                },
                required: ["address", "city", "name", "state", "zip-code"],
                title: "Guaranty Agency details",
                type: "object",
              },
            },
          }),
        },
        title: "FFEL Loan",
        type: "object",
      },
      personalInformation: {
        description: "Let’s get started, tell us about you",
        properties: {
          ...personalInfo,
        },
        required: [
          "address1",
          "dob",
          "city",
          "email",
          "name",
          "ssn",
          "state",
          "phone",
          "phone2",
          "zip-code",
        ],
        title: "Personal Information",
        type: "object",
      },
      yourSchool: {
        description:
          "Information related to the school where you incurred the debt",
        properties: {
          attend: {
            properties: {
              "school-attended-from": {
                format: "date",
                title: "from",
                type: "string",
              },
              "school-attended-to": {
                format: "date",
                title: "to",
                type: "string",
              },
            },
            required: ["from", "to"],
            title: "When did you attend the school?",
            type: "object",
          },
          "school-address": {
            title: "Address",
            type: "string",
          },
          "school-city": {
            title: "City",
            type: "string",
          },
          "school-state": {
            $ref: "#/definitions/usa-states",
            title: "State",
          },
          "school-zip-code": {
            pattern: "[0-9]{5}",
            title: "Your Zip Code",
            type: "string",
          },
          schoolName: {
            title: "Name",
            type: "string",
          },
        },
        required: [
          "school-address",
          "attend",
          "school-city",
          "schoolName",
          "school-state",
          "school-zip-code",
        ],
        title: "Your School",
        type: "object",
      },
    },
    title: "Dispute Your Tax Return Being Taken",
    type: "object",
  },
  ui: {
    FFELLoan: {
      "ffel-loan-radio-option-group": {
        "ffel-loan-radio-option": {
          "ui:widget": "radio",
        },
      },
      "ui:order": ["*"],
    },
    personalInformation: {
      "ui:order": [
        "name",
        "ssn",
        "address1",
        "city",
        "state",
        "zip-code",
        "dob",
        "email",
        "*",
      ],
    },
    "ui:order": ["personalInformation", "yourSchool", "FFELLoan", "*"],
    yourSchool: {
      "ui:order": ["name", "address", "city", "state", "zip-code", "*"],
    },
  },
};

export default schemas;
