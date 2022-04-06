import { Api } from "../api/api.js";
import { Form } from "../utils/contactForm.js";
import { PhotographerProfil as PhotographeHeader } from "../templates/photographerProfil/photographerProfil.js";
import { MediasFactory } from "../factories/photographerMediasFactory.js";
import { Lightbox } from "../utils/lightbox.js";
import { AsideLikes } from "../templates/likes/photographerAsideLikes.js";

class App {
  static async init() {
    // Get the query string from the url
    const urlSearchParams = new URLSearchParams(location.search);
    const id = parseFloat(urlSearchParams.get("photographer"));

    // Stores photographer data in an array
    const globalDataApi = new Api("./data/photographers.json");
    const globalData = await globalDataApi.getData();
    new App(globalData, id);
  }
  constructor(globalData, id) {
    this.medias = globalData.media;
    this.photographers = globalData.photographers;
    this.id = id;
    const photographer = this.photographers.find(
      (photographe) => photographe.id === this.id
    );
    photographer.alt = photographer.name;
    this.launchHeaderPhotographer(photographer);
    this.launchPortfolio(photographer);
  }
  launchHeaderPhotographer(photographer) {
    new PhotographerProfil(photographer);
  }
  launchPortfolio(photographer) {
    const tabMedias = [];
    this.medias.forEach((media) => {
      if (this.id == media.photographerId) {
        media.alt = media.title;
        tabMedias.push(media);
      }
    });
    new Portfolio(photographer, tabMedias);
  }
}

class PhotographerProfil {
  constructor(photographer) {
    this.photographer = photographer;
    this.photographerSection();
  }
  photographerSection() {
    const sectionPhotographe = document.querySelector("#section-photographe");
    const sectionContent = new PhotographeHeader(this.photographer);
    sectionPhotographe.innerHTML = sectionContent.createUserProfil();
    new Form(this.photographer);
  }
}

class Portfolio {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.medias = medias;

    // sort by popularity on page load
    this.medias.sort(function (a, b) {
      return b.likes - a.likes;
    });
    this.generatePortfolio(this.medias);
    this.sortWidget();
    this.displayGlobalLikes();
  }
  sortWidget() {
    const toggleBox = document.querySelector(".toggle-listbox");
    const sortOptions = Array.from(document.querySelectorAll(".sort-option"));
    let optionShowed = document.querySelectorAll(".dropdown > button");
    let widgetOpen = false;

    // togglebox button property
    toggleBox.addEventListener("click", () => {
      if (widgetOpen == false) {
        sortOptions.forEach((option) => {
          option.style.display = "block";
        });
        optionShowed[0].focus();
        widgetOpen = true;
      } else {
        sortOptions.forEach((option) => {
          option.style.display = "none";
        });
        widgetOpen = false;
      }
    });

    sortOptions.forEach((element) => {
      // sort button property
      element.addEventListener("click", () => {
        switch (element.value) {
          case "popularity":
            this.medias.sort(function (a, b) {
              return b.likes - a.likes;
            });
            break;
          case "date":
            this.medias.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });
            break;
          case "title":
            this.medias.sort(function (a, b) {
              return a.title.localeCompare(b.title);
            });
            break;
        }
        this.generatePortfolio(this.medias);

        // new list of options
        const hideElement = document.querySelector(".hidden button");
        const activeOption = document.querySelector(".active-option");
        const currentButtonPos = sortOptions.indexOf(element);
        const clickedOptionValue = sortOptions[currentButtonPos].innerText;
        activeOption.innerText = clickedOptionValue;
        toggleBox.setAttribute(
          "aria-label",
          `liste de trie, trié par ${clickedOptionValue}`
        );
        document.querySelector(".dropdown").appendChild(hideElement);
        document.querySelector(".hidden").appendChild(element);
        optionShowed = document.querySelectorAll(".dropdown > button");

        // close the sortwidget after clicking on an option
        sortOptions.forEach((option) => {
          option.style.display = "none";
        });
        widgetOpen = false;
        toggleBox.focus();
      });
    });

    // sortwidget keyboard event
    document
      .querySelectorAll(".dropdown [role='button'], button")
      .forEach((button) => {
        button.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            button.click();
          }
          if (e.key === "Tab") {
            if (document.activeElement.value == optionShowed[1].value) {
              toggleBox.focus();
              e.preventDefault();
            }
          }
        });
      });
  }
  generatePortfolio(medias) {
    const portfolioBlock = document.querySelector(".portfolio");
    portfolioBlock.innerHTML = "";
    medias.forEach((media) => {
      const photoCardDOM = new MediasFactory(media, this.photographer.name);
      portfolioBlock.appendChild(photoCardDOM.buildMediaCard());
      this.individualLikesCount(media);
    });
    // initialize the lightboxes
    Lightbox.init();
  }
  individualLikesCount(media) {
    const likeButton = document.getElementById(media.id);
    if (media.liked === "true") {
      likeButton.checked = true;
    }
    let nbLikes = parseFloat(media.likes);

    // Keyboard event
    likeButton.parentElement.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        likeButton.click();
        e.preventDefault();
      }
    });

    likeButton.addEventListener("change", () => {
      if (media.liked === undefined || media.liked === "false") {
        nbLikes += 1;
        media.liked = "true";
        likeButton.parentElement.setAttribute("aria-label", "liké");
      } else {
        nbLikes -= 1;
        media.liked = "false";
      }

      // redefine the number of media likes
      media.likes = nbLikes;
      likeButton.parentElement.previousElementSibling.textContent = nbLikes;
      this.implementTotalLikes();
    });
  }
  displayGlobalLikes() {
    const main = document.getElementById("main");
    const globalCount = new AsideLikes(this.medias, this.photographer);
    main.appendChild(globalCount.createAsideLikes());
  }
  implementTotalLikes() {
    const globalLikes = document.querySelector(".globalLikes");
    const mediaLikes = document.querySelectorAll(".likes");
    let likes = 0;
    mediaLikes.forEach((element) => {
      likes = likes + parseFloat(element.innerText);
    });
    globalLikes.innerHTML = likes + `   <i class="fas fa-heart"></i>`;
  }
}

App.init();
