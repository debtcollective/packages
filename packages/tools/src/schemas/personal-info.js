export default {
  address1: {
    title: "Your Mailing Address",
    type: "string",
  },
  city: {
    title: "Your City",
    type: "string",
  },
  dob: {
    format: "date",
    title: "Date of Birth",
    type: "string",
  },
  email: {
    format: "email",
    title: "Email",
    type: "string",
  },
  name: {
    title: "Your Full Name",
    type: "string",
  },
  phone: {
    $format: "telephone",
    title: "Your telephone",
    type: "number",
  },
  phone2: {
    $format: "telephone",
    title: "Your telephone (alt.)",
    type: "number",
  },
  ssn: {
    title: "Social Security Number",
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
};
