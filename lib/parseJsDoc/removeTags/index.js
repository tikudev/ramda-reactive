import { first, getTagRegExp, isNotNullOrEmpty } from '../_private/utils.js'
/**
 * Removes a set of tags from jsdoc
 *
 * @param {string} jsdoc - The entire jsdoc string
 * @param {string[]} tags - Array of string tags to remove
 * @returns {string} The jsdoc string the specified tags removed
 */
export var removeTags = function (jsdoc, tags) {
  for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
    var tag = tags_1[_i]
    var _tag = tag.startsWith('@') ? tag : '@' + tag
    if (_tag === '@description') {
      jsdoc = removeTaglessDescription(jsdoc)
    }
    var matches = Array.from(jsdoc.matchAll(getTagRegExp(_tag)))
    for (var _a = 0, matches_1 = matches; _a < matches_1.length; _a++) {
      var match = matches_1[_a]
      jsdoc = jsdoc.replace(match[0], '')
    }
  }
  return /^\/\*\*( *)?\/|\/\*\*( *)?(?:\r\n|\r|\n)*(?: ?\*(?:\r\n|\r|\n)?\/?)*$/.test(
    jsdoc
  )
    ? '/** */'
    : jsdoc.replace(/\*\*\//g, '*/')
}
var removeTaglessDescription = function (jsdoc) {
  var regex =
    /\/\*\*( *)(.*)(\r\n|\r|\n)*((?:(?:(?! @).)(?:\{@link|\{@tutorial))*(?:(?!( @)).)*(\r\n|\r|\n)?)*/gm
  var match = first(Array.from(jsdoc.matchAll(regex)))
  if (isNotNullOrEmpty(match[2])) {
    var end = new RegExp(/\*\/ *$/)
    return end.test(match[2])
      ? jsdoc.replace(regex, '/** */')
      : jsdoc.replace(regex, '/**\n *')
  }
  return jsdoc.replace(regex, '/**\n *')
}
