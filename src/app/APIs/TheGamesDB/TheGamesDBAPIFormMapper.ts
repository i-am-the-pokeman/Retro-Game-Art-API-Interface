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
                            )
                        .sort((a, b) => this.sortByGameImageTypePriority(a.Value, b.Value));
    }
    private static mapGameImageToImageTypeDropdownText(gameImage: GameImage) {
      let type = (this.GameImageTypeDisplayValueMap.has(gameImage.type))
                  ? this.GameImageTypeDisplayValueMap.get(gameImage.type)
                  : this.TitleCasePipe.transform(gameImage.type);
      let side = this.TitleCasePipe.transform(gameImage.side);
      return (side?.length)
              ? type + ' (' + side + ')'
              : type;
    }
    private static GameImageTypeDisplayValueMap = new Map<string, string>([
      ['fanart', 'Fan Art'],
      ['banner', 'Banner'],
      ['boxart', 'Box Art'],
      ['screenshot', 'Screenshot'],
      ['clearlogo', 'Clear Logo'],
      ['titlescreen', 'Title Screen']
    ]);
    private static GameImageTypePriorityMap = new Map<string, number>([
      ['boxart', 1],
      ['titlescreen', 2],
      ['clearlogo', 3],
      ['screenshot', 4],
      ['banner', 5],
      ['fanart', 6]
    ]);
    private static GameImageTypeSidePriorityMap = new Map<string, number>([
      ['front', 1],
      ['back', 2],
    ]);
    private static sortByGameImageTypePriority(a: GameImage, b: GameImage): number {
      return (this.GameImageTypePriorityMap.get(a.type) > this.GameImageTypePriorityMap.get(b.type))
              ? 1
              : this.GameImageTypePriorityMap.get(a.type) === this.GameImageTypePriorityMap.get(b.type)
                ? this.sortByGameImageTypeSidePriority(a, b)
                : -1;
    }
    private static sortByGameImageTypeSidePriority (a: GameImage, b: GameImage): number {
      return (this.GameImageTypeSidePriorityMap.get(a.side) > this.GameImageTypeSidePriorityMap.get(b.side))
              ? 1
              : -1;
    }

    // TODO: move this somewhere generic...
    public static GetDictionaryValues(dictionary: any): any[] {
      return Object.keys(dictionary)
                    .map(key => dictionary[key]);
    }
}
