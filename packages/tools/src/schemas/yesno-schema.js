import keys from "lodash/keys";

/**
 * Factory for common approach where we need to ask users
 * a "yes" or "no" question and often times one of those will
 * lead into a branch for the form (open extra fields to fill)
 *
 * After the usage we need to manually add the groupName.keyName
 * into the uiSchema to render `"ui:widget": "radio"`
 */

export default ({ keyName, defaultValue, yesProps, noProps, ...rest }) => {
  const yesKeysPros = keys(yesProps);
  const noKeysPros = keys(noProps);

  return {
    dependencies: {
      [keyName]: {
        oneOf: [
          {
            properties: {
              ...noProps,
              [keyName]: {
                enum: [false],
              },
            },
            required: noKeysPros,
          },
          {
            properties: {
              ...yesProps,
              [keyName]: {
                enum: [true],
              },
            },
            required: yesKeysPros,
          },
        ],
      },
    },
    properties: {
      [keyName]: {
        default: defaultValue || false,
        enum: [true, false],
        enumNames: ["Yes", "No"],
        title: " ",
        type: "boolean",
      },
    },
    ...rest,
    type: "object",
  };
};
