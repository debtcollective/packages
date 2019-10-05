/* eslint sort-keys: 0 */

import wageGarnishmentCommonSchema from "../schemas/wage-garnishment-common";
import yesnoSchema from "../schemas/yesno-schema";

const wageGarnishmentCSchema = {
  ...wageGarnishmentCommonSchema,
  json: {
    ...wageGarnishmentCommonSchema.json,
    properties: {
      ...wageGarnishmentCommonSchema.json.properties,
      atb: {
        properties: {
          "atb-applying-as-group": yesnoSchema({
            keyName: "atb-applying-as",
            title: "Are you applying for this loan discharge as a parent?",
            yesProps: {
              "atb-student-name": {
                title: "Student name (Last, First, MI)",
                type: "string",
              },
              "atb-student-ssn": {
                title: "Student SSN",
                type: "string",
              },
            },
          }),
          // if no "Sorry, you are not eligible for this discharge."
          "atb-attended-at": {
            default: true,
            enum: [true],
            enumNames: ["Yes"],
            title:
              "Did you (or the student) attend college prior to July 1, 2012?",
            type: "boolean",
          },
          // if no "Sorry, you are not eligible for this discharge."
          "atb-attended-where": {
            default: true,
            enum: [true],
            enumNames: ["Yes"],
            title:
              "Were you (or the student), prior to July 1, 2012, officially registered in college and scheduled to attend?",
            type: "boolean",
          },
          // if no "Sorry, you are not eligible for this discharge."
          "atb-complete-credit": {
            default: true,
            enum: [true],
            enumNames: ["Yes"],
            title:
              "Did you (or the student) successfully complete 6 credit hours or 225 clock hours of coursework that applied toward a program offered by the school before you received a Direct or a FFEL loan?",
            type: "boolean",
          },
          "atb-enrolled-at": {
            format: "date",
            title: "When did you first enroll in college?",
            type: "string",
          },
          "atb-entrance-exam-group": yesnoSchema({
            keyName: "atb-entrance-exam",
            title:
              "Before you (or the student) enrolled in the college, were you given an entrance exam?",
            yesProps: {
              "atb-entrance-exam-date": {
                format: "date",
                title: "Give the date you took the test if you know it",
                type: "string",
              },
              "atb-entrance-exam-name": {
                title: "Give the name of the test if you know it",
                type: "string",
              },
              "atb-entrance-exam-score": {
                title: "Give the score of the test if you know it",
                type: "string",
              },
            },
          }),
          "atb-entrance-exam-improper-group": yesnoSchema({
            keyName: "atb-entrance-exam-improper",
            title:
              "Did anything appear improper about the way the test was given?",
            yesProps: {
              "atb-entrance-exam-improper-explain": {
                title: "Explain in detail what appeared improper",
                type: "string",
              },
            },
          }),
          "atb-entrance-exam-radio-option-group": yesnoSchema({
            keyName: "atb-entrance-exam-radio-option",
            title:
              "Can anyone support the statement that the test was not given properly?",
            yesProps: {
              "atb-entrance-exam-supporter-name": {
                description:
                  "Please provide a name, address, and phone number for that person.",
                title: "Full Name",
                type: "string",
              },
              "atb-entrance-exam-supporter-address": {
                title: "Mailing Address",
                type: "string",
              },
              "atb-entrance-exam-supporter-city": {
                title: "City",
                type: "string",
              },
              "atb-entrance-exam-supporter-state": {
                $ref: "#/definitions/usa-states",
                title: "State",
                type: "string",
              },
              "atb-entrance-exam-supporter-zip-code": {
                pattern: "[0-9]{5}",
                title: "Zip Code",
                type: "string",
              },
              "atb-entrance-exam-supporter-phone": {
                $format: "telephone",
                title: "Phone",
                type: "number",
              },
            },
          }),
          // if yes "Sorry, you are not eligible for this discharge."
          "atb-have-ged": {
            title:
              "Did you (or the student) have a high school diploma or a GED while enrolled?",
            type: "boolean",
            enum: [true, false],
            enumNames: ["Yes", "No"],
            default: false,
          },
          "atb-program-of-study": {
            title: "What was your (or the student's) program of study?",
            type: "string",
          },
          "atb-remedial-program-completed-group": yesnoSchema({
            keyName: "atb-remedial-program-completed",
            title:
              "Did you (or the student) complete a remedial program at the school?",
            yesProps: {
              "atb-remedial-program-from": {
                description:
                  "Provide the dates you were enrolled in the program",
                format: "date",
                title: "From",
                type: "string",
              },
              "atb-remedial-program-to": {
                format: "date",
                title: "To",
                type: "string",
              },
              "atb-remedial-program-courses": {
                title: "Which courses did you take in the program?",
                type: "string",
              },
              "atb-remedial-program-grades": {
                title: "Which grades did you earn in the program?",
                type: "string",
              },
            },
          }),
          "atb-school-date": {
            format: "date",
            title:
              "On what date did you (or the student) begin attending the school?",
            type: "string",
          },
          "atb-received-ged": {
            default: false,
            enum: [true, false],
            enumNames: ["Yes", "No"],
            title:
              "Did you (or the student) receive a GED before completing the program?",
            type: "boolean",
          },
        },
        required: ["attend-date", "attend-when-enroll", "attend-program"],
        title: "False Certification - Ability to Benefit",
        type: "object",
      },
    },
  },
  ui: {
    ...wageGarnishmentCommonSchema.ui,
    atb: {
      "atb-attended-at": {
        "ui:widget": "radio",
      },
      "atb-attended-where": {
        "ui:widget": "radio",
      },
      "atb-complete-credit": {
        "ui:widget": "radio",
      },
      "atb-received-ged": {
        "ui:widget": "radio",
      },
      "atb-applying-as-group": {
        "atb-applying-as": {
          "ui:widget": "radio",
        },
      },
      "atb-entrance-exam-group": {
        "atb-entrance-exam": {
          "ui:widget": "radio",
        },
      },
      "atb-entrance-exam-improper-group": {
        "atb-entrance-exam-improper": {
          "ui:widget": "radio",
        },
      },
      "atb-entrance-exam-radio-option-group": {
        "atb-entrance-exam-radio-option": {
          "ui:widget": "radio",
        },
      },
      "atb-remedial-program-completed-group": {
        "atb-remedial-program-completed": {
          "ui:widget": "radio",
        },
      },
      "atb-have-ged": {
        "ui:widget": "radio",
      },
    },
  },
};

export default wageGarnishmentCSchema;
