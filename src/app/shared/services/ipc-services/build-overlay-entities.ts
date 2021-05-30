export interface CreateOverlayRequest {
  OverlayPieces: OverlayPiece[];
}

export interface OverlayPiece {
  Url: string;
  Type: number;
}

export enum OverlayPieceTypeEnum {
  GameLogo = 1,
  SystemLogo = 2,
  LeftBanner = 3,
  RightBanner = 4
}