import { Injectable } from "@angular/core";
import { APIUtils } from "../../../APIs/API-utils";
import { GameImageFilenameUtils } from "../../../APIs/TheGamesDB/GameImageFilenameUtils";
import { GameImage, ImageBaseUrlMeta } from "../../../APIs/TheGamesDB/TheGamesDBAPIEntities";
import { FileToDownload } from "./download-images-entities";

@Injectable()
export class DownloadImagesMapper {
  public static MapGameImageToFileToDownload(imageBaseUrls: ImageBaseUrlMeta,
                                            gameImage: GameImage,
                                            imagePurpose: string)
                                            : FileToDownload {
    let url = APIUtils.buildFileUrl(imageBaseUrls.large, gameImage.filename)
    let filename = GameImageFilenameUtils.buildNewFileName(imagePurpose, gameImage.filename, gameImage.side);
    return {
      url: url,
      filename: filename
    }
  }
}