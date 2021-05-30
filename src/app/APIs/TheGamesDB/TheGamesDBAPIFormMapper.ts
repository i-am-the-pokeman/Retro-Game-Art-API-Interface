import { TitleCasePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Game, GameImage, GamesDictionary, GamesImagesDictionary, ImageBaseUrlMeta, Platform, PlatformsDictionary } from "src/app/APIs/TheGamesDB/TheGamesDBAPIEntities";
import { FileToDownload } from "src/app/shared/services/ipc-services/download-images-entities";
import { DictionaryUtils } from "src/app/shared/utils/dictionary-utils";
import { DropdownOption } from "../../shared/form-helpers/entities/dropdown-option";
import { APIUtils } from "../API-utils";
import { GameImageFilenameUtils } from "./GameImageFilenameUtils";

@Injectable()
export class TheGamesDBAPIFormMapper {
    private static TitleCasePipe = new TitleCasePipe();

    // TODO: add tests
    public static MapPlatformsToDropdownOptions(platforms: Platform[] = []): DropdownOption[] {
      return platforms.map(platform => ({Text: platform.name, Value: platform}));
    }

    // TODO: add tests
    public static MapGamesToDropdownOptions(games: Game[] = []): DropdownOption[] {
      return games.map(game => ({Text: game.game_title, Value: game}));
    }

    //#region Game Image Type Dropdown Functions
    // TODO: add tests
    public static MapGameImagesDictionaryToImageTypeDropdownOptions(imagesDictionary: GamesImagesDictionary) {
      let dictionaryValueArray: GameImage[][] = DictionaryUtils.GetDictionaryValues(imagesDictionary);
      let dictionaryValues: GameImage[] = [];
      if (dictionaryValueArray.length) { // Since we only call for one game's image set at a time, we only need the first result
        dictionaryValues = dictionaryValueArray[0];
      }

      let dropdownOptions = this.mapGameImagesToImageTypeDropdownOptions(dictionaryValues);
      return dropdownOptions;
    }
    private static mapGameImagesToImageTypeDropdownOptions(gameImages: GameImage[] = []): DropdownOption[] {
      return gameImages.map(gameImage =>
                        {
                          return {
                              Text: this.mapGameImageToImageTypeDropdownText(gameImage, gameImages),
                              Value: gameImage
                            }
                        })
                        .sort((a, b) => this.sortGameImageTypes(a.Value, b.Value));
    }
    private static mapGameImageToImageTypeDropdownText(gameImage: GameImage, gameImageList: GameImage[]) {
      let type = (this.GameImageTypeDisplayValueMap.has(gameImage.type))
                  ? this.GameImageTypeDisplayValueMap.get(gameImage.type)
                  : this.TitleCasePipe.transform(gameImage.type);

      let side = (gameImage?.side?.length)
                  ? ' (' + this.TitleCasePipe.transform(gameImage.side) + ')'
                  : '';

      let id = '';
      if (gameImageList.filter((i) => i.type === gameImage.type && i.side === gameImage.side).length > 1) {
        id = ' (' + gameImage.id + ')';
      }

      return type + side + id;
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
    private static sortGameImageTypes(a: GameImage, b: GameImage): number {
      if (this.GameImageTypePriorityMap.get(a.type) !== this.GameImageTypePriorityMap.get(b.type)) {
        return this.sortByGameImageTypePriority(a, b);
      } else if (this.GameImageTypeSidePriorityMap.get(a.side) !== this.GameImageTypeSidePriorityMap.get(b.side)) {
        return this.sortByGameImageTypeSidePriority(a, b);
      } else {
        return this.sortByGameImageTypeId(a, b);
      }
    }
    private static sortByGameImageTypePriority(a: GameImage, b: GameImage): number {
      return (this.GameImageTypePriorityMap.get(a.type) > this.GameImageTypePriorityMap.get(b.type))
              ? 1
              : -1;
    }
    private static sortByGameImageTypeSidePriority (a: GameImage, b: GameImage): number {
      return (this.GameImageTypeSidePriorityMap.get(a.side) > this.GameImageTypeSidePriorityMap.get(b.side))
              ? 1
              : -1;
    }
    private static sortByGameImageTypeId (a: GameImage, b: GameImage): number {
      return (a.id > b.id) ? 1 : -1;
    }
    //#endregion
}
