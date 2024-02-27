import { miniAppSystem } from "$/services/MiniAppSystem";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export interface IPostParams<Body> {
  signal: AbortSignal;
  body: Body;
}

export interface IGetParams<Body> {
  signal: AbortSignal;
}

class HttpService {
  getAuthorization() {
    return miniAppSystem.getAuthorization();
  }

  async get<Result, Body>(
    path: string,
    { signal }: IGetParams<Body>
  ): Promise<Result> {
    const res = await fetch(`${BACKEND_HOST}${path}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.getAuthorization(),
        "Content-Type": "application/json",
      },
      ...(signal ? { signal: signal } : {}),
    });
    return await res.json();
  }

  async post<Result, Body>(
    path: string,
    { signal, body }: IPostParams<Body>
  ): Promise<Result> {
    const res = await fetch(`${BACKEND_HOST}${path}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.getAuthorization(),
        "Content-Type": "application/json",
      },
      ...(signal ? { signal: signal } : {}),
      body: JSON.stringify(body),
    });
    return await res.json();
  }
}

export const httpService = new HttpService();
