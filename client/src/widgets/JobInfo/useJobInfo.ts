import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { JobApi } from '@/entities/job/api';
import { ArrayJobsType } from '@/entities/job/types';
import { INITIAL_STATE_JOB_INFO } from '@/shared/consts';
import { LOCAL_STORAGE_KEY_NAME } from '@/shared/enums';
import { IJobInfoFormValues } from '@/shared/types';
import { handleAxiosError, LocalStorageOperations } from '@/shared/utils';

export const useJobInfo = () => {
  const [jobSelectOptions, setJobSelectOptions] = useState<ArrayJobsType>([]);
  const [jobInfoFields, setJobInfoFields] = useState<IJobInfoFormValues>(INITIAL_STATE_JOB_INFO);
  const [form] = Form.useForm();

  const loadJob = () => {
    JobApi.getJobs()
      .then((response) => {
        if (response.status === 200 && response.data) {
          setJobSelectOptions(response.data);
        }
      })
      .catch((error) => {
        message.error('Ошибка при получении данных');
        handleAxiosError(error);
      });
  };

  const setJobFields = () => {
    const parseData = LocalStorageOperations.getData(LOCAL_STORAGE_KEY_NAME.JOB_INFO);

    if (parseData) {
      setJobInfoFields(parseData);
      form.setFieldsValue(parseData);
    } else {
      setJobInfoFields(jobInfoFields);
    }
  };

  useEffect(() => {
    loadJob();
    setJobFields();
  }, [form]);

  return { jobSelectOptions, jobInfoFields, form, setJobInfoFields };
};
