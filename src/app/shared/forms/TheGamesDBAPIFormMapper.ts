import { Injectable } from "@angular/core";
import { Platform } from "src/app/APIs/TheGamesDB/TheGamesDBAPIEntities";
import { DropdownOption } from "./entities";


@Injectable()
export class TheGamesDBAPIFormMapper {
    // TODO: unit test
    public static mapPlatformsToDropdownOptions(platforms: Platform[] = []): DropdownOption[] {
        return platforms.map(platform => ({Text: platform.name, Value: platform.id}));
    }
}
