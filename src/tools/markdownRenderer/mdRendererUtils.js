/**
 * Utility functions
 */

function typeOf(obj) {
  return Object.prototype.toString.call(obj);
}

export function isString(obj) {
  return typeOf(obj) === "[object String]";
}

let hasOwn = Object.prototype.hasOwnProperty;

export function has(object, key) {
  return object ? hasOwn.call(object, key) : false;
}

// Extend objects
//
export function assign(obj /*from1, from2, from3, ...*/) {
  let sources = [].slice.call(arguments, 1);

  sources.forEach(function(source) {
    if (!source) {
      return;
    }

    if (typeof source !== "object") {
      throw new TypeError(source + "must be object");
    }

    Object.keys(source).forEach(function(key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

////////////////////////////////////////////////////////////////////////////////

const UNESCAPE_MD_RE = /\\([\\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;

export function unescapeMd(str) {
  if (str.indexOf("\\") < 0) {
    return str;
  }
  return str.replace(UNESCAPE_MD_RE, "$1");
}

////////////////////////////////////////////////////////////////////////////////

export function isValidEntityCode(c) {
  /*eslint no-bitwise:0*/
  // broken sequence
  if (c >= 0xd800 && c <= 0xdfff) {
    return false;
  }
  // never used
  if (c >= 0xfdd0 && c <= 0xfdef) {
    return false;
  }
  if ((c & 0xffff) === 0xffff || (c & 0xffff) === 0xfffe) {
    return false;
  }
  // control codes
  if (c >= 0x00 && c <= 0x08) {
    return false;
  }
  if (c === 0x0b) {
    return false;
  }
  if (c >= 0x0e && c <= 0x1f) {
    return false;
  }
  if (c >= 0x7f && c <= 0x9f) {
    return false;
  }
  // out of range
  if (c > 0x10ffff) {
    return false;
  }
  return true;
}

export function fromCodePoint(c) {
  /*eslint no-bitwise:0*/
  if (c > 0xffff) {
    c -= 0x10000;
    var surrogate1 = 0xd800 + (c >> 10),
      surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}

const NAMED_ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
const DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
import entities from "./entities";

function replaceEntityPattern(match, name) {
  var code = 0;

  if (has(entities, name)) {
    return entities[name];
  } else if (
    name.charCodeAt(0) === 0x23 /* # */ &&
    DIGITAL_ENTITY_TEST_RE.test(name)
  ) {
    code =
      name[1].toLowerCase() === "x"
        ? parseInt(name.slice(2), 16)
        : parseInt(name.slice(1), 10);
    if (isValidEntityCode(code)) {
      return fromCodePoint(code);
    }
  }
  return match;
}

export function replaceEntities(str) {
  if (str.indexOf("&") < 0) {
    return str;
  }

  return str.replace(NAMED_ENTITY_RE, replaceEntityPattern);
}

////////////////////////////////////////////////////////////////////////////////

const HTML_ESCAPE_TEST_RE = /[&<>"]/;
const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
const HTML_REPLACEMENTS = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

export function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}

////////////////////////////////////////////////////////////////////////////////

export default {
  assign,
  isString,
  unescapeMd,
  isValidEntityCode,
  fromCodePoint,
  replaceEntities,
  escapeHtml,
  has
};

//exports.assign            = assign;
//exports.isString          = isString;
//exports.has               = has;
//exports.unescapeMd        = unescapeMd;
//exports.isValidEntityCode = isValidEntityCode;
//exports.fromCodePoint     = fromCodePoint;
//exports.replaceEntities   = replaceEntities;
//exports.escapeHtml        = escapeHtml;
