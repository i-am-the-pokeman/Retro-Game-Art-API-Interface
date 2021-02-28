import { GameImage, ImageBaseUrlMeta } from "src/app/APIs/TheGamesDB/TheGamesDBAPIEntities";

// Used as a DTO between components. Is there a better name for this interface?
export interface ImageSelectionResults {
  icon: GameImage;
  banner: GameImage;
  baseImageUrls: ImageBaseUrlMeta;
}