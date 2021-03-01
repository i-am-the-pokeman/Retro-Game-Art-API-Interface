export class GameImageFilenameUtils {
  public static buildNewFileName(imagePurpose: string,
                                  originalFileName: string,
                                  imageSide: string = '')
                                  : string {
    let filename = this.getFilenameWithoutFolders(originalFileName);
    if (imageSide?.length) {
      filename = imageSide + '_' + filename;
    }
    filename = imagePurpose + '_' + filename;
    return filename;
  }

  public static getFilenameWithoutFolders(filename: string): string {
    if (!filename || !filename.length) return '';

    let filenameSplit = filename.split('/');
    return filenameSplit[filenameSplit.length - 1];
  }

  public static getFileTypeFromFilename(filename: string) {
    if (!filename || !filename.length) return '';

    let filenameSplit = filename.split('.');
    return filenameSplit[filenameSplit.length - 1];
  }
}
