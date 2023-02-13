/**
 * Przechowuje przedmioty w bibliotece
 * @type {Media[]}
 */
const libraryStore = [];

/**
 * Zamienia pierwszą literę na wielką
 * @returns {string}
 */
String.prototype.capitalize = function () {
    return this.length === 0 ? '' : this[0].toUpperCase() + this.slice(1);
}

/**
 * Zamienia pierwszą literę na wielką
 * @param s{string}
 * @returns {string}
 */
function capitalize(s) {
    return s.length === 0 ? '' : s[0].toUpperCase() + s.slice(1);
}

/**
 * Zamienia pierwsze litery wyrazów na wielkie
 * @param s{string}
 * @returns {string}
 */
function capitalizeSentence(s) {
    return s.split(' ').map((s) => capitalize(s)).join(' ');
}


class Media {
    constructor(props) {
        if (!props) {
            throw "Missing title";
        }
        if (typeof props["title"] !== "string") {
            throw "Title must be a string";
        }
        this._title = capitalizeSentence(props.title);
        this._ratings = [];
        this._available = true;
    }

    get title() {
        return this._title;
    }

    get ratings() {
        return this._ratings;
    }

    get available() {
        return this._available;
    }

    /**
     * Dodaje ocene
     * @param num{!number}
     */
    addRating(num) {
        if (typeof num !== "number" || num <= 0) {
            throw "Rating should be a number from 1 to 10";
        }
        this._ratings.push(num);
    }

    /**
     * Zamawia wybrany przedmiot
     * @returns {Promise}
     */
    orderMedia() {
        return new Promise((resolve, reject) => {
            if (this.available) {
                setTimeout(() => {
                    this._available = false;
                    resolve();
                }, 1000)
                return;
            }

            reject("Not available")
        })
    }

    /**
     * Zwraca wybrany przedmiot
     * @returns {Promise}
     */
    returnMedia() {
        return new Promise((resolve, reject) => {
            if (!this.available) {
                setTimeout(() => {
                    this._available = true;
                    resolve();
                }, 1000)
                return;
            }

            reject("Already returned")
        })
    }
}


class Book extends Media {
    constructor({title, author, pages}) {
        if (!author || !pages) {
            throw "Missing argument(s)";
        }
        if (typeof author !== "string") {
            throw "Author must be a string";
        }
        if (typeof pages !== "number" || pages <= 0) {
            throw "Invalid pages argument";
        }
        super({title});

        this._author = capitalizeSentence(author);

        this._pages = pages;
    }

    get author() {
        return this._author;
    }

    get pages() {
        return this._pages;
    }

    orderBook() {
        return this.orderMedia();
    }

    returnBook() {
        return this.returnMedia();
    }
}


class Movie extends Media {
    constructor({title, director, length}) {
        if (!director || !length) {
            throw "Missing argument(s)";
        }
        if (typeof director !== "string") {
            throw "Director must be a string";
        }
        if (typeof length !== "number" || length <= 0) {
            throw "Invalid length argument";
        }
        super({title});
        this._director = capitalizeSentence(director);
        this._length = length;
    }

    get director() {
        return this._director;
    }

    get length() {
        return this._length;
    }

    orderMovie() {
        return this.orderMedia();
    }

    returnMovie() {
        return this.returnMedia();
    }
}

/**
 * Dodaje przedmiot do biblioteki
 * @param props{{}}
 * @returns {Media}
 */
const addToLibrary = (props) => {
    try {
        switch (props.type) {
            case "book": {
                const media = new Book(props);
                libraryStore.push(media);
                return media;
            }
            case "movie": {
                const media = new Movie(props);
                libraryStore.push(media);
                return media;
            }
            default: {
                const media = new Media(props);
                libraryStore.push(media);
                return media;
            }
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * Dodaje wiele przedmiotów do biblioteki
 * @param items{{}[]}
 * @returns {Media[]}
 */
function bulkAddToLibrary(items) {
    return items.map((item) => addToLibrary(item));
}

/**
 * Zamawia podany tytuł
 * @param title{string}
 * @returns {Promise<void>}
 */
async function order(title) {
    try {
        await libraryStore.filter(item => item.title === title)[0].orderMedia();
        console.log("Order completed!");
    } catch (e) {
        console.log("Sorry! " + e);
    }
}

/**
 * Zamawia podane tytuły
 * @param medias{String[]}
 * @returns {Promise<void>}
 */
async function bulkOrder(medias) {
    let promises = medias.map((m) => order(m));
    await Promise.all(promises);
}

