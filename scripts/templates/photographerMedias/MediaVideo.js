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
            <div>
                <span class="titles">${this.title}</span>
                <span class="likes">${this.likes}</span>
                <span class="spanIcon" aria-label="likes" tabIndex="0" role="button">
                    <input type="checkbox" id="${this.id}" name="like" aria-label="liké">
                    <label for="${this.id}"><i class="fas fa-heart"></i></label>
                </span>
            </div>`;
    return article;
  }
}
