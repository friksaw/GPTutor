import { Attempts } from "$/entity/attempts/interface";
import { httpService } from "$/services/HttpService";
import { miniAppSystem } from "$/services/MiniAppSystem";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export function sendFreeAttempts(): Promise<Attempts> {
  return fetch(`${BACKEND_HOST}attempts/free`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + miniAppSystem.getAuthorization(),
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function getAttempts(): Promise<Attempts> {
  return fetch(`${BACKEND_HOST}attempts`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + miniAppSystem.getAuthorization(),
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
