import { Injectable } from "@angular/core";
import { APIUtils } from "src/app/APIs/API-utils";
import { GameImage, ImageBaseUrlMeta } from "src/app/APIs/TheGamesDB/TheGamesDBAPIEntities";
import { OverlayPiece } from "./build-overlay-entities";

@Injectable()
export class BuildOverlaymapper {
  public static MapGameImageToOverlayPiece(imageBaseUrls: ImageBaseUrlMeta,
                                            gameImage: GameImage)
                                            : OverlayPiece {
    let url = APIUtils.buildFileUrl(imageBaseUrls.large, gameImage.filename)
    return {
      Url: url,
      Type: null // TODO:
    }
  }
}