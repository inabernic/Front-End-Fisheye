export class PhotographerProfil {
  constructor(photographer) {
    this.name = photographer.name;
    this.alt = photographer.alt;
    this.city = photographer.city;
    this.country = photographer.country;
    this.tagline = photographer.tagline;
    this.portrait = photographer.portrait;
  }
  createUserProfil() {
    const photographeCard = `
        <div id="profil">
            <h1 id="name">${this.name}</h1>
            <p id="city">${this.city}, ${this.country}</p>
            <p>${this.tagline}</p>
        </div>
        <div id="btnContactProfil">
            <button class="contact-button open-form" tabindex="0" >Contactez-moi</button>
        </div>
        <div id="imgProfil">
            <img src="assets/photographers/${this.portrait}" alt="photo de profil, ${this.alt}">
        </div>`;

    return photographeCard;
  }
}
