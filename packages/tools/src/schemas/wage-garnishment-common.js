/*eslint sort-keys: 0*/

import personalInfo from "./personal-info";
import usaStates from "./usa-states";
import yesnoSchema from "./yesno-schema";

const schemas = {
  json: {
    $schema: "http://json-schema.org/schema#",
    definitions: {
      "usa-states": {
        enum: usaStates.values,
        enumNames: usaStates.labels,
        type: "string",
      },
    },
    properties: {
      // TODO: Add a confirmation like: "Are you sure you don't want to authorize the Debt Collective to advocate directly on your behalf?" in case of No
      "doe-privacy-release": {
        default: false,
        description:
          "Would you like to authorize the Debt Collective to speak to the Department of Education and its agents about your case?",
        enum: [true, false],
        enumNames: ["Yes", "No"],
        title: "Department of Education Privacy Release",
      },
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
      "employment-radio-option-group": yesnoSchema({
        defaultValue: false,
        keyName: "employment-radio-option",
        title: "Are You Currently employed?",
        yesProps: {
          employer: {
            title: "Current Employer",
            type: "string",
          },
          employmentDate: {
            format: "date",
            title: "Beginning Date",
            type: "string",
          },
          employerAddress1: {
            title: "Employer Mailing Address 1",
            type: "string",
          },
          employerCity: {
            title: "Employer City",
            type: "string",
          },
          employerState: {
            $ref: "#/definitions/usa-states",
            title: "Employer State",
          },
          employerZipCode: {
            pattern: "[0-9]{5}",
            title: "Employer Zip Code",
            type: "string",
          },
          employerPhone: {
            $format: "telephone",
            title: "Employer Phone",
            type: "number",
          },
        },
      }),
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
    title: "Here we need some personal, school and employment information.",
    type: "object",
  },
  ui: {
    "doe-privacy-release": {
      "ui:widget": "radio",
    },
    FFELLoan: {
      "ffel-loan-radio-option-group": {
        "ffel-loan-radio-option": {
          "ui:widget": "radio",
        },
      },
      "ui:order": ["*"],
    },
    "employment-radio-option-group": {
      "employment-radio-option": {
        "ui:widget": "radio",
      },
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
    "ui:order": [
      "personalInformation",
      "yourSchool",
      "FFELLoan",
      "employment-radio-option",
      "*",
      "doe-privacy-release",
    ],
    yourSchool: {
      "ui:order": ["name", "address", "city", "state", "zip-code", "*"],
    },
  },
};

export default schemas;
