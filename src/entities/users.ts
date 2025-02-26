interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

class User implements IUser {
  id: number;
  name: string;
  username: string;
  picture: Blob;
  email: string;
  bio: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    name: string,
    username: string,
    picture: Blob,
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date,
    bio: string,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.picture = picture;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.bio = bio;
  }
}

export { User, IUser };
