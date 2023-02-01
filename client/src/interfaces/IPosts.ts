import IUser from './IUser'

export default interface IPosts {
  id:number;
  title: string;
  content: string;
  postImg: string;
  userId: number;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  saved: boolean;
  comments: [],
  saves: []
}
