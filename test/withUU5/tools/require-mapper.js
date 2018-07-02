import requireHacker from "require-hacker";

let mappings = {};

mappings["uu5codekitg01"] = "uu5codekitg01/dist-node/index.webpack.js";
mappings["uu5g04-bricks"] = "uu5g04/dist-node/bricks/bricks-build.js";
mappings["uu5g04-forms"] = "uu5g04/dist-node/forms/forms-build.js";

requireHacker.hook("png", () => 'module.exports = ""');
requireHacker.hook("css", () => 'module.exports = ""');
requireHacker.hook("less", () => 'module.exports = ""');

requireHacker.resolver((path, module) => {
  if (!mappings[path]) {
    return undefined;
  }
  return requireHacker.resolve(mappings[path], module);
});
