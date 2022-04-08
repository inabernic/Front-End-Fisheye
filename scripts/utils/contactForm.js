export class Form {
  constructor(photographer) {
    const photographerName = photographer.name;
    this.form = document.getElementById("contact-modal");
    this.closeButton = document.querySelector(".close-form");

    this.openForm = document.querySelector(".open-form");
    this.submit = document.querySelector(".submit");
    this.openForm.addEventListener("click", () => {
      this.beforeElementFocus = document.activeElement;
      this.displayModal(photographerName);
    });
    this.manageEvent();
    this.keyboardNav();
  }
  displayModal(photographerName) {
    const formh2 = document.querySelector(".header-modal h1");
    formh2.innerHTML = "Contactez-moi<br>" + photographerName;
    this.form.style.display = "flex";
    // Hide background page of focus
    Array.from(document.body.children).forEach((child) => {
      if (child !== this.form) {
        child.inert = true;
      }
    });
    this.form.querySelector(".modal").focus();
  }

  manageEvent() {
    this.closeButton.addEventListener("click", () => {
      this.closeModal();
    });
    this.submit.addEventListener("click", (e) => {
      if (this.validate()) {
        this.submitData();
        this.closeModal();
      }
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  }
  keyboardNav() {
    this.form.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && this.submit.contains(document.activeElement)) {
        e.preventDefault();
        this.closeButton.setAttribute("tabindex", "0");
        this.closeButton.focus();
      }
      if (
        e.key === "Escape" ||
        (e.key === " " && this.closeButton.contains(document.activeElement)) ||
        (e.key === " " && this.submit.contains(document.activeElement))
      ) {
        e.preventDefault();
        this.closeModal(this.beforeElementFocus);
      }
    });
  }
  submitData() {
    const inputs = document.querySelectorAll("form input");
    const userMessage = [];
    inputs.forEach((input) => {
      userMessage.push(input.value);
    });
    const textarea = document.querySelector("form textarea").value;
    userMessage.push(textarea);
    userMessage.forEach((data) => {
      console.log(data);
    });
  }
  closeModal(beforeElementFocus) {
    this.form.style.display = "none";
    this.closeButton.setAttribute("tabindex", "-1");

    // Make the page focusable again
    Array.from(document.body.children).forEach((child) => {
      if (child !== this.form) {
        child.inert = false;
      }
    });
    if (beforeElementFocus != undefined) {
      beforeElementFocus.focus();
    }
  }

  // La fonction dedié pour la validation de la form
  validate() {
    let valid = true;
    valid = valid & this.checkFirstName();
    valid = valid & this.checklastName();
    valid = valid & this.checkemailValid();
    valid = valid & this.checkMessage();
    return false;
  }

  /**  La verification et validation du Prenom  FirstName , la longeur min 2 caracteres, sans caracteres speciaux, les accents accepteés, la fonction return un boolean */
  checkFirstName() {
    const firstName = document.getElementById("prenom");
    const firstErrorMsg = document.querySelector(".firstErrorMsg");
    const regPatern = /^[[A-Za-z\é\è\ê\ç\ë\à\-]{2,20}$/g;
    const isFirstNameValid = regPatern.test(firstName.value);

    if (isFirstNameValid) {
      firstErrorMsg.classList.add("hidden");
      firstName.setCustomValidity("");
    } else {
      firstErrorMsg.classList.remove("hidden");
      //la transformation in input invalid, pour activer les styles du css, qui va colorer le background du input
      firstName.setCustomValidity("Invalid field.");
    }
    return isFirstNameValid;
  }

  /**Check lastName */
  checklastName() {
    let lastName = document.getElementById("nom");
    const lastErrorMsg = document.querySelector(".lastErrorMsg");
    const regPatern = /^[[A-Za-z\é\è\ê\ç\ë\à\-]{2,20}$/g;
    let isLastNameValid = regPatern.test(lastName.value);

    if (isLastNameValid) {
      lastErrorMsg.classList.add("hidden");
      lastName.setCustomValidity("");
    } else {
      lastErrorMsg.classList.remove("hidden");
      lastName.setCustomValidity("Invalid field.");
    }
    return isLastNameValid;
  }

  /**Check email */
  checkemailValid() {
    let emailValid = document.getElementById("email");
    let regExMail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let emailErrorMsg = document.querySelector(".emailErrorMsg");
    let isEmailValid = regExMail.test(emailValid.value);

    if (isEmailValid) {
      emailErrorMsg.classList.add("hidden");
      emailValid.setCustomValidity("");
    } else {
      emailErrorMsg.classList.remove("hidden");
      emailValid.setCustomValidity("Invalid field.");
    }
    return isEmailValid;
  }
  checkMessage() {
    const mess = document.getElementById("commentaire");
    const messErrorMsg = document.querySelector(".messErrorMsg");
    //console.log(messErrorMsg);
    //const regPatern = /^[[A-Za-z\é\è\ê\ç\ë\à\-]$/;
    //console.log(mess.value);
    //console.log(mess);
    const isMessNameValid = mess.value;
    //console.log(isMessNameValid);
    if (isMessNameValid) {
      messErrorMsg.classList.add("hidden");
      mess.setCustomValidity("");
    } else {
      messErrorMsg.classList.remove("hidden");
      //la transformation in input invalid, pour activer les styles du css, qui va colorer le background du input
      mess.setCustomValidity("Invalid field.");
    }
    return isMessNameValid;
  }
}
