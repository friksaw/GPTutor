import React from "react";

import { Caption, Card, Div, Spacing, Text, Title } from "@vkontakte/vkui";
import { Icon24ClockOutline, Icon24Flash } from "@vkontakte/icons";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";

function MidjourneyBalance() {
  return (
    <Card mode="shadow">
      <Div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div>
          <Title level="3">Баланс Midjourney</Title>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginRight: 24 }}>
          <Title level="3" style={{ marginLeft: 16 }}>3</Title>
          <Icon24Flash />
        </div>
      </Div>
    </Card>
  );
}

export default MidjourneyBalance;
