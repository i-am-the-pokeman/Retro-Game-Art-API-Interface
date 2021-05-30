export interface DownloadImageRequest {
  FileToDownload: FileToDownload;
}

export interface DownloadImagesRequest {
  FilesToDownload: FileToDownload[];
}

export interface FileToDownload {
  url: string;
  filename: string;
}