import IUser from './IUser'

export default interface IComments {
  id: number;
  content: string;
  user: IUser;
  createdAt:string
}
