import { createReactiveModelBuilder } from "dignals-model";

class VkUserModelBuilder {
  first_name = "";
  id = 0;
  last_name = "";
  photo_200 = "";
}

export const vkUserModel =
  createReactiveModelBuilder(VkUserModelBuilder).create();

export const vkUser = vkUserModel.model$;
