import React from "react";

import { Banner, Button, Caption, Card, Div, IconButton, Platform, Spacing, Text } from "@vkontakte/vkui";
import {
  Icon16ErrorCircleFill,
  Icon24ClockOutline,
  Icon28ArrowDownToSquareOutline,
  Icon28ShareOutline
} from "@vkontakte/icons";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { TimeGenerationInfo } from "$/components/TimeGenerationInfo";
import { imageGeneration } from "$/entity/image";
import { ImageItem } from "$/panels/ImageGeneration/ImageItem";
import { ImageGenerationBlock } from "$/components/ImageGenerationBlock";
import { CopyText } from "$/components/CopyText";
import { downloadService } from "$/services/DownloadService";
import { wallService } from "$/services/WallService";
import { MidjourneyTime } from "$/panels/CreateMidjourneyImage/MidjourneyTime";

function MidjourneyImageSelect() {
  return (
    <Card mode="shadow" style={{ height: "100%" }}>
      <Div>
        <MidjourneyTime />
        <Spacing size={12} />
        {imageGeneration.error$.get() && (
          <>
            <Banner
              style={{ padding: 0, margin: 0 }}
              before={<Icon16ErrorCircleFill width={24} height={24} />}
              header={imageGeneration.error$.get()}
            />
            <Spacing size={12} />
          </>
        )}
        <div style={{ width: "100%" }}>
          <div>
            <Card mode="shadow">
              <div>
                <ImageGenerationBlock
                  isEmpty={true}
                  timer={imageGeneration.timer}
                  widthView={imageGeneration.widthView$.get()}
                  heightView={imageGeneration.heightView$.get()}
                  rbg="{resultImage.rbg}"
                  url="{resultImage.url}"
                  loading={false}
                />
                <Spacing size={8} />
                <div className={classes.buttons}>
                  <Button
                    size="l"
                    mode="outline"
                    after={<Icon28ArrowDownToSquareOutline />}
                    onClick={() => {}}
                  >
                    Скачать
                  </Button>
                  <IconButton
                    disabled={true}
                    onClick={() => {}}
                  >
                    <Icon28ShareOutline />
                  </IconButton>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Div>
    </Card>
  );
}

export default MidjourneyImageSelect;
