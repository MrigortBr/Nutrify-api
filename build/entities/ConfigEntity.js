"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPrivacy = exports.UserPrivacy = exports.PrivacyLevel = void 0;
var PrivacyLevel;
(function (PrivacyLevel) {
    PrivacyLevel["Public"] = "*";
    PrivacyLevel["OnlyFollowers"] = "onlyFallowers";
    PrivacyLevel["OnlyIFollow"] = "onlyIFallow";
    PrivacyLevel["FollowersAndIFollow"] = "fallowersAndIFallow";
    PrivacyLevel["OnlyMe"] = "onlyI";
})(PrivacyLevel || (exports.PrivacyLevel = PrivacyLevel = {}));
class UserPrivacy {
    constructor(data) {
        var _a, _b, _c;
        this.whoSendMessage = (_a = data.whoSendMessage) !== null && _a !== void 0 ? _a : PrivacyLevel.Public;
        this.whoSeeMyPosts = (_b = data.whoSeeMyPosts) !== null && _b !== void 0 ? _b : PrivacyLevel.Public;
        this.whoSeeMyPlanning = (_c = data.whoSeeMyPlanning) !== null && _c !== void 0 ? _c : PrivacyLevel.Public;
    }
}
exports.UserPrivacy = UserPrivacy;
class updateUserPrivacy {
}
exports.updateUserPrivacy = updateUserPrivacy;
