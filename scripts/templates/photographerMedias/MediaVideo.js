export class MediaVideo {
  constructor(media, photographeName) {
    this.photographeName = photographeName;
    this.title = media.title;
    this.alt = media.alt;
    this.likes = media.likes;
    this.video = media.video;
    this.id = media.id;
  }
  buildMediaCard() {
    const videoLink = `assets/images/${this.photographeName}/${this.video}`;

    const article = document.createElement("article");
    article.classList = "mediaBox";
    article.innerHTML = `
            <video src="${videoLink}" aria-label="${this.alt}, vue rapprochée" role="link" tabIndex="0"></video>
            <div class="infoMediaBox">
                <span class="titles">${this.title}</span>
                <div>
                <span class="likes">${this.likes}</span>
                <span class="spanIcon" role="checkbox" aria-checked="true" aria-label="likes" tabIndex="0" >
                    <input type="checkbox" id="${this.id}" name="like" aria-label="liké">
                    <label for="${this.id}"><i class="fas fa-heart"></i></label>
                </span>
                </div>
            </div>`;
    return article;
  }
}
