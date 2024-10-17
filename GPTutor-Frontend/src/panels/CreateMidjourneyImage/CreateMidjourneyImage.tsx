import React, { useState } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Caption,
  Card,
  Div,
  Group, IconButton,
  Panel,
  PanelHeaderBack, Paragraph, Separator,
  Spacing, Text,
  Textarea, Title
} from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";
import {
  Icon24ArrowRightSquareOutline,
  Icon24ClockOutline, Icon24Favorite,
  Icon24MagicWandOutline, Icon28ArrowDownToSquareOutline,
  Icon28HelpCircleOutline,
  Icon28ServicesOutline, Icon32StarsOutline
} from "@vkontakte/icons";
import { ImageSizeSelects } from "$/panels/CreateMidjourneyImage/ImageSizeSelects";
import { MidjourneyBalance } from "$/panels/CreateMidjourneyImage/MidjourneyBalance";
import { MidjourneyPromtCard } from "$/panels/CreateMidjourneyImage/MidjourneyPromtCard";
import { MidjourneyImageSelect } from "$/panels/CreateMidjourneyImage/MidjourneyImageSelect";
import classes from "$/panels/ImageGeneration/ImageGenerationMobile/ImageGenerationMobile.module.css";

interface IProps {
    id: string;
}

function CreateMidjourneyImage({ id }: IProps) {
  const {
    goToGenerationImagesExamples,
    openApplicationInfoStableArt,
  } = useNavigationContext();
  const [selectedImageSize, setSelectedImageSize] = useState(0)

  const changeSelectedImageSize = (newSize: any) => {
    setSelectedImageSize(newSize)
  }

  return (
    <Panel id={id}>
      <AppContainer
        headerChildren={
          <AppPanelHeader
            before={
              <IconButton
                style={{ marginLeft: 12 }}
                onClick={openApplicationInfoStableArt}
                className={classes.buttonService}
              >
                <Icon28ServicesOutline
                  width={22}
                  height={22}
                  className={classes.iconService}
                />
              </IconButton>
            }
            after={
              <div style={{ display: "flex", alignItems: "center", paddingRight: 12 }}>
                <IconButton
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                  target="_blank"
                  href="https://vk.com/@gptutor-primer-sozdaniya-kachestvennogo-zaprosa"
                >
                  <Icon28HelpCircleOutline width={22} height={22} />
                </IconButton>
                <IconButton onClick={goToGenerationImagesExamples}>
                  <Icon32StarsOutline width={22} height={22} />
                </IconButton>
              </div>
            }
          >
            <Text weight="1" style={{ margin: "0 auto" }}>Midjourney</Text>
          </AppPanelHeader>
        }
      >
        <Div style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", margin: "8px 0" }}>
            <div style={{ width: "70%" }}>
              <MidjourneyPromtCard />
              <Spacing size={8} />
              <ImageSizeSelects changeSelectedImageSize={changeSelectedImageSize}
                selectedImageSize={selectedImageSize}
              />
            </div>
            <div style={{ width: 8 }} />
            <div>
              <MidjourneyImageSelect />
            </div>
          </div>
          <Spacing size={12} />
          <Card mode="shadow">
            <Div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Button
                size="m"
                mode="link"
                appearance="accent-invariable"
                after={<Icon24ArrowRightSquareOutline />}
                onClick={() => {}}
              >
                Продолжить в Telegram
              </Button>
            </Div>
          </Card>
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default CreateMidjourneyImage;
