import { CreateOverlayRequest } from "../../messages/CreateOverlayRequest";

export class OverlayBuilderService {
  public static BuildOverlay(request: CreateOverlayRequest) {
    console.log('build-overlay message received');
    console.log(request);
    // TODO:
    // 1. Validate Inputs
    // 2. Convert Inputs to usable formats
    // 3. Use Sharp to build overlay
    // 4. Save Overlay
  }
}