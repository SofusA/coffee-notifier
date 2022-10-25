import { Manifest } from "deno-slack-sdk/mod.ts";
import CoffeeNotifierWorkflow from "./workflows/coffee_notifier_workflow.ts";

export default Manifest({
  name: "Coffee Notifier",
  description: "Notifies to a MQTT topic that coffee is brewing",
  icon: "assets/icon.png",
  workflows: [CoffeeNotifierWorkflow],
  outgoingDomains: [],
  botScopes: [
    "channels:history",
    "groups:history",
    "im:read",
    "mpim:read",
    "chat:write",
    "chat:write.public",
  ],
});
