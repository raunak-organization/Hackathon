import { LoginUserInput, RegisterUserInput } from '@repo/zod-config';

export type LoginProps = {
  type: 'login';
  onSubmit: (data: LoginUserInput) => Promise<void>;
  isLoading?: boolean;
};

export type RegisterProps = {
  type: 'register';
  onSubmit: (data: RegisterUserInput) => Promise<void>;
  isLoading?: boolean;
};

export type Props = LoginProps | RegisterProps;
