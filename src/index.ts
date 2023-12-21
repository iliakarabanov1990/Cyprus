import {RedirectPath, Router} from "./router";
import {CartPage, HistoryPage, ProductPage, HomePage, ComplexesPage} from "./pages";

import './styles/style.scss';
//  import './files/images/logo-icon.png';  
 
import listPath from 'listLocations.json';
import { dataMap } from "./models/listsAndEnums/dataMap";
import { dbTables } from "./models/listsAndEnums/dbTables";
import { ComplexPage } from "./pages/ComplexPage";
import { ApartmentList } from "./models/apartment/ApartmentList";

// await locations.updateFromDB();
// await complexes.updateFromDB();

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
    page: ComplexesPage,
    resolve: {  
      complexList: () =>
        dataMap.get(dbTables.locations)?.updateFromDB(dbTables.locations)
        .then(() =>dataMap.get(dbTables.complexes)?.updateFromDB(dbTables.complexes))
        .then(() => true)
        .catch(()=> false),
      // complexesList: () => fetch(listPath).then(response => response.json()),
    },
  },

  {
    path: 'complexes/:complexId',
    page: ComplexPage,
    resolve: {  
      apartList: (state) => {
        const apartList = dataMap.get(dbTables.apartments) as ApartmentList;
        apartList.getByComplexId(state.params.complexId)
        .then(() => true)
        .catch(()=> false)
      },
      // complexesList: () => fetch(listPath).then(response => response.json()),
    },
  },


  {
    path: 'products/:productId',
    page: ProductPage,
  },
]);

appRouter.start();
