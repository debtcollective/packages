import wageGarnishmentCommonSchema from "../schemas/wage-garnishment-common";

const wageGarnishmentASchema = {
  ...wageGarnishmentCommonSchema,
  json: {
    ...wageGarnishmentCommonSchema.json,
  },
  ui: {
    ...wageGarnishmentCommonSchema.ui,
  },
};

export default wageGarnishmentASchema;
