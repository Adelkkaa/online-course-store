import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CUSTOM_FILTER,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './utils/constants';
import { Admin } from './pages/Admin';
import { Basket } from './pages/Basket';
import { Shop } from './pages/Shop';
import { Auth } from './pages/Auth';
import { DevicePage } from './pages/DevicePage';
import CustomFilter from './pages/CustomFilter';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: DevicePage,
  },
  {
    path: CUSTOM_FILTER,
    Component: CustomFilter,
  },
];
