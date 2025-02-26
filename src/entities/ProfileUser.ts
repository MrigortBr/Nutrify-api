export type picture = {
  picture: string;
  id: number;
  comments: number;
  likes: number;
};

export default class ProfileUser {
  picture: string;
  username: string;
  followers: number;
  following: number;
  name: string;
  bio: string;
  pictures: picture[];
  iFollow?: boolean;
  isMyProfile?: boolean;

  constructor(picture: string, username: string, followers: number, following: number, name: string, bio: string, pictures: picture[]) {
    this.picture = picture;
    this.username = username;
    this.followers = followers;
    this.following = following;
    this.name = name;
    this.bio = bio;
    this.pictures = pictures;
  }
}
