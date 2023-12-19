import {RedirectPath, Router} from "./router";
import {CartPage, HistoryPage, ProductPage, ProductsPage, ResidentialComplexesPage, HomePage} from "./pages";

import './styles/style.scss';
 import './files/images/logo-icon.png';  
 
import listPath from './list.json';

const appRouter = new Router([
  {
    path: '',
    page: HomePage,
    // redirectTo: '/products'
  },
  {
    path: 'cart',
    page: CartPage,
  },
  {
    path: 'history',
    page: HistoryPage,
    guards: [
      () => new Promise<RedirectPath>((resolve) => {
        setTimeout(() => resolve(new RedirectPath('/')), 2_000);
      })
    ],
  },
  {
    path: 'complexes',
    page: ResidentialComplexesPage,
    resolve: {  
      productList: () => {
        return {img: 'complexImg',
        description: 'first test'}
      },
      complexesList: () => fetch(listPath).then(response => response.json()),
    },
  },
  {
    path: 'products/:productId',
    page: ProductPage,
  },
]);

appRouter.start();
