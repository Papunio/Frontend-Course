// Zadanko z kopiowaniem obiektow

function cloneDeep(obj) {
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    let clone = {};
    for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            clone[key] = cloneDeep(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }
    return clone;
}

const user = {
    name: "Alice",
    surname: null,
    dates: {
        birthDate: new Date(1995, 10, 28)
    },
    contact: {
        phone: '111-111-111',
        address: {
            city: "London",
        }
    }
};

const userCp = cloneDeep(user);

user.name = "John";
user.surname = "White";
user.dates.birthDate = new Date(1999, 11, 11);
user.contact.phone = '222-222-222';
user.contact.address.city = 'New York'

console.log(user);
console.log(userCp);