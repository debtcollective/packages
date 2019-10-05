/* eslint sort-keys: 0 */

import taxOffsetCommonSchema from "../schemas/tax-offset-common";
import yesnoSchema from "../schemas/yesno-schema";

const taxOffsetDSchema = {
  json: {
    ...taxOffsetCommonSchema.json,
    properties: {
      ...taxOffsetCommonSchema.json.properties,
      atbd: {
        properties: {
          "atbd-applying-as-group": yesnoSchema({
            keyName: "atbd-applying-as",
            title: "Are you applying for this loan discharge as a parent?",
            yesProps: {
              "atbd-student-name": {
                title: "Student name (Last, First, MI)",
                type: "string",
              },
              "atbd-student-ssn": {
                title: "Student SSN",
                type: "string",
              },
            },
          }),
          "atbd-program-of-study": {
            title: "What was your (or the student's) program of study?",
            type: "string",
          },
          "atbd-option-group": {
            dependencies: {
              "atbd-option": {
                oneOf: [
                  {
                    properties: {
                      "atbd-option": {
                        items: {
                          enum: ["atbd-option1"],
                        },
                      },
                    },
                  },
                  {
                    properties: {
                      "atbd-option": {
                        items: {
                          enum: ["atbd-option2"],
                        },
                      },
                    },
                  },
                  {
                    properties: {
                      "atbd-option": {
                        items: {
                          enum: ["atbd-option3"],
                        },
                      },
                    },
                  },
                  {
                    properties: {
                      "atbd-option": {
                        items: {
                          enum: ["atbd-option4"],
                        },
                      },
                    },
                  },
                  {
                    properties: {
                      "atbd-option": {
                        items: {
                          enum: ["atbd-option5"],
                        },
                      },
                      "atbd-option5-text": {
                        title: "Specify",
                        type: "string",
                      },
                    },
                    required: ["atbd-option5-text"],
                  },
                ],
              },
            },
            properties: {
              "atbd-option": {
                items: {
                  enum: [
                    "atbd-option1",
                    "atbd-option2",
                    "atbd-option3",
                    "atbd-option4",
                    "atbd-option5",
                  ],
                  enumNames: [
                    "Age",
                    "Physical Condition",
                    "Mental Condition",
                    "Criminal Record",
                    "Other",
                  ],
                  type: "string",
                },
                uniqueItems: true,
                title:
                  "You believe your loan should not be paid because of a violation of state regulations related to your:",
                type: "array",
              },
            },
            required: ["atbd-option"],
            minLength: 1,
            title: " ",
            type: "object",
          },
          "atbd-law": {
            title:
              "Which state law do you believe was violated by your school? Please include as much information as you can about the law, including the legal code number if you have it.",
            type: "string",
          },
          "atbd-reason-not-to-benefit-group": yesnoSchema({
            keyName: "atbd-reason-not-to-benefit",
            title:
              "Before issuing your loan, did the school ask you if there was an reason you could not benefit from your degree?",
            yesProps: {
              "atbd-inform": {
                default: false,
                enum: [true, false],
                enumNames: ["Yes", "No"],
                title:
                  "Did you inform the school of the disqualifying status before the loan was certified or originated?",
              },
            },
          }),
        },
        title: "Ability To Benefit - Disqualifying Status",
        type: "object",
      },
    },
  },
  ui: {
    ...taxOffsetCommonSchema.ui,
    atbd: {
      "atbd-applying-as-group": {
        "atbd-applying-as": {
          "ui:widget": "radio",
        },
      },
      "atbd-reason-not-to-benefit-group": {
        "atbd-reason-not-to-benefit": {
          "ui:widget": "radio",
        },
        "atbd-inform": {
          "ui:widget": "radio",
        },
      },
      "atbd-option-group": {
        "atbd-option": {
          "ui:widget": "checkboxes",
        },
      },
    },
  },
};

export default taxOffsetDSchema;
