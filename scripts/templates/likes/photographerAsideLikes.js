export class AsideLikes {
  constructor(medias, photographerProfil) {
    this.medias = medias;
    this.photographerProfil = photographerProfil;
  }
  createAsideLikes() {
    const aside = document.createElement("aside");
    let likes = 0;
    this.medias.forEach((media) => {
      likes = likes + parseFloat(media.likes);
    });

    const contentAside = `        
            <div id="globalCountLikes">
                <span class="globalLikes">${likes} <i class="fas fa-heart"></i>
                </span>
                <div class="countLikes">
                    <span>${this.photographerProfil.price}€ / jour</span>                
                </div>
            </div>`;
    aside.innerHTML = contentAside;
    return aside;
  }
}
