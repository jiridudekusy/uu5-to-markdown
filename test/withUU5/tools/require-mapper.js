import requireHacker from "require-hacker";
import Path from "path";

let mappings = {};

mappings["uu5codekitg01"] = "uu5codekitg01/dist-node/index-markdown.js";
mappings["uu5g04-bricks"] = "uu5g04/dist-node/bricks/bricks-build.js";
mappings["uu5g04-forms"] = "uu5g04/dist-node/forms/forms-build.js";
mappings["uu5g04-core"] = "uu5g04/dist-node/core/core.js";

requireHacker.hook("png", () => 'module.exports = ""');
requireHacker.hook("css", () => 'module.exports = ""');
requireHacker.hook("less", () => 'module.exports = ""');

requireHacker.resolver((path, module) => {
  if(path === "!style-loader?transform=src/core/common/normalize-css.js!css-loader!less-loader!./normalize.less"){
    return Path.join(__dirname, "empty.js");
  }
  if (!mappings[path]) {
    return undefined;
  }
  return requireHacker.resolve(mappings[path], module);
});
