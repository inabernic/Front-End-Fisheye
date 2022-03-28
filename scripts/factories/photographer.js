import { MediaVideo } from "../templates/photographerMedias/MediaVideo.js";
import { MediaImg } from "../templates/photographerMedias/MediaImg.js";

//recover the media files
export class MediasFactory {
  constructor(media, photographeName) {
    if (media.image == undefined) {
      return new MediaVideo(media, photographeName);
    } else {
      return new MediaImg(media, photographeName);
    }
  }
}
