import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CoffeeFilterDefinition } from "../functions/coffee_filter_function.ts";

const CoffeeNotifierWorkflow = DefineWorkflow({
  callback_id: "coffee_notifier_workflow",
  title: "Notify mqtt workflow",
  description: "Notify mqtt that coffee is brewing or ready",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      message: {
        type: Schema.types.string,
      },
    },
    required: ["channel", "message"],
  },
});

CoffeeNotifierWorkflow.addStep(
  CoffeeFilterDefinition,
  {
    message: CoffeeNotifierWorkflow.inputs.message,
  },
);

export default CoffeeNotifierWorkflow;
