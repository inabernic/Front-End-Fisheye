export class PhotographerCard {
  constructor(photographer) {
    this.name = photographer.name;
    this.alt = photographer.alt;
    this.id = photographer.id;
    this.city = photographer.city;
    this.country = photographer.country;
    this.tagline = photographer.tagline;
    this.price = photographer.price;
    this.portrait = photographer.portrait;
  }
  createPhotographerCard() {
    const article = document.createElement("article");
    const contentCard = `
    <div>
            <a href="photographer.html?photographer=${this.id}" aria-label="redirige vers la page du photographe">
                <img src="assets/photographers/${this.portrait}" alt="photo de profil, ${this.alt}">
                <h2>${this.name}</h2>
            </a>
            <p id="city">${this.city}, ${this.country}</p>
            <p id="tagline">${this.tagline}</p>
            <p id="price">${this.price}€/jour</p>
    </div>;`;

    article.innerHTML = contentCard;
    return article;
  }
}
