import IFormValues from './IFormValues'

export default interface IAuthContext {
  user: IFormValues | null;
  register: Function;
}
