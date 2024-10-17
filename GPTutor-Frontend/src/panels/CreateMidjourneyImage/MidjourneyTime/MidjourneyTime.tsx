import React from "react";

import { Caption, Card, Div, Spacing, Text } from "@vkontakte/vkui";
import { Icon24ClockOutline } from "@vkontakte/icons";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";

function MidjourneyTime() {
  return (
    <Card mode="shadow">
      <div style={{ display: "flex", flexDirection: "row", paddingBottom: 8 }}>
        <div style={{ marginTop: 4, marginRight: 4 }}>
          <Icon24ClockOutline />
        </div>
        <div>
          <Caption>Среднее время ожидания 15 секунд</Caption>
          <Spacing size={4} />
          <Caption>Максимальное время 100 секунд</Caption>
        </div>
      </div>
    </Card>
  );
}

export default MidjourneyTime;
