import { ImageFetchService } from "../ImageFetchServices/ImageFetchService";
import { CreateOverlayRequest, OverlayPiece } from "../../messages/CreateOverlayRequest";
const sharp = require("sharp");

export class OverlayBuilderService {
  public static async BuildOverlay(request: CreateOverlayRequest) {
    console.log('build-overlay message received');
    console.log(request);

    let image1 = await ImageFetchService.GetImageBufferFromImageUrl(request.OverlayPieces[0].Url);
    image1 = await sharp(image1)
                    .toBuffer();

    let image2 = await ImageFetchService.GetImageBufferFromImageUrl(request.OverlayPieces[1].Url);
    image2 = await sharp(image2)
                    .toBuffer();

    let crtBezel = await ImageFetchService.GetBufferFromAssetFileName('crt_bezel.png');

    let imageMiddleY = 1920/2;

    let leftBanner = await sharp(image1)
                              .resize(
                                1920,
                                1080,
                                {
                                  fit: 'contain',
                                  position: 'left',
                                  background: { r: 0, g: 0, b: 0, alpha: 1}
                                }
                              )
                              .extract({left: 0, top: 0, width: 234, height: 1080})
                              .toBuffer();
    let rightBanner = await sharp(image1)
                              .resize(
                                1920,
                                1080,
                                {
                                  fit: 'contain',
                                  position: 'right',
                                  background: { r: 0, g: 0, b: 0, alpha: 1}
                                }
                              )
                              .extract({left: 1920 - 234, top: 0, width: 234, height: 1080})
                              .toBuffer();

    await sharp({
            create: {
              width: 1920,
              height: 1080,
              channels: 4,
              background: { r: 0, g: 0, b: 0, alpha: 1}
            }
          })
          .composite(
            [
              { input: leftBanner, gravity: 'west' },
              { input: rightBanner, gravity: 'east' },
              { input: crtBezel, gravity: 'centre' }
            ]
          )
          .toFile('output.png')
            .then((info: any) => {console.log(info)})
            .catch((err: any) => {console.log(err)});

    // TODO:
    // 1. Validate Inputs
    // 2. Convert Inputs to usable formats
    //   2a. use request class to grab and store image buffers
    // 3. Use Sharp to build overlay
    // 4. Save Overlay
  }
}