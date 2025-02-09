import { ILoanParamsFormValues, IRawPersonalInfo } from '@/shared/types';

interface Props {
  userInfo: IRawPersonalInfo;
  loanInputs: ILoanParamsFormValues;
}

export function SuccessSubmitMessage({ userInfo, loanInputs }: Props): JSX.Element {
  return (
    <p>
      Поздравляем, {userInfo.firstName} {userInfo.lastName}. Вам одобрено{' '}
      <strong>{loanInputs.loanAmount} $</strong> на <strong>{loanInputs.loanTerm} дней</strong>.
    </p>
  );
}
