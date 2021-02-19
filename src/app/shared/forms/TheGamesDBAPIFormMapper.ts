import { Injectable } from "@angular/core";
import { Platform } from "src/app/APIs/TheGamesDB/TheGamesDBAPIEntities";
import { DropdownValue } from "./entities";


@Injectable()
export class TheGamesDBAPIFormMapper {
    // TODO: unit test
    public static mapPlatformsToDropdownValues(platforms: Platform[] = []): DropdownValue[] {
        return platforms.map(platform => ({Text: platform.name, Value: platform.id}));
    }
}
