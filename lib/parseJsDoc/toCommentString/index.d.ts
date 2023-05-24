import { ITag, ToCommentStringConfig } from "../types";
/**
 * Convert an object to a jsdoc comment string
 *
 * @since v1.0.0
 * @param {{[tag: string]: ITag | Array<ITag | ITag[]>}} tags - Object containing keys of tags
 * @param {ToCommentStringConfig} [config={ indentChars = 0 }] - The configuration for output formatting
 * @returns {string} The jsdoc string
 */
export declare const toCommentString: (
  tags: {
    [tag: string]: ITag | (ITag | ITag[])[];
  },
  { indentChars }?: ToCommentStringConfig
) => string;
