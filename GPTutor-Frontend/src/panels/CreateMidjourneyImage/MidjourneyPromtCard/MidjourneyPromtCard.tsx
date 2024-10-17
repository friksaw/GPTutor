import React from "react";

import { Button, ButtonGroup, Caption, Card, Div, Spacing, Text, Textarea } from "@vkontakte/vkui";
import { Icon24ClockOutline, Icon24MagicWandOutline } from "@vkontakte/icons";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";

function MidjourneyPromtCard() {
  return (
    <Card mode="shadow">
      <Div>
        <Textarea placeholder="Космонавт верхом на лошади, hd, космическое сияние, высокое качество, профессиональное фото" />
        <Spacing size={8} />
        <ButtonGroup mode="vertical" gap="m" style={{ width: "100%" }}>
          <Button
            onClick={() => {}}
            size="l"
            appearance="overlay"
            mode="outline"
            stretched
          >
            Собрать запрос ✨
          </Button>
          <Button
            onClick={() => {}}
            size="l"
            appearance="accent"
            stretched
            after={<Icon24MagicWandOutline />}
          >
            Сгенерировать
          </Button>
        </ButtonGroup>
      </Div>
    </Card>
  );
}

export default MidjourneyPromtCard;
