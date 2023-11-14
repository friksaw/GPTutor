import {
  Button,
  ButtonGroup,
  classNames,
  Headline,
  IconButton,
  Platform,
  Tappable,
  usePlatform,
} from "@vkontakte/vkui";
import React from "react";

import { imageService } from "$/services/ImageService";
import classes from "$/panels/Gallery/Gallery.module.css";
import { getModelByValue } from "$/entity/image/styles";
import {
  Icon24RepeatOutline,
  Icon28ArrowDownToSquareOutline,
  Icon28ShareOutline,
} from "@vkontakte/icons";
import { imageGeneration } from "$/entity/image";
import { wallService } from "$/services/WallService";
import { downloadService } from "$/services/DownloadService";
import AppBanner from "$/components/AppBanner";
import { ImageHistoryItem } from "$/entity/image/ImageHistoryItem";
import { useNavigationContext } from "$/NavigationContext";

import ImageSeed from "../../ImageGeneration/ImageSeed/ImageSeed";

interface IProps {
  image: ImageHistoryItem;
}

function ImageItem({ image }: IProps) {
  const platform = usePlatform();
  const { goBack, goToGenerationImagesResult } = useNavigationContext();

  return (
    <AppBanner
      before={
        <Tappable
          hoverMode="opacity"
          activeMode="opacity"
          onClick={() => imageService.openImages([image.item.url])}
        >
          <img
            className={classNames(classes.image, {
              [classes.imageMobile]: platform !== Platform.VKCOM,
            })}
            src={image.item.url}
          />
        </Tappable>
      }
      key={image.item.url}
      header={getModelByValue(image.item.modelId).label}
      subheader={
        <div className={classes.subHeader}>
          <div>{image.item.originalPrompt}</div>
          <div>
            Создано:
            <Headline style={{ display: "inline" }} level="2" weight="1">
              {" "}
              {new Date(image.item.createdAt).toLocaleString()}
            </Headline>
          </div>

          <div>
            <Headline style={{ display: "inline" }} level="2" weight="1">
              {image.item.generatedSeed && (
                <ImageSeed seed={image.item.generatedSeed} />
              )}
            </Headline>
          </div>
        </div>
      }
      actions={
        <div className={classes.buttons}>
          <ButtonGroup
            style={{ alignItems: "center" }}
            mode={platform === Platform.VKCOM ? "horizontal" : "vertical"}
          >
            <Button
              size="m"
              after={<Icon24RepeatOutline />}
              onClick={() => {
                imageGeneration.applyExample(image.item);
                if (platform !== Platform.VKCOM) {
                  goToGenerationImagesResult();
                } else {
                  goBack();
                }
                imageGeneration.generate();
              }}
            >
              Повторить
            </Button>
            <IconButton onClick={() => wallService.createPost(image.item.url)}>
              <Icon28ShareOutline />
            </IconButton>
          </ButtonGroup>
          <div className={classes.additionButtons}>
            <IconButton
              onClick={() => {
                downloadService.appDownloadLink(platform, image.item.url);
              }}
            >
              <Icon28ArrowDownToSquareOutline />
            </IconButton>
          </div>
        </div>
      }
    />
  );
}

export default ImageItem;