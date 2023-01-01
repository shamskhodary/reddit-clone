import IUser from './IUser'

export default interface IPosts {
  title: string;
  content: string;
  postImg: string;
  userId: number;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
