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
          Label: 'Select Icon Image Type',
          ErrorMessages: {},
          DisabledByDefault: true,
          PlaceholderText: 'Select image type...'
      },
      {
          ControlName: GameImageTypeSelectionControlName.Banner,
          DefaultValue: null,
          Label: 'Select Banner Image Type',
          ErrorMessages: {},
          DisabledByDefault: true,
          PlaceholderText: 'Select image type...'
      }
    ]
  }
}