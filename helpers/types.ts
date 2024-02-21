import { Network } from './constants';

export type ParamsPerNetwork<T> = {
  [k in Network]?: T;
};
