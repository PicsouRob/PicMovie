import { vueToggleType } from '../Type';

export const vueAction = (val) => {
    return {
        type: vueToggleType,
        value: val,
    }
}