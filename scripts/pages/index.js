import { Api } from "../api/api.js";
import { PhotographerCard } from "../templates/photographersCard/photographers.js";

class App {
  static async init() {
    const globalDataApi = new Api("./data/photographers.json");
    const globalData = await globalDataApi.getData();
    new App(globalData);
  }
  constructor(globalData) {
    this.globalData = globalData;
    this.displayCard();
  }
  displayCard() {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );
    this.globalData.photographers.forEach((photographer) => {
      photographer.alt = photographer.name;
      const userCardDOM = new PhotographerCard(photographer);
      photographersSection.appendChild(userCardDOM.createPhotographerCard());
    });
  }
}

App.init();
