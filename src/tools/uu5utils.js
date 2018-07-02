const UU5STRING = "<uu5string/>";
const UU5JSON = "<uu5json/>";

export default class UU5Utils {
  static isUU5String(str) {
    return typeof str === "string" && str.trim().startsWith(UU5STRING);
  }

  static isUU5Json(str) {
    return typeof str === "string" && str.trim().startsWith(UU5JSON);
  }

  static parseJson(str) {
    let jsonStr = str;

    if (this.isUU5Json(jsonStr)) {
      jsonStr = jsonStr.trim().substring(UU5JSON.length);
    }

    return JSON.parse(jsonStr);
  }

  static toUU5Json(obj) {
    return UU5JSON + JSON.stringify(obj);
  }
}
