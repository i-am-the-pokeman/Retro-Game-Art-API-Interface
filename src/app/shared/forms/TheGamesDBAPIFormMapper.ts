import { Injectable } from "@angular/core";
import { Game, Platform } from "src/app/APIs/TheGamesDB/TheGamesDBAPIEntities";
import { DropdownOption } from "./entities";

// TODO: move this to a generic location
export interface Dictionary {
  [key: number]: any;
}

// TODO: make functions generic
@Injectable()
export class TheGamesDBAPIFormMapper {

    // TODO: add unit test
    public static MapPlatformsDictionaryToDropdownOptions(platformsDictionary: Dictionary) {
      let dictionaryValues: Platform[] = this.GetDictionaryValues(platformsDictionary);
      let dropdownOptions = this.mapPlatformsToDropdownOptions(dictionaryValues);
      return dropdownOptions;
    }
    private static mapPlatformsToDropdownOptions(platforms: Platform[] = []): DropdownOption[] {
        return platforms.map(platform => ({Text: platform.name, Value: platform.id}));
    }

    // TODO: add unit test
    public static MapGamesDictionaryToDrodpownOptions(gamesDictionary: Dictionary) {
      let dictionaryValues: Game[] = this.GetDictionaryValues(gamesDictionary);
      let dropdownOptions = this.mapGamesToDropdownOptions(dictionaryValues);
      return dropdownOptions;
    }
    private static mapGamesToDropdownOptions(games: Game[] = []): DropdownOption[] {
      return games.map(game => ({Text: game.game_title, Value: game.id}));
    }

    // TODO: move this somewhere generic...
    public static GetDictionaryValues(dictionary: any): any[] {
      return Object.keys(dictionary)
                    .map(key => dictionary[key]);
    }
}
