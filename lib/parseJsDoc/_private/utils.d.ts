import { ITag, IDescriptive, IParam, IType, InlineLink } from "../types";
import { TagMapFunction } from "../_private/types";
export declare const first: <T = unknown, TDefault = T>(
  array: T[],
  defaultValue?: TDefault
) => T | TDefault;
export declare const isNotNullOrEmpty: <T = unknown>(value: T) => boolean;
export declare const isNullOrEmpty: <T = unknown>(value: T) => boolean;
export declare const getTagRegExp: (tag: string) => RegExp;
/**
 * Gets the 'description' tag
 *
 * @param {string} jsdoc The entire jsdoc string
 * @returns {ITag}
 */
export declare const getDescription: (
  jsdoc: string,
  linkRenderer?: (link: InlineLink) => string
) => ITag;
/**
 * Gets 'param' tags
 *
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {IParam[]}
 */
export declare const getTemplate: () => (
  jsdoc: string,
  linkRenderer?: (link: InlineLink) => string
) => IDescriptive[];
/**
 * Gets 'param' tags
 *
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {IParam[]}
 */
export declare const getParam: (
  tag: "@param" | "@property" | "@prop" | "@arg" | "@argument"
) => (jsdoc: string, linkRenderer?: (link: InlineLink) => string) => IParam[];
/**
 * Gets tag shaped like TType
 *
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {IType}
 */
export declare const getTyped: (tag: string) => (jsdoc: string) => IType;
/**
 * Gets the requested tag data
 *
 * @param {string} tag - The tag to find
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {(ITag | ITag[])}
 */
export declare const getTag: (
  tag: string
) => (
  jsdoc: string,
  linkRenderer?: (link: InlineLink) => string
) => ITag | ITag[];
/**
 * Gets all matching jsdoc tags
 *
 * @param {string} tag - The name of the tag to get
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {string[]} Array of string values for each matching tag
 */
export declare const getTags: (
  tag: string
) => (
  jsdoc: string,
  linkRenderer?: (link: InlineLink) => string
) => Array<ITag | ITag[]>;
/** Gets a Map object with all possible jsdoc tags and their parsing function */
export declare const getTagMap: () => Map<string, TagMapFunction>;
