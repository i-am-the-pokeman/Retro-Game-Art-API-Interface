import { InputConfig } from "src/app/shared/form-helpers/entities/input-config";

export enum GameImageTypeSelectionControlName {
  Icon = 'icon',
  Banner = 'banner'
}

export class GameImageTypeSelectionFormConfig {
  public static getFormConfigData(): InputConfig[] {
    return [
      {
          ControlName: GameImageTypeSelectionControlName.Icon,
          DefaultValue: null,
          Label: 'Icon Image Type',
          ErrorMessages: {},
          PlaceholderText: 'Select image type...'
      },
      {
          ControlName: GameImageTypeSelectionControlName.Banner,
          DefaultValue: null,
          Label: 'Banner Image Type',
          ErrorMessages: {},
          PlaceholderText: 'Select image type...'
      }
    ]
  }
}