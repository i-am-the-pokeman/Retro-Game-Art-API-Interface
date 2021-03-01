import { TitleCasePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Game, GameImage, Platform } from "src/app/APIs/TheGamesDB/TheGamesDBAPIEntities";
import { DropdownOption } from "../../shared/forms/entities";

// TODO: move this to a generic location
export interface Dictionary {
  [key: number]: any;
}

// TODO: make functions generic
@Injectable()
export class TheGamesDBAPIFormMapper {
    private static TitleCasePipe = new TitleCasePipe();

    // TODO: add unit test
    public static MapPlatformsDictionaryToPlatformDropdownOptions(platformsDictionary: Dictionary) {
      let dictionaryValues: Platform[] = this.GetDictionaryValues(platformsDictionary);
      let dropdownOptions = this.mapPlatformsToDropdownOptions(dictionaryValues);
      return dropdownOptions;
    }
    private static mapPlatformsToDropdownOptions(platforms: Platform[] = []): DropdownOption[] {
      return platforms.map(platform => ({Text: platform.name, Value: platform.id}));
    }

    // TODO: add unit test
    public static MapGamesDictionaryToGameDrodpownOptions(gamesDictionary: Dictionary) {
      let dictionaryValues: Game[] = this.GetDictionaryValues(gamesDictionary);
      let dropdownOptions = this.mapGamesToDropdownOptions(dictionaryValues);
      return dropdownOptions;
    }
    private static mapGamesToDropdownOptions(games: Game[] = []): DropdownOption[] {
      return games.map(game => ({Text: game.game_title, Value: game}));
    }

    // TODO: add unit test
    public static MapGameImagesDictionaryToImageTypeDropdownOptions(imagesDictionary: Dictionary) {
      let dictionaryValueArray: GameImage[][] = this.GetDictionaryValues(imagesDictionary);
      let dictionaryValues: GameImage[] = [];
      if(dictionaryValueArray.length) { // Since we only call for one game's image set at a time, we only need the first result
        dictionaryValues = dictionaryValueArray[0];
      }

      let dropdownOptions = this.mapGameImagesToImageTypeDropdownOptions(dictionaryValues);
      return dropdownOptions;
    }
    private static mapGameImagesToImageTypeDropdownOptions(gameImages: GameImage[] = []): DropdownOption[] {
      return gameImages.map(gameImage => ({
                                            Text: this.mapGameImageToImageTypeDropdownText(gameImage),
                                            Value: gameImage
                                          })
                            );
    }
    private static mapGameImageToImageTypeDropdownText(gameImage: GameImage) {
      let type = this.TitleCasePipe.transform(gameImage.type);
      let side = this.TitleCasePipe.transform(gameImage.side);
      return (side?.length)
              ? type + ' (' + side + ')'
              : type;
    }

    // TODO: move this somewhere generic...
    public static GetDictionaryValues(dictionary: any): any[] {
      return Object.keys(dictionary)
                    .map(key => dictionary[key]);
    }
}
