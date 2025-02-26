export enum PrivacyLevel {
  Public = "*",
  OnlyFollowers = "onlyFallowers",
  OnlyIFollow = "onlyIFallow",
  FollowersAndIFollow = "fallowersAndIFallow",
  OnlyMe = "onlyI",
}

export class UserPrivacy {
  whoSendMessage: PrivacyLevel;
  whoSeeMyPosts: PrivacyLevel;
  whoSeeMyPlanning: PrivacyLevel;

  constructor(data: Partial<UserPrivacy>) {
    this.whoSendMessage = data.whoSendMessage ?? PrivacyLevel.Public;
    this.whoSeeMyPosts = data.whoSeeMyPosts ?? PrivacyLevel.Public;
    this.whoSeeMyPlanning = data.whoSeeMyPlanning ?? PrivacyLevel.Public;
  }
}

export class updateUserPrivacy {
  whosendmessage?: PrivacyLevel;
  whoseemyposts?: PrivacyLevel;
  whoseemyplanning?: PrivacyLevel;
  password?: string;
  email?: string;
}
