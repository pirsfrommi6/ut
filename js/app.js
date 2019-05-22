import Header from './header';
import Footer from './footer';
import Main from './main';

export default class App {
  constructor() {
    this.selectedObject = undefined;
    this.countOfButton = 3;
    this.paginationID = undefined;
    this.mainClips = undefined;
    this.clipContainerWight = 320;
    this.headerButtonID = undefined;
    this.headerInputID = undefined;
    this.isPaginationRender = false;
    this.sliderPageSize = undefined;
    this.firstPaginationButton = undefined;
    this.lastPaginationButtin = undefined;
    this.countOfClips = 16;
  }

  init() {
    Header.render();
    Main.renderMain();
    this.mainClips = document.getElementById('mainID');
    this.headerButtonID = document.getElementById('headerButton');
    this.headerInputID = document.getElementById('headerInput');
    this.headerButtonID.onclick = () => this.searchButtonOnclick();
  }

  searchButtonOnclick() {
    App.removeChildren(this.mainClips);
    App.render(this.headerInputID.value);
    this.mainClips.classList.remove('clip-novisibile');
    if (!this.isPaginationRender) {
      this.paginationRender();
      this.isPaginationRender = true;
    }
    this.newPage();
  }

  getPageSize() {
    if (document.body.clientWidth < 720) {
      this.sliderPageSize = 1;
    }
    if (document.body.clientWidth > 720 && document.body.clientWidth < 1130) {
      this.sliderPageSize = 2;
    }
    if (document.body.clientWidth > 1130 && document.body.clientWidth < 1430) {
      this.sliderPageSize = 3;
    }
    if (document.body.clientWidth > 1430) {
      this.sliderPageSize = 4;
    }
    return this.sliderPageSize;
  }

  getNewClips() {
    if (this.countOfClips < 6) {
      App.render(this.headerInputID.value);
    }
  }

  static async getData(value) {
    const apiKEY = 'AIzaSyDG2fDZg8MuyWRrE4j-Oon7bX8Yh_vnN3o';
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKEY}&type=video&part=snippet&maxResults=16&q=${value}`);
    const json = await response.json();
    return json;
  }

  static removeChildren(element) {
    while (element.lastChild) {
      element.removeChild(element.lastChild);
    }
  }

  static async render(query) {
    const responseFromYoutube = await App.getData(query);
    responseFromYoutube.items.forEach((item) => {
      Main.renderItem(item.snippet.channelTitle, item.snippet.publishedAt, item.snippet.description, item.snippet.title, item.snippet.thumbnails.medium.url, `http://youtube.com/watch?v=${item.id}`);
    });
  }

  paginationInit() {
    this.paginationID = document.getElementById('pagination');
    this.paginationItem = document.getElementsByClassName('pagination-item');
    this.paginationID.onclick = (event) => { this.paginationOnClick(event); };
    [this.selectedObject] = this.paginationItem;
    this.selectedObject.classList.add('pagination-item-active');
  }

  paginationButtonInit() {
    this.firstPaginationButton = this.paginationItem[0].innerHTML;
    this.lastPaginationButtin = this.paginationItem[3].innerHTML;
  }

  paginationRender() {
    Footer.render();
    this.paginationInit();
  }

  paginationOnClick(event) {
    let { target } = event;
    this.paginationButtonInit();
    this.getNewClips();
    if (target.innerHTML === this.lastPaginationButtin) {
      this.nextPage(this.countOfButton);
      this.paginationFirstLastButtonOnClick(target, 0);
      return;
    }
    if (target.innerHTML === this.firstPaginationButton && this.firstPaginationButton > 3) {
      this.nextPage((-1) * (this.countOfButton));
      this.paginationFirstLastButtonOnClick(target, 3);
      return;
    }
    while (target !== this) {
      if (target.className === 'pagination-item') {
        this.paginationButtonOnСlick(target, this.getPageSize());
        return;
      }
      target = target.parentNode;
    }
  }

  paginationFirstLastButtonOnClick(node, length) {
    this.paginationButtonOnСlick(node, this.getPageSize());
    node.classList.remove('pagination-item-active');
    this.paginationItem[length].classList.add('pagination-item-active');
    this.selectedObject = this.paginationItem[length];
    this.countOfClips = this.countOfClips + this.getPageSize();
  }

  paginationButtonOnСlick(node, size, innerHTML) {
    let difference = node.innerHTML - this.selectedObject.innerHTML;
    this.countOfClips = this.countOfClips - difference * size;
    if (innerHTML) {
      difference = innerHTML;
    }
    if (this.selectedObject) {
      this.selectedObject.classList.remove('pagination-item-active');
      let offset = difference * this.clipContainerWight;
      offset = this.mainClips.scrollLeft + offset * size;
      offset = Math.trunc(offset / this.clipContainerWight);
      this.mainClips.scrollLeft = offset * this.clipContainerWight;
    }
    this.selectedObject = node;
    node.classList.add('pagination-item-active');
  }

  nextPage(count) {
    let counter = 0;
    while (counter <= this.countOfButton) {
      const newInnerHTML = Number(this.paginationItem[counter].innerHTML) + count;
      this.paginationItem[counter].innerHTML = newInnerHTML;
      counter += 1;
    }
  }

  newPage() {
    let counter = 0;
    while (counter <= this.countOfButton) {
      this.paginationItem[counter].innerHTML = counter + 1;
      counter += 1;
    }
  }
}
