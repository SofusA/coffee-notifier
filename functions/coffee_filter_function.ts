import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";

const MQTT_URL = Deno.env.get("MQTT_URL") as string;
const MQTT_TOPIC = Deno.env.get("MQTT_TOPIC") as string;

export const CoffeeFilterDefinition = DefineFunction({
  callback_id: "coffee_filter_function",
  title: "Publish to mqtt",
  description: "Publish to mqtt",
  source_file: "functions/coffee_filter_function.ts",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "Message from channel",
      },
    },
    required: ["message"],
  },
});

export default SlackFunction(
  CoffeeFilterDefinition,
  async ({ inputs }) => {
    const { message } = inputs;

    console.log("message received: ", message);

    if (message.includes("Coffee is brewing")) {
      await send_message("brewing");
    }

    if (message.includes("Coffee is ready")) {
      await send_message("ready");
    }

    return { outputs: { message } };
  },
);

const send_message = async (message: string) => {
  const client = new Client({ url: MQTT_URL });
  await client.connect();
  await client.publish(MQTT_TOPIC, message);
  await client.disconnect();
};
