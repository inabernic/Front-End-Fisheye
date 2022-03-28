import { LightboxImg } from "../templates/lightbox/LightboxImg.js";
import { LightboxVideo } from "../templates/lightbox/LightboxVideo.js";

export class LightboxFactory {
  constructor(extension, mediaLink, title) {
    switch (extension) {
      case "jpg":
        return new LightboxImg(mediaLink, title);
      case "mp4":
        return new LightboxVideo(mediaLink, title);
    }
  }
}
