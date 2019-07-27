export default function(tokens, idx /*, options, env */) {
  var token = tokens[idx];
  let type = "";
  if (token.orderType === "letter") {
    type = ` type="A"`;
  }
  return "<UU5.Bricks.Ol" + type + ">\n";
}
