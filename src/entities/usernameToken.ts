export class UserToken {
  private idToken: string;
  private username: string;

  constructor(idToken: string, username: string) {
    this.idToken = idToken;
    this.username = username;
  }

  public getIdToken(): string {
    return this.idToken;
  }

  public setIdToken(idToken: string): void {
    this.idToken = idToken;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
  }
}

export class DbSocket {
  public users: UserToken[] = [];

  addOrUpdate(user: UserToken) {
    const my = this.findUserTokenByUsername(user.getUsername());

    if (my) {
      my.setIdToken(user.getIdToken());
    } else {
      this.setUserToken(user);
    }
  }

  setUserToken(user: UserToken) {
    this.users.push(user);
  }

  findUserTokenByUsername(username: string) {
    return this.users.find((userToken) => userToken.getUsername() === username) || null;
  }

  findUserTokenByToken(token: string) {
    return this.users.find((userToken) => userToken.getIdToken() === token) || null;
  }

  removeUserToken(token: string) {
    this.users.map((v, i) => {
      if (token == v.getIdToken()) {
        this.users.splice(i, 1);
      }
    });
  }
}
