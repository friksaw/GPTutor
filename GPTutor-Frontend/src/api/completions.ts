import { EventSourceMessage, fetchEventSource } from "$/utility";
import { VkDocsResponse } from "$/entity/GPT";
import { httpService } from "$/services/HttpService";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export async function sendChatCompletions(
  body: any,
  onMessage: (content: string, isFirst: boolean, isSecond: boolean) => void,
  onError: () => void,
  controller: AbortController
) {
  let isFirst = true;
  let isSecond = true;
  let isHasError = false;

  await fetchEventSource(`${BACKEND_HOST}conversation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: httpService.authorization,
    },
    body: JSON.stringify(body),
    signal: controller.signal,
    onmessage(event: EventSourceMessage) {
      if (event.data === "[DONE]") return;
      if (event.data.startsWith("[Error]")) {
        throw new Error(event.data);
      }

      const eventData = JSON.parse(event.data);
      if (!eventData.choices) return;

      const delta = eventData.choices[0]?.delta;

      if (!delta) return;

      if (!Object.keys(delta).length) return;

      if (!delta.content) return;
      onMessage(delta.content, isFirst, isSecond);

      if (!isFirst) {
        isSecond = false;
      }
      isFirst = false;
    },
    onerror(err) {
      if (!isHasError) {
        onError();
        isHasError = true;
      }
    },
  });

  return isHasError;
}

interface IConversationVKDocParams {
  question: string;
  source: string;
}
export function conversationVKDoc(
  params: IConversationVKDocParams
): Promise<VkDocsResponse> {
  return fetch(`${BACKEND_HOST}vk-doc/conversation`, {
    method: "POST",
    headers: {
      Authorization: httpService.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
}
