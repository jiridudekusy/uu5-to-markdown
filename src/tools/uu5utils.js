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

    let res;
    try {
      res = JSON.parse(jsonStr);
    } catch (e) {
      //FIXME: Hotfix due to the https://github.com/jiridudekusy/uuDockitHelper/issues/6 .
      jsonStr = jsonStr.replace(/\\\\/g, "\\");
      res = JSON.parse(jsonStr);
    }

    return res;
  }

  static toUU5Json(obj) {
    let jsonString;
    if (Array.isArray(obj) && obj.length) {
      jsonString = "[\n";
      jsonString += obj.map(item => "  " + JSON.stringify(item)).join(",\n");
      jsonString += "\n]";
    } else {
      jsonString = JSON.stringify(obj);
    }
    return UU5JSON + jsonString;
  }
}
