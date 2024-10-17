import React from "react";
import {
  Accordion,
  Button,
  ButtonGroup, Caption,
  Card,
  Div,
  Group, HorizontalCell, HorizontalScroll, Image,
  Panel,
  PanelHeaderBack, Separator,
  Textarea,
  Title
} from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";
import { Icon24MagicWandOutline, Icon28CheckCircleOn } from "@vkontakte/icons";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { styles } from "$/entity/image/styles";
import { imageGeneration } from "$/entity/image";


function ImageSizeSelects({ changeSelectedImageSize, selectedImageSize }: any) {

  const setSelectedStyle = (isSelected: any) => {
    if (isSelected) {
      return "accent";
    } else {
      return "neutral";
    }
  }

  return (
    <Card mode="shadow">
      <Div>
        <div className={classes.accordion}>
          <Accordion expanded={true}>
            <Accordion.Summary>
              <Title
                level="3"
                weight="3"
                className={classes.accordionTitle}
                Component="h3"
              >
                Размер изображения
              </Title>
            </Accordion.Summary>
            <Separator wide />
            <Div>
              <ButtonGroup mode="vertical" gap="m" style={{ width: "100%" }}>
                <ButtonGroup mode="horizontal" gap="m" stretched>
                  <Button
                    onClick={() => changeSelectedImageSize(0)}
                    size="l"
                    appearance={setSelectedStyle(selectedImageSize === 0)}
                    stretched
                  >
                    1:1
                  </Button>
                  <Button
                    onClick={() => changeSelectedImageSize(1)}
                    size="l"
                    appearance={setSelectedStyle(selectedImageSize === 1)}
                    stretched
                  >
                    2:3
                  </Button>
                  <Button
                    onClick={() => changeSelectedImageSize(2)}
                    size="l"
                    appearance={setSelectedStyle(selectedImageSize === 2)}
                    stretched
                  >
                    4:5
                  </Button>
                </ButtonGroup>
                <ButtonGroup mode="horizontal" gap="m" stretched>
                  <Button
                    onClick={() => changeSelectedImageSize(3)}
                    size="l"
                    appearance={setSelectedStyle(selectedImageSize === 3)}
                    stretched
                  >
                    5:4
                  </Button>
                  <Button
                    onClick={() => changeSelectedImageSize(4)}
                    size="l"
                    appearance={setSelectedStyle(selectedImageSize === 4)}
                    stretched
                  >
                    4:7
                  </Button>
                  <Button
                    onClick={() => changeSelectedImageSize(5)}
                    size="l"
                    appearance={setSelectedStyle(selectedImageSize === 5)}
                    stretched
                  >
                    7:4
                  </Button>
                </ButtonGroup>
              </ButtonGroup>
            </Div>
          </Accordion>
        </div>
      </Div>
    </Card>
  );
}

export default ImageSizeSelects;
