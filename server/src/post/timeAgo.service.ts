import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class TimeAgoService {
  formateDate(timestamp: number): string {
    const dayAgo = dayjs().diff(dayjs(timestamp), 'day');
    if (dayAgo === 0) {
      const hourAgo = dayjs().diff(dayjs(timestamp), 'hour');
      if (hourAgo === 0) {
        return 'just now';
      } else if (hourAgo === 1) {
        return 'an hour ago';
      } else {
        return `${timestamp} hours ago`;
      }
    } else if (dayAgo === 1) {
      return 'yesterday';
    } else {
      return `${timestamp} days ago`;
    }
  }
}
