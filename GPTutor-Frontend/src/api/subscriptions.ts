import { Subscription } from "$/entity/subscriptions/types";
import { miniAppSystem } from "$/services/MiniAppSystem";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;
export async function getSubscription(): Promise<Subscription> {
  const response = await fetch(`${BACKEND_HOST}purchase/subscription`, {
    headers: {
      Authorization: "Bearer " + miniAppSystem.getAuthorization(),
    },
  });
  return response.json();
}

export async function updateSubscription(): Promise<Subscription> {
  const response = await fetch(`${BACKEND_HOST}purchase/update-subscriptions`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + miniAppSystem.getAuthorization(),
    },
  });
  return response.json();
}
