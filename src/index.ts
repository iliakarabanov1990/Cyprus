import { RedirectPath, Router } from "./router";
import { HomePage, ComplexesPage, FavoritesPage, } from "./pages";
import { locations, complexes, apartments } from "./models/listsAndEnums/lists";
import { dbTables } from "./models/listsAndEnums/dbTables";
import { ComplexPage } from "./pages/complex/ComplexPage";
import { User } from "./models/user/User";
import { userDataValidating } from "./service/validator/userDataValidating";
import { FormValidator } from "./service/validator/FormValidator";
import {requiredText, validEmail, validPhone} from "./service/validator/Validators";
import { clearMessages, createElementByErr, setFormErrors } from "./service/validator/serviceFunctions";
import { currDB } from "./dataBase/serviceDB";
import "./styles/style.scss";

// import {  Router } from "./router";
// import { CartPage } from "./pages";


locations.updateFromDB(dbTables.locations)
  .then(() => complexes.updateFromDB(dbTables.complexes))
  .then(() => apartments.updateFromDB(dbTables.apartments));
    
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
  }
});

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

logInForm.addEventListener("submit", (event) => handleLogIn(event, logInForm, buttonLogIn, buttonSubmitLogIn, idPassLabel));

const appRouter = new Router([
  {
    path: "",
    page: HomePage,
    resolve: {
      user: ()=>user,
    },
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

  const quizForm = document.forms.namedItem("quiz")!;
  const contactForm = document.forms.namedItem("contact")!;

  if(user && user.authorized){
    buttonLogIn.textContent = "Профиль";
    buttonSubmitLogIn.textContent = "Выйти";
    logInForm.querySelector('input[name="user-phone"]')!.setAttribute('readOnly', 'true');
    logInForm.querySelector('input[name="user-name"]')!.setAttribute('readOnly', 'true');
    logInForm.querySelector('input[name="user-email"]')!.setAttribute('readOnly', 'true');
    logInForm.querySelector('input[name="user-password"]')!.setAttribute('type', 'hidden');
    idPassLabel!.style.display = 'none'; 

    if(quizForm)
      quizForm.querySelector('input[name="user-phone"]')!.setAttribute('value', (user as User).phone as string);
    if(contactForm)
    contactForm.querySelector('input[name="user-phone"]')!.setAttribute('value', (user as User).phone as string);
  }
  else{
    buttonLogIn.textContent = "Войти";  
    buttonSubmitLogIn.textContent = "Войти";
    logInForm.querySelector('input[name="user-phone"]')!.removeAttribute('readOnly');
    logInForm.querySelector('input[name="user-email"]')!.removeAttribute('readOnly');
    logInForm.querySelector('input[name="user-name"]')!.removeAttribute('readOnly');
    logInForm.querySelector('input[name="user-password"]')!.setAttribute('value', '');
    logInForm.querySelector('input[name="user-password"]')!.setAttribute('type', 'password');
    
    if(quizForm)
      quizForm.querySelector('input[name="user-phone"]')!.setAttribute('value', '');
    if(contactForm)
      contactForm.querySelector('input[name="user-phone"]')!.setAttribute('value', (user as User).phone as string);
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
       setTimeout(()=>{appRouter.navigate(window.location.pathname)}, 100);
    else
      document.getElementById('submitError')!.appendChild(createElementByErr('Вход не выполнен'));
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









// document.addEventListener("click", getCountryByIp);
// function getCountryByIp() {
//   fetch('https://ipapi.co/json/')
//   .then(d => d.json())
//   .then(d => {
//     var url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
//     var token = "130c12b40a67cb51d371ef2183a05dd9da722537";
//     var query = d.ip;

//     const options = {
//     method: "GET",
//     mode: "cors",
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "Authorization": "Token " + token
//       }
//     }

//     fetch(url + query, options as RequestInit)
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .catch(error => console.log("error", error));
//   });
// }
