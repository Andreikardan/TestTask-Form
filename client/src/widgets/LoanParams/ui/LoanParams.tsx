import styles from './LoanParams.module.css';
import { useState } from 'react';
import { Form, message, Slider, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLoanParamsInfo } from '../useLoanParams';
import { SubmitApi } from '@/entities/submitForm/api';
import { ModalWindow, Button, SuccessSubmitMessage } from '@/shared/ui';
import { ROUTES, LOCAL_STORAGE_KEY_NAME } from '@/shared/enums';
import { AMOUNT_MARKS, DAY_MARKS } from '@/shared/consts';
import { LocalStorageOperations } from '@/shared/utils';
import { IRawPersonalInfo } from '@/shared/types';

export function LoanParams(): JSX.Element {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<IRawPersonalInfo>({
    firstName: '',
    lastName: ''
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { loanInputs, setLoanInputs, form } = useLoanParamsInfo();

  const changeHandler = (value: number, name: string) => {
    setLoanInputs((prev) => {
      const newState = {
        ...prev,
        [name]: value
      };
      LocalStorageOperations.setData(LOCAL_STORAGE_KEY_NAME.LOAN_DATA, newState);
      return newState;
    });
  };

  const handleSubmit = async () => {
    const localStorageData = LocalStorageOperations.getData('PersonalInfo');
    setUserInfo(localStorageData);
    const apiData = await SubmitApi.submit({
      title: `${userInfo.firstName}` + ' ' + `${userInfo.lastName}`
    });

    if (apiData.status !== 201) {
      return message.error(`Что-то пошло не так ${apiData.statusText}`);
    }
    setIsModalVisible(true);
    localStorage.clear();
  };

  return (
    <div className={styles.container}>
      <Form className={styles.form} form={form} layout="vertical" initialValues={loanInputs}>
        <Form.Item
          name="loanAmount"
          label="Сумма займа ($)"
          rules={[{ required: true, message: 'Пожалуйста, выберите сумму займа!' }]}
          className={styles.formItem}>
          <Slider
            value={loanInputs.loanAmount}
            min={200}
            max={1000}
            step={100}
            marks={AMOUNT_MARKS}
            tooltip={{ formatter: (value:number | undefined) => `$${value}` }}
            onChange={(value:number) => changeHandler(value, 'loanAmount')}
            className={styles.slider}
          />
        </Form.Item>

        <Form.Item
          name="loanTerm"
          label="Срок займа (дни)"
          rules={[{ required: true, message: 'Пожалуйста, выберите срок займа!' }]}
          className={styles.formItem}>
          <Slider
            value={loanInputs.loanTerm}
            min={10}
            max={30}
            step={1}
            marks={DAY_MARKS}
            tooltip={{ formatter: (value:number | undefined) => `${value} дней` }}
            onChange={(value:number) => changeHandler(value, 'loanTerm')}
            className={styles.slider}
          />
        </Form.Item>

        <Form.Item>
          <Space className={styles.buttons}>
            <Button color="pink" text="Назад" onClick={() => navigate(-1)} />
            <Button color="blue" text="Отправить" onClick={handleSubmit} />
          </Space>
        </Form.Item>
      </Form>

      <ModalWindow
        title="Поздравляем!"
        visible={isModalVisible}
        onCancel={() => navigate(ROUTES.HOME)}
        onOk={() => navigate(ROUTES.HOME)}
        content={<SuccessSubmitMessage userInfo={userInfo} loanInputs={loanInputs} />}
      />
    </div>
  );
}
