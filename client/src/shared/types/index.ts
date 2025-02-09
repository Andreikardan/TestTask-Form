export interface IRawPersonalInfo {
  firstName: string;
  lastName: string;
}

export interface IPersonalInfoFormValues extends IRawPersonalInfo {
  phone: string;
  gender: string;
}

export interface IJobInfoFormValues {
  address: string;
  job: string;
}

export interface ILoanParamsFormValues {
  loanAmount: number;
  loanTerm: number;
}
