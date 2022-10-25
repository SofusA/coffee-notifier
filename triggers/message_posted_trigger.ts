import { Trigger } from "deno-slack-api/types.ts";
import CoffeeNotifierWorkflow from "../workflows/coffee_notifier_workflow.ts";

const CHANNEL_ID = Deno.env.get("CHANNEL_ID") as string;

const messagePostedTrigger: Trigger<typeof CoffeeNotifierWorkflow.definition> =
  {
    type: "event",
    event: {
      event_type: "slack#/events/message_posted",
      channel_ids: [CHANNEL_ID],
      filter: {
        version: 1,
        root: {
          statement: "1 == 1",
        },
      },
    },
    name: "Listen to posted messages",
    description: "Listen to posted messages",
    workflow: "#/workflows/coffee_notifier_workflow",
    inputs: {
      channel: {
        value: "{{data.channel_id}}",
      },
      message: {
        value: "{{data.text}}",
      },
    },
  };

export default messagePostedTrigger;
