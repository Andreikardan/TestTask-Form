import { Form } from 'antd';
import { useCallback, useLayoutEffect, useState } from 'react';
import { INITIAL_STATE_PERSONAL_INFO } from '@/shared/consts';
import { IPersonalInfoFormValues } from '@/shared/types';
import { LOCAL_STORAGE_KEY_NAME } from '@/shared/enums';
import { LocalStorageOperations } from '@/shared/utils';

export const usePersonalInfo = () => {
  const [form] = Form.useForm<IPersonalInfoFormValues>();
  const [personalInfoInputs, setPersonalInfoInputs] = useState<IPersonalInfoFormValues>(
    INITIAL_STATE_PERSONAL_INFO
  );
  const setFields = useCallback(() => {
    const parseData = LocalStorageOperations.getData(LOCAL_STORAGE_KEY_NAME.PERSONAL_INFO);
    if (parseData) {
      setPersonalInfoInputs(parseData);
      form.setFieldsValue(parseData);
    } else {
      setPersonalInfoInputs(INITIAL_STATE_PERSONAL_INFO);
      form.setFieldsValue(INITIAL_STATE_PERSONAL_INFO);
    }
  }, [form]);

  useLayoutEffect(() => {
    setFields();
  }, [setFields]);
  return {
    personalInfoInputs,
    setPersonalInfoInputs,
    form
  };
};
