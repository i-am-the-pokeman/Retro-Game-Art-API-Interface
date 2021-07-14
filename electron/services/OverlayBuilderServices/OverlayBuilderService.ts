import { ImageFetchService } from "../ImageFetchServices/ImageFetchService";
import { CreateOverlayRequest, OverlayPiece } from "../../messages/CreateOverlayRequest";
const sharp = require("sharp");

export class OverlayBuilderService {
  public static async BuildOverlay(request: CreateOverlayRequest): Promise<string> {
    console.log('build-overlay message received');
    console.log(request);

    let image1 = await ImageFetchService.GetImageBufferFromImageUrl(request.OverlayPieces[0].Url);
    image1 = await sharp(image1).toBuffer();

    let image2 = await ImageFetchService.GetImageBufferFromImageUrl(request.OverlayPieces[1].Url);
    image2 = await sharp(image2).toBuffer();

    let image3 = await ImageFetchService.GetImageBufferFromImageUrl(request.OverlayPieces[2].Url);
    image3 = await sharp(image3).toBuffer();

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

    let clearlogo = await sharp(image3)
                          .extend(
                            {
                              top: 10,
                              bottom: 10,
                              left: 10,
                              right: 10,
                              background: { r: 0, g: 0, b: 0, alpha: 0 }
                            }
                          )
                          .resize(
                            234 - (10 * 2), // banner width - (horizontal padding * 2) TODO: replace with variables...
                            1080,
                            {
                              fit: 'inside',
                              position: 'centre',
                              background: { r: 0, g: 0, b: 0, alpha: 0 }
                            }
                          )
                          .toBuffer();

    // return buffer
    let buffer = await sharp({
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
              { input: clearlogo, gravity: 'southwest' },
              { input: crtBezel, gravity: 'centre' }
            ]
          )
          .png()
          .toBuffer();

    return "data:image/png;base64," + buffer.toString('base64');

    // TODO: DO NOT THROW AWAY
    // await sharp({
    //         create: {
    //           width: 1920,
    //           height: 1080,
    //           channels: 4,
    //           background: { r: 0, g: 0, b: 0, alpha: 1}
    //         }
    //       })
    //       .composite(
    //         [
    //           { input: leftBanner, gravity: 'west' },
    //           { input: rightBanner, gravity: 'east' },
    //           { input: clearlogo, gravity: 'southwest' },
    //           { input: crtBezel, gravity: 'centre' }
    //         ]
    //       )
    //       .toFile('output.png')
    //         .then((info: any) => {console.log(info)})
    //         .catch((err: any) => {console.log(err)});

  }
}