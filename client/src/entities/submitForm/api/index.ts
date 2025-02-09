import { AxiosResponse } from 'axios';
import { IonSubmitData, SubmitSuccessResponse } from '../types';
import { axiosInstance } from '@/shared/lib';
import { handleAxiosError } from '@/shared/utils';

export class SubmitApi {
  static async submit(onSubmitData: IonSubmitData): Promise<AxiosResponse<SubmitSuccessResponse>> {
    try {
      const response = await axiosInstance.post<SubmitSuccessResponse>(
        `${import.meta.env.VITE_API}add`,
        onSubmitData
      );
      return response;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  }
}
