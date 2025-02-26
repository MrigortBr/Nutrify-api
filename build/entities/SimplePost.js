"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisibilityStatus = exports.PostStatus = void 0;
var PostStatus;
(function (PostStatus) {
    PostStatus["ALL"] = "*";
    PostStatus["ONLY_FOLLOWERS"] = "onlyFallowers";
    PostStatus["ONLY_I_FOLLOW"] = "onlyIFallow";
    PostStatus["FOLLOWERS_AND_I_FOLLOW"] = "fallowersAndIFallow";
})(PostStatus || (exports.PostStatus = PostStatus = {}));
var VisibilityStatus;
(function (VisibilityStatus) {
    VisibilityStatus["ALL"] = "*";
    VisibilityStatus["ONLY_FOLLOWERS"] = "onlyFallowers";
    VisibilityStatus["ONLY_I_FOLLOW"] = "onlyIFallow";
    VisibilityStatus["FOLLOWERS_AND_I_FOLLOW"] = "fallowersAndIFallow";
    VisibilityStatus["DRAFT"] = "draft";
    VisibilityStatus["ARCHIVED"] = "archived";
    VisibilityStatus["PUBLISHED"] = "published";
})(VisibilityStatus || (exports.VisibilityStatus = VisibilityStatus = {}));
