import { IInputFormProps } from './IInputFormProps';

export interface IRoleFormProps extends IInputFormProps {
  values: string;
  onChange: (...args: never) => never;
}
