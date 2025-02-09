import styles from './PersonalInfo.module.css';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputProps, Select, Space, message } from 'antd';
import { ROUTES, LOCAL_STORAGE_KEY_NAME } from '@/shared/enums';
import { LocalStorageOperations } from '@/shared/utils';
import { Button } from '@/shared/ui';
import { usePersonalInfo } from '../usePersonalInfo';

export function PersonalInfo(): JSX.Element {
  const { Option } = Select;
  const { personalInfoInputs, setPersonalInfoInputs, form } = usePersonalInfo();
  const navigate = useNavigate();

  const changeInputsHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const formattedValue = value.slice(0, 12);
    setPersonalInfoInputs((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
    form.setFieldsValue({ [name]: formattedValue });
  };

  const nextFormHandler = (): void => {
    form
      .validateFields()
      .then((values) => {
        LocalStorageOperations.setData(LOCAL_STORAGE_KEY_NAME.PERSONAL_INFO, values);
        navigate(ROUTES.JOB_INFO);
      })
      .catch(() => {
        message.error('Пожалуйста, заполните все поля корректно!');
      });
  };

  return (
    <div className={styles.container}>
      <Form form={form} layout="vertical" initialValues={personalInfoInputs}>
        <Form.Item
          className={styles.formItem}
          label="Телефон"
          name="telephone"
          hasFeedback={true}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваш телефон!'
            },
            {
              pattern: /^[0-9]{4} [0-9]{3} [0-9]{3}$/,
              message: 'Телефон должен быть в формате 0XXX XXX XXX'
            }
          ]}>
          <InputMask
            mask="0999 999 999"
            maskChar={null}
            onChange={changeInputsHandler}
            name="telephone">
            {(inputProps: InputProps) => <Input {...inputProps} />}
          </InputMask>
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Имя"
          hasFeedback={true}
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваше имя!'
            },
            {
              validator: (_, value) => {
                if (value.trim() === '') {
                  return Promise.reject(new Error('Имя не может состоять только из пробелов!'));
                }
                return Promise.resolve();
              },
            },
          ]}>
          <Input name="firstName" onChange={changeInputsHandler} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Фамилия"
          hasFeedback={true}
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите вашу фамилию!'
            },
            {
              validator: (_, value) => {
                if (value.trim() === '') {
                  return Promise.reject(new Error('Фамилия не может состоять только из пробелов!'));
                }
                return Promise.resolve();
              },
            },
          ]}>
          <Input name="lastName" onChange={changeInputsHandler} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Пол"
          hasFeedback={true}
          name="gender"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите ваш пол!'
            }
          ]}>
          <Select
            onChange={(value) => {
              setPersonalInfoInputs((prev) => ({
                ...prev,
                gender: value
              }));
              form.setFieldsValue({ gender: value });
            }}>
            <Option value="male">Мужской</Option>
            <Option value="female">Женский</Option>
          </Select>
        </Form.Item>

        <Form.Item className={styles.button}>
          <Space>
            <Button color="blue" text="Далее" onClick={nextFormHandler} />
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
