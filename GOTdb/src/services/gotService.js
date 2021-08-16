export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };
  getAllBooks = async () => {
    const res = await this.getResource(`/books/`);
    return res.map(this._transformBook); //перебрать и изменить все объекты
  };

  getBook = async (id) => {
    const res = await this.getResource(`/books/${id}/`);
    return this._transformBook(res);
  };

  getAllCharacters = async (num) => {
    const res = await this.getResource(`/characters?page=${num}&pageSize=10`);
    return res.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(res);
  };

  getAllHouses = async () => {
    const res = await this.getResource(`/houses/`);
    return res.map(this._transformHouse); //перебрать и изменить все объекты
  };

  getHouse = async (id) => {
    const res = await this.getResource(`/houses/${id}/`);
    return this._transformHouse(res);
  };

  _transformCharacter(char) {
    return {
      name: isThere(char.name),
      gender: isThere(char.gender),
      born: isThere(char.born),
      died: isThere(char.died),
      culture: isThere(char.culture),
    };
  }

  _transformHouse(house) {
    return {
      name: isThere(house.name),
      region: isThere(house.region),
      words: isThere(house.words),
      titles: isThere(house.titles[0]),
      overlord: isThere(house.overlord),
      ancestralWeapons: isThere(house.ancestralWeapons[0]),
    };
  }

  _transformBook(book) {
    return {
      name: isThere(book.name),
      numberOfPages: isThere(book.numberOfPages),
      publisher: isThere(book.publisher),
      released: isThere(book.released),
    };
  }
}
function isThere(prop) {
  if (prop === "") {
    return "Неизвестно";
  } else {
    return prop;
  }
}
