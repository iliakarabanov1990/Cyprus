import { RedirectPath, Router } from "./router";
import {CartPage, HistoryPage, ProductPage, HomePage, ComplexesPage, } from "./pages";
import { dataMap } from "./models/listsAndEnums/dataMap";
import { dbTables } from "./models/listsAndEnums/dbTables";
import { ComplexPage } from "./pages/complex/ComplexPage";
import { ApartmentList } from "./models/apartment/ApartmentList";
import { User } from "./models/user/User";
import { userDataValidating } from "./service/validator/userDataValidating";
import { FormValidator } from "./service/validator/FormValidator";
import {requiredText, validEmail, validPhone} from "./service/validator/Validators";
import { clearMessages, createElementByErr, setFormErrors } from "./service/validator/serviceFunctions";
import { userStorage } from "./dataBase/serviceDB";
import { idDB } from "./models/interfacesAndTypes/idDB";
import "./styles/style.scss";

// await locations.updateFromDB();
// await complexes.updateFromDB();
let user: User | undefined;
const logInForm = document.forms.namedItem("log-in")!;
const buttonLogIn = document.querySelector('.log-in button')!;
const buttonSubmitLogIn = logInForm.querySelector('button[name="submit"]')!;
const userLocal = await userStorage.getAll();
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

if(userLocal.length && userLocal[0].id){
  const userRow = userLocal[0];
  user = new User(userRow.id as idDB, userRow.email as string, '', userRow.name as string);
  user.authorized = userRow.authorized as boolean;
  setVisualizationForUser(user, logInForm);
}

logInForm.addEventListener("submit", (event) => handleLogIn(event, buttonSubmitLogIn));

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

function setVisualizationForUser(user: User | undefined, logInForm: HTMLFormElement){

  // if(!user) return;

  // new FormData(logInForm).set("user-name", 'phone');
  // new FormData(logInForm).set("user-phone", 'phone');
  // new FormData(logInForm).set("user-email", 'email');
  // new FormData(logInForm).set("user-password", '');

  
  // logInForm.querySelector('input[name="user-password"]')!.textContent = '';

  logInForm.querySelector('input[name="user-name"]')!.setAttribute('value', user!.name);
  logInForm.querySelector('input[name="user-phone"]')!.setAttribute('value', user!.phone as string);
  logInForm.querySelector('input[name="user-email"]')!.setAttribute('value', user!.email);

  if(user && user.authorized){
    buttonLogIn.textContent = "Профиль";
    buttonSubmitLogIn.textContent = "Выйти";
    logInForm.querySelector('input[name="user-phone"]')!.setAttribute('readOnly', 'true');
    logInForm.querySelector('input[name="user-phone"]')!.setAttribute('readOnly', 'true');
    logInForm.querySelector('input[name="user-password"]')!.setAttribute('type', 'hidden');
    document.getElementById('id-pass-label')!.style.display = 'none'; 
  }
  else{
    buttonLogIn.textContent = "Войти";  
    buttonSubmitLogIn.textContent = "Войти";
    logInForm.querySelector('input[name="user-phone"]')!.removeAttribute('readOnly');
    logInForm.querySelector('input[name="user-phone"]')!.removeAttribute('readOnly');
    logInForm.querySelector('input[name="user-password"]')!.setAttribute('value', '');
    logInForm.querySelector('input[name="user-password"]')!.setAttribute('type', 'password');
    // document.getElementById('id-pass-label')!.style.display = 'inline'; 
  }
}

async function handleLogIn(event: SubmitEvent, buttonSubmitLogIn: Element): Promise<void>{
  
  event.preventDefault();

  if(buttonSubmitLogIn.textContent === "Войти"){

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

    user = new User(userData.phone, userData.email, userData.password, userData.name);

    await user.authorize().then(() => setVisualizationForUser(user, logInForm));

    if(user.authorized)
      document.getElementById('id-log-in')!.style.display='none';
    else
      document.getElementById('submitError')!.appendChild(createElementByErr('Вход не выполнен'));
  }
  else{ 
    user!.authorized = false;
    userStorage.writeAll([{
      'id': user!.phone,
      'email': user!.email,
      'name': user!.name,
      'password': '',
      'authorized': user!.authorized
    }]);

    setVisualizationForUser(user, logInForm);
  }

  // logInForm.reset();

}
