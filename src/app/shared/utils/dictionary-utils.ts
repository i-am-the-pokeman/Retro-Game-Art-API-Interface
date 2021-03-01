export class DictionaryUtils {
  public static GetDictionaryValues(dictionary: any): any[] {
    return Object.keys(dictionary)
    .map(key => dictionary[key]);
  }
}