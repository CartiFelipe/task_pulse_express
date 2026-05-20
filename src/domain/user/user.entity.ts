export default class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public role: 'admin' | 'user',
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
