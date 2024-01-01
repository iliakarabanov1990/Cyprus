import { RedirectPath, Router } from "./router";
import { HomePage, ComplexesPage, FavoritesPage, } from "./pages";
import { complexes, apartments, locations } from "./models/listsAndEnums/lists";
import { dbTables } from "./models/listsAndEnums/dbTables";
import { ComplexPage } from "./pages/complex/ComplexPage";
import { User } from "./models/user/User";
import { userDataValidating } from "./service/validator/userDataValidating";
import { FormValidator } from "./service/validator/FormValidator";
import {requiredText, validEmail, validPhone} from "./service/validator/Validators";
import { clearMessages, createElementByErr, setFormErrors } from "./service/validator/serviceFunctions";
import { currDB, userStorage } from "./dataBase/serviceDB";
import "./styles/style.scss";

await locations.updateFromDB(dbTables.locations)
  .then(() => complexes.updateFromDB(dbTables.complexes))
  .then(() => apartments.updateFromDB(dbTables.apartments));

const currPage = "/";
const logInForm = document.forms.namedItem("log-in")!;
const buttonLogIn = document.querySelector('.log-in button')! as HTMLElement;
const buttonSubmitLogIn = logInForm.querySelector('button[name="submit"]')! as HTMLElement;
const idPassLabel = document.getElementById('id-pass-label') as HTMLElement;
let user: User = new User();

currDB.auth.onAuthStateChanged((us) => {
  if (us) {

    user = new User(us.email!.replace('@mail.com', ''), '', '', us.displayName ?? undefined);
    user.authorized = true;
    setVisualizationForUser(user, logInForm, buttonLogIn, buttonSubmitLogIn, idPassLabel);

  } else {
    user = new User();
    setVisualizationForUser(user, logInForm, buttonLogIn, buttonSubmitLogIn, idPassLabel);
  }});

  // setVisualizationForUser(user, logInForm, buttonLogIn, buttonSubmitLogIn, idPassLabel);

 const curUs = currDB.getCurrUser();
// const userLocal = await userStorage.get();
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


// if(userLocal.length && userLocal[0].id){
//   const userRow = userLocal[0];
//   user = new User(userRow.id as idDB, userRow.email as string, '', userRow.name as string);
//   user.authorized = userRow.authorized as boolean;
//   setVisualizationForUser(user, logInForm, buttonLogIn, buttonSubmitLogIn, idPassLabel);
//   await apartments.updateFavoriteFromServerDB(user);
// }

logInForm.addEventListener("submit", (event) => handleLogIn(event, logInForm, buttonLogIn, buttonSubmitLogIn, idPassLabel));

const appRouter = new Router([
  {
    path: "",
    page: HomePage,
  },
  {
    path: "complexes",
    page: ComplexesPage,
    resolve: {
      complexList: () =>
        locations.updateFromDB(dbTables.locations)
          .then(() =>
            complexes.updateFromDB(dbTables.complexes)
          )
          .then(() => Array.from(complexes.objectList.values()))
          .catch(() => false),
    },
  },

  {
    path: "complexes/:complexId",
    page: ComplexPage,
    resolve: {
      apartList: (state) => {
        const complexId = state.params.complexId;
        return apartments.updateByComplexId(complexId).then(()=>
            Array.from(apartments.objectList.values()).filter(el => el.complex!.id === complexId))
      },
      user: ()=>(user),
    },
  },

  {
    path: "favorites",
    page: FavoritesPage,
    resolve: {
      apartList: () => {
        return apartments.updateFavoriteFromServerDB(user!).then((result)=> {
          if(result)
            return Array.from(apartments.objectList.values()).filter(el => apartments.favoriteList.has(el.id))
          else
            return result;
        })
      },
      user: ()=>(user),
    },
    guards: [
      () => {
        if(user && user!.authorized)
          return true;
        return new Promise<RedirectPath>((resolve) => {
            setTimeout(() => resolve(new RedirectPath("/")), 2_000);
        })},
    ],
  },
]);

appRouter.start();

function setVisualizationForUser(user: User, logInForm: HTMLFormElement, buttonLogIn: HTMLElement, buttonSubmitLogIn: HTMLElement, idPassLabel: HTMLElement){

  if(user){
    logInForm.querySelector('input[name="user-name"]')!.setAttribute('value', user.name as string);
    logInForm.querySelector('input[name="user-phone"]')!.setAttribute('value', user.phone as string);
    logInForm.querySelector('input[name="user-email"]')!.setAttribute('value', user.email as string);
  }

  if(user && user.authorized){
    buttonLogIn.textContent = "Профиль";
    buttonSubmitLogIn.textContent = "Выйти";
    logInForm.querySelector('input[name="user-phone"]')!.setAttribute('readOnly', 'true');
    logInForm.querySelector('input[name="user-name"]')!.setAttribute('readOnly', 'true');
    logInForm.querySelector('input[name="user-email"]')!.setAttribute('readOnly', 'true');
    logInForm.querySelector('input[name="user-password"]')!.setAttribute('type', 'hidden');
    idPassLabel!.style.display = 'none'; 
  }
  else{
    buttonLogIn.textContent = "Войти";  
    buttonSubmitLogIn.textContent = "Войти";
    logInForm.querySelector('input[name="user-phone"]')!.removeAttribute('readOnly');
    logInForm.querySelector('input[name="user-email"]')!.removeAttribute('readOnly');
    logInForm.querySelector('input[name="user-name"]')!.removeAttribute('readOnly');
    logInForm.querySelector('input[name="user-password"]')!.setAttribute('value', '');
    logInForm.querySelector('input[name="user-password"]')!.setAttribute('type', 'password');
  }
}

async function handleLogIn(event: SubmitEvent, logInForm: HTMLFormElement, buttonLogIn: HTMLElement, buttonSubmitLogIn: HTMLElement, idPassLabel: HTMLElement): Promise<void>{
  
  event.preventDefault();

  if(buttonSubmitLogIn.textContent === "Войти"){

    const userData: userDataValidating = {
      name: String(new FormData(logInForm).get("user-name")).trim(),
      phone: String(new FormData(logInForm).get("user-phone")).trim(),
      email: String(new FormData(logInForm).get("user-email")).trim(),
      password: String(new FormData(logInForm).get("user-password")).trim(),  
    };

    const errors = userDataValidator.validate(userData);
    clearMessages(document);
    setFormErrors(document, errors);

    if(errors) return;

    user = new User(userData.phone, userData.email, userData.password, userData.name);

    await user.authorize().then(() => setVisualizationForUser(user, logInForm, buttonLogIn, buttonSubmitLogIn, idPassLabel));

    if(user.authorized)
      // setTimeout(()=>{location.reload()}, 100);
       setTimeout(()=>{appRouter.navigate(window.location.pathname)}, 100);
    else
      document.getElementById('submitError')!.appendChild(createElementByErr('Вход не выполнен'));
    // if(!user.authorized)  
    //   document.getElementById('submitError')!.appendChild(createElementByErr('Вход не выполнен'));
  }
  else{ 
    user!.authorized = false;
    await currDB.signOut();

    setVisualizationForUser(user, logInForm, buttonLogIn as HTMLElement, buttonSubmitLogIn as HTMLElement, idPassLabel);
    setTimeout(()=>{appRouter.navigate(window.location.pathname)}, 100);
  }
  if(user)
    await apartments.updateFavoriteFromServerDB(user);

    const s = currDB.getCurrUser();
}
