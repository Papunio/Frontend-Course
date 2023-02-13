let productList = [];

/**
 * Reprezentuje towar
 * @param id {int} - Unikalny identyfikator produktu
 * @param name {string} - Nazwa towaru
 * @param quantity {string} - Liczba sztuk
 * @param date {string} - Data, w której produkt powinien być zakupiony
 * @param status {'zakupiony'|'niezakupiony'} - Status produktu
 * @param price {string} - Cena za sztukę
 * @constructor
 */
function Item(id, name, quantity, date, status, price) {
    this.id = id;
    this.name = name;
    this.quantity = +quantity;
    this.date = new Date(date);
    this.status = status;
    this.price = +price;
}

/**
 * Dodaje produkt do listy produktów
 * @param name {string} - Nazwa produktu
 * @param quantity {string} - Liczba sztuk
 * @param date {string} - Data, w której produkt powinien być zakupiony
 * @param status {'zakupiony'|'niezakupiony'} - Zakupiony / Niezakupiony
 * @param price {string} - Cena za sztukę
 * @returns {number} - Unikalne ID produktu
 */
function addProduct(name, quantity, date, status, price) {
    const productID = Math.floor(Math.random() * 1e11); // Zakładamy w zadaniu że ta wartość jest unikalna
    productList.push(new Item(productID, name, quantity, date, status, price));
    return productID;
}

/**
 * Usuwa produkt o podanym ID
 * @param id {int} - ID produktu do usunięcia
 */
function removeProduct(id) {
    const productIndex = productList.findIndex(elem => elem.id === id);
    productList.splice(productIndex, 1);
}

/**
 * Edytuje wybraną własność produktu
 * @param id {int} - ID produktu, którego własność chcemy zmienić
 * @param mode {string} - Ktorą własność chcemy zmienić ("name", "status", "quantity", "date")
 * @param newData {string} - Nowa wartość
 */
function editProduct(id, mode, newData) {
    const productIndex = productList.findIndex(elem => elem.id === id);
    switch (mode) {
        case "name":
            productList[productIndex]["name"] = newData;
            break;
        case "status":
            productList[productIndex]["status"] = newData;
            break;
        case "quantity":
            productList[productIndex]["quantity"] = +newData;
            break;
        case "date":
            productList[productIndex]["date"] = new Date(newData);
            break;
        default:
            console.log("Invalid mode");
    }
}

/**
 * Zmiana kolejności produktu
 * @param dir {string} - Kierunek przesunięcia na liście ("up", "down")
 * @param id {int} - ID produktu, który chcemy przesunąć
 */
function changeOrder(dir, id) {
    const productIndex = productList.findIndex(elem => elem.id === id);
    if ((dir === "up" && productIndex === 0) || (dir === "down" && productIndex === productList.at(-1))) {
        return;
    }
    if (dir === "up") {
        [productList[productIndex - 1], productList[productIndex]] = [productList[productIndex], productList[productIndex - 1]];
    } else if (dir === "down") {
        [productList[productIndex + 1], productList[productIndex]] = [productList[productIndex], productList[productIndex + 1]];
    }
}

/**
 * Filtrowanie produktów przy pomocy daty i statusu
 * @param today {Date} - Data, którą filtrujemy produkty
 * @param status {'zakupiony'|'niezakupiony'} - Status produktu ("zakupiony", "niezakupiony")
 * @returns {*[]} - Odfiltrowana lista
 */
function buyAtDay(today = new Date(), status = "niezakupiony") {
    return productList.filter(elem =>
        (elem.date.toDateString() === today.toDateString() && elem.status === status))
}

/**
 * Zwraca łączną kwotę wydaną na produkty danego dnia
 * @param date {string} - Dzień, który nas interesuje
 * @returns {number} - Łączna kwota
 */
function spentAt(date) {
    let sum = 0;
    buyAtDay(new Date(date), "zakupiony").forEach(elem => {
        if (elem.price !== undefined)
            sum += (elem.price * elem.quantity);
    });
    return sum;
}

/**
 * Ustawia cene dla produktu, jeżeli produkt został zakupiony
 * @param id {id} - ID produktu
 * @param price {int} - Cena, którą chcemy ustawić
 */
function setPrice(id, price) {
    const productIndex = productList.findIndex(elem => elem.id === id);
    if (productList[productIndex].status === "zakupiony") {
        productList[productIndex].price = price;
    }
}

/**
 * Mapowanie po podanych przedmiotach, przy użyciu podanej funkcji
 * @param ids {int[]} - Lista ID przedmiotów
 * @param fn {function} - Funkcja, którą chcemy wywołać na danych IDkach
 * @returns {unknown[]} - Zmodyfikowana lista przedmiotów
 */
function massFormat(ids, fn) {
    let filtered = productList.filter(elem => ids.includes(elem.id));
    return filtered.map((value) => fn(value));
}

/**
 * Konwertuje polskie złotówki na katarskie Riyale
 * @param item - Przedmiot
 */
function plnToRiyal(item) {
    item.price = (item.price * 0.83).toFixed(2);
}

let item1 = addProduct("Ser", "3", "2021-01-20", "zakupiony", "10");
let item2 = addProduct("Wiertarka", "2", "2022-11-21", "niezakupiony", "150");
// console.log(productList);
// removeProduct(item2);
// console.log(productList);
// editProduct(item1, "quantity", 99);
// console.log(productList);
// changeOrder("up", item2);
// console.log(productList);
// changeOrder("down", item2);
// console.log(productList);
// console.log(buyAtDay());
// console.log(spentAt("2021-01-20"));
//
// console.log(productList);
// massFormat([item2, item1], plnToRiyal);
// console.log(productList);

