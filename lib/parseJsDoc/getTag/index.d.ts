import { InlineLink, ITag } from "../types";
/**
 * Gets a jsdoc tag's data; if the tag type supports multiple entries, an array of the tags will be returned
 *
 * @param {string} jsdoc - The entire jsdoc string
 * @param {(link: InlineLink) => string} [linkRenderer] - Optional function to override default rendering of inline link and tutorial tags
 * @returns {(tag: string) => ITag | Array<ITag | ITag[]>} Function to get the tag or array of all tags that go by that name
 */
export declare const getTag: (
  jsdoc: string,
  linkRenderer?: (link: InlineLink) => string
) => (tag: string) => ITag | Array<ITag | ITag[]>;
