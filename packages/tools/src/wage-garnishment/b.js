import wageGarnishmentCommonSchema from "../schemas/wage-garnishment-common";

const wageGarnishmentBSchema = {
  ...wageGarnishmentCommonSchema,
  json: {
    ...wageGarnishmentCommonSchema.json,
  },
  ui: {
    ...wageGarnishmentCommonSchema.ui,
  },
};

export default wageGarnishmentBSchema;
