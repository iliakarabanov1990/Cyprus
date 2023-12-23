import { RedirectPath, Router } from "./router";
import {
  CartPage,
  HistoryPage,
  ProductPage,
  HomePage,
  ComplexesPage,
} from "./pages";

import "./styles/style.scss";
//  import './files/images/logo-icon.png';

import listPath from "listLocations.json";
import { dataMap } from "./models/listsAndEnums/dataMap";
import { dbTables } from "./models/listsAndEnums/dbTables";
import { ComplexPage } from "./pages/complex/ComplexPage";
import { ApartmentList } from "./models/apartment/ApartmentList";
import { User } from "./models/user/User";
import { userDataValidating } from "./service/validator/userDataValidating";
import { FormValidator } from "./service/validator/FormValidator";
import {requiredText, validEmail, validPhone} from "./service/validator/Validators";
import { clearMessages, setFormErrors } from "./service/validator/serviceFunctions";

// await locations.updateFromDB();
// await complexes.updateFromDB();

const logInForm = document.forms.namedItem("log-in")!;
const buttonLogIn = document.querySelector('.log-in button')!;
const buttonSubmitLogIn = logInForm.querySelector('input[name="submit"]')!;
let user: User | undefined;//подтянуть из локал стореджа

const userDataValidator = new FormValidator <userDataValidating>({
  name: [],
  email: [
      validEmail,
  ],
  phone: [
      requiredText,
      validPhone,
  ],
  password: [
      requiredText,
  ],
});

logInForm.addEventListener("submit", (event) => {
  
  event.preventDefault();

  if(buttonLogIn.textContent === "Войти"){

    const userData: userDataValidating = {
      name: String(new FormData(logInForm).get("user-password")).trim(),
      phone: String(new FormData(logInForm).get("user-phone")).trim(),
      email: String(new FormData(logInForm).get("user-email")).trim(),
      password: String(new FormData(logInForm).get("user-password")).trim(),
      
  };

    const errors = userDataValidator.validate(userData);

    clearMessages(document);
    setFormErrors(document, errors);

    if(errors) return;

    if (!user){
      user = new User(userData.phone, userData.email, userData.password, userData.name);
    }
    //записать в локал сторедж внутри метода
    user.authorize().then(()=>{
      if(user!.authorized){
        buttonLogIn.textContent = "Профиль";
        buttonSubmitLogIn.textContent = "Выйти";
      }
      else{
        buttonLogIn.textContent = "Войти";  
        buttonSubmitLogIn.textContent = "Войти";
      }
    })
  }
  else{
    // удалить пользака
    // и почистить локалсторедж
  }

  // logInForm.reset();

});

const appRouter = new Router([
  {
    path: "",
    page: HomePage,
    // redirectTo: '/products'
  },
  {
    path: "cart",
    page: CartPage,
  },
  {
    path: "history",
    page: HistoryPage,
    guards: [
      () =>
        new Promise<RedirectPath>((resolve) => {
          setTimeout(() => resolve(new RedirectPath("/")), 2_000);
        }),
    ],
  },
  {
    path: "complexes",
    page: ComplexesPage,
    resolve: {
      complexList: () =>
        dataMap
          .get(dbTables.locations)
          ?.updateFromDB(dbTables.locations)
          .then(() =>
            dataMap.get(dbTables.complexes)?.updateFromDB(dbTables.complexes)
          )
          .then(() => true)
          .catch(() => false),
      // complexesList: () => fetch(listPath).then(response => response.json()),
    },
  },

  {
    path: "complexes/:complexId",
    page: ComplexPage,
    resolve: {
      apartList: (state) => {
        const apartList = dataMap.get(dbTables.apartments) as ApartmentList;
        return apartList.getByComplexId(state.params.complexId);
      },
      // complexesList: () => fetch(listPath).then(response => response.json()),
    },
  },

  {
    path: "products/:productId",
    page: ProductPage,
  },
]);

appRouter.start();
