import { isFinexEnabled } from '../api';

export const getOrderAPI = () => (isFinexEnabled() ? 'authz' : 'core');
