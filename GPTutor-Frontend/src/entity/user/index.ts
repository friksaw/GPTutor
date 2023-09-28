import { createReactiveModelBuilder } from "dignals-model";
import { UserInfo } from "@vkontakte/vk-bridge";

class VkUserModelBuilder {
  $first_name = "";
  $photo_100 = "";
  $bdate = "";
  $city = { id: 0, title: "" };
  $country = { id: 0, title: "" };
  $id = 0;
  $last_name = "";
  $photo_200 = "";
  $photo_max_orig = "";
  $sex = 1;
  $timezone = 0;

  $fillUser(userData: UserInfo) {
    Object.keys(userData).forEach((key) => {
      const modelKey = ("$" + key) as keyof typeof this;
      if (Object.hasOwn(this, modelKey)) {
        this[modelKey] = userData[key as keyof UserInfo] as any;
      }
    });
  }
}

export const vkUser =
  createReactiveModelBuilder(VkUserModelBuilder).create();
