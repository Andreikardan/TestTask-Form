import styles from './JobInfo.module.css';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Space, message } from 'antd';
import { ROUTES, LOCAL_STORAGE_KEY_NAME } from '@/shared/enums';
import { LocalStorageOperations } from '@/shared/utils';
import { IJobInfoFormValues } from '@/shared/types';
import { useJobInfo } from '../useJobInfo'
import { Button } from '@/shared/ui';

export function JobInfo(): JSX.Element {
  const { Option } = Select;
  const navigate = useNavigate();
  const { jobSelectOptions, jobInfoFields, form, setJobInfoFields } = useJobInfo();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    name: keyof IJobInfoFormValues
  ) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setJobInfoFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobSelectChange = (value: string) => {
    handleInputChange(value, 'job');
  };

  const nextFormHandler = () => {
    form
      .validateFields()
      .then((values) => {
        LocalStorageOperations.setData(LOCAL_STORAGE_KEY_NAME.JOB_INFO, values);

        navigate(ROUTES.LOAN_PARAMS);
      })
      .catch(() => {
        message.error('Пожалуйста, заполните все поля корректно!');
      });
  };

  return (
    <div className={styles.container}>
      <Form form={form} layout="vertical" initialValues={jobInfoFields}>
        <Form.Item
          className={styles.formItem}
          name="address"
          label="Адрес"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, укажите ваш адрес'
            },
            {
              validator: (_, value) => {
                if (value.trim() === '') {
                  return Promise.reject(new Error('Адрес не может состоять только из пробелов!'));
                }
                return Promise.resolve();
              },
            },
          ]}
          hasFeedback>
          <Input
            name="address"
            value={jobInfoFields.address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'address')}
          />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="job"
          label="Место работы"
          hasFeedback={true}
          rules={[{ required: true, message: 'А тут ваше место работы' }]}>
          <Select value={jobInfoFields.job} onChange={handleJobSelectChange}>
            {jobSelectOptions.map((job) => (
              <Option key={job} value={job}>
                {job}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Space className={styles.buttons}>
            <Button color="pink" text="Назад" onClick={() => navigate(-1)} />
            <Button color="blue" text="Далее" onClick={nextFormHandler} />
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
