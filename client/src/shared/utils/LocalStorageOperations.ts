export class LocalStorageOperations {
  static getData(keyName: string) {
    const dataFromLocalStorage = localStorage.getItem(keyName);
    if (dataFromLocalStorage) {
      return JSON.parse(dataFromLocalStorage);
    }
  }

  static setData(keyName: string, data: object) {
    localStorage.setItem(keyName, JSON.stringify(data));
  }
}
