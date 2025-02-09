import { Form } from 'antd';
import { useCallback, useLayoutEffect, useState } from 'react';
import { INITIAL_STATE_LOAN_PARAMS } from '@/shared/consts';
import { LOCAL_STORAGE_KEY_NAME } from '@/shared/enums';
import { ILoanParamsFormValues } from '@/shared/types';
import { LocalStorageOperations } from '@/shared/utils';

export const useLoanParamsInfo = () => {
  const [form] = Form.useForm<ILoanParamsFormValues>();
  const [loanInputs, setLoanInputs] = useState<ILoanParamsFormValues>(INITIAL_STATE_LOAN_PARAMS);

  const setFields = useCallback(() => {
    const parseData = LocalStorageOperations.getData(LOCAL_STORAGE_KEY_NAME.LOAN_DATA);

    if (parseData) {
      setLoanInputs(parseData);
      form.setFieldsValue(parseData);
    } else {
      setLoanInputs(INITIAL_STATE_LOAN_PARAMS);
      form.setFieldsValue(INITIAL_STATE_LOAN_PARAMS);
    }
  }, [form]);

  useLayoutEffect(() => {
    setFields();
  }, [setFields]);
  return {
    loanInputs,
    setLoanInputs,
    form
  };
};
