import { User } from "../../models/user/User";
import {AbstractPage, Router} from "../../router";
import template from './homePage.html';

const templEl = document.createElement('template');
templEl.innerHTML = template;

export class HomePage extends AbstractPage {

  user = this.routeState!.resolvedData!.user;
  // appRouter =  this.routeState!.resolvedData!.appRouter;

  render(): HTMLElement | DocumentFragment {

    const cloneTemplateItemEl = templEl.content.cloneNode(true) as HTMLElement;
    cloneTemplateItemEl.querySelector('.range-payment')!.addEventListener('input', (event) => {
        const el = event.target as HTMLFormElement;
        el.closest('.range_box')!.querySelector('.range-payment-value')!.innerHTML = el.value + '0 000$';
    });

    cloneTemplateItemEl.querySelector('.range-month')!.addEventListener('input', (event) => {
      const el = event.target as HTMLFormElement;
      el.closest('.range_box')!.querySelector('.range-month-value')!.innerHTML = el.value;
    });

    const quizForm = cloneTemplateItemEl.querySelector('.quiz')! as HTMLFormElement;
    const contactForm = cloneTemplateItemEl.querySelector('.contact')! as HTMLFormElement;
    quizForm.addEventListener("submit", (event) => this.createQuizAnswer(event, quizForm));
    contactForm.addEventListener("submit", (event) => this.createLead(event, contactForm));

    return cloneTemplateItemEl;
  }

  async createQuizAnswer(event: SubmitEvent, quizForm: HTMLFormElement): Promise<void>{
  
    event.preventDefault();
  
    const phone = String(new FormData(quizForm).get("user-phone")).trim();
    const month = String(new FormData(quizForm).get("range-month")).trim();
    const payment = String(new FormData(quizForm).get("range-payment")).trim();
    
    (this.user as User).addAnswerQuiz('Расчет прибыли', phone, month, payment);

    // quizForm.style.display = 'none';
  
    // setTimeout(()=>{(this.appRouter as Router).navigate(window.location.pathname)}, 100);
  
  }
  
  async createLead(event: SubmitEvent, contactForm: HTMLFormElement): Promise<void>{
    
    event.preventDefault();
  
    const phone = String(new FormData(contactForm).get("user-phone")).trim();
  
    (this.user as User).addLead(phone, (this.user as User).phone as string);

    // contactForm.style.display = 'none';
  
    // setTimeout(()=>{(this.appRouter as Router).navigate(window.location.pathname)}, 100);
  
  }
}
