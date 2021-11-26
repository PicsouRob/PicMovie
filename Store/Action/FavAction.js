import { favToggleType } from "../Type";

export const favAction = (val) => {
  return {
    type: favToggleType,
    value: val,
  };
};
