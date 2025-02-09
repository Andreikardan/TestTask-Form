import { AxiosResponse } from 'axios';
import { ArrayJobsType } from '../types';
import { axiosInstance } from '@/shared/lib';
import { handleAxiosError } from '@/shared/utils';

export class JobApi {
  static async getJobs(): Promise<AxiosResponse<ArrayJobsType>> {
    try {
      const response = await axiosInstance.get<ArrayJobsType>(
        `${import.meta.env.VITE_API}category-list`
      );
      return response;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  }
}
