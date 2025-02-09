import { AxiosError } from 'axios';

export function handleAxiosError(error: unknown): void {
  if (error instanceof AxiosError) {
    if (error.code === 'ERR_CANCELED') {
      throw new Error(
        'Время ожидания истекло. Повторите позднее или проверьте настройки интернета.'
      );
    }

    if (error.code === 'ERR_NETWORK') {
      throw new Error('Ошибка подключения к серверу, повторите позднее.');
    }
  }

  throw new Error('Неизвестная ошибка.');
}
