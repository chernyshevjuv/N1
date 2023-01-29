let main = document.querySelector("main");

const api = new Api1("chernyshevjuv"); // мое уникальное имя!! Использовать свое!
//let api = new Api1("chernyshevjuv213"); // мое уникальное имя!! Использовать свое!
// cats.forEach(function (cat) {
//     //let card = `<div class="card" style="background-image: url(${cat.img_link})">
//     let card = `<div class="${cat.favourite ? "card like" : "card"}" style="background-image: url(${cat.img_link})">
// <span>${cat.name}</span>
// </div>`;

//     main.innerHTML += card;
// });


// let cards = document.getElementsByClassName("card");
// for (let i = 0, cnt = cards.length; i < cnt; i++) {
//     const width = cards[i].offsetWidth;
//     cards[i].style.height = width * 0.6 + "px";
// }

const updCards = function (data) {
    main.innerHTML = "";


    cats.forEach(function (cat) {
        let card = `<div class="${cat.favourite ? "card like" : "card"}" style="background-image: url(${cat.img_link})">
        <span>${cat.name}</span>
        </div>`;

        main.innerHTML += card;
    });


    data.forEach(function (cat) {
        if (cat.id) {
            let card = `<div class="${cat.favourite ? "card like" : "card"}" style="background-image:url(${cat.img_link || "images/cat.jpg"})">
    <span>${cat.name}</span>
    </div>`;
            main.innerHTML += card;
        }
    });

    let cards = document.getElementsByClassName("card");
    for (let i = 0, cnt = cards.length; i < cnt; i++) {
        const width = cards[i].offsetWidth;
        cards[i].style.height = width * 0.6 + "px";
    }
}


let addBtn = document.querySelector("#add");
let popupForm = document.querySelector("#popup-form");
let closePopupForm = popupForm.querySelector(".popup-close");
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!popupForm.classList.contains("active")) {
        popupForm.classList.add("active");
        popupForm.parentElement.classList.add("active");
    }
});
closePopupForm.addEventListener("click", () => {
    popupForm.classList.remove("active");
    popupForm.parentElement.classList.remove("active");
})


let form = document.forms[0];
form.img_link.addEventListener("change", (e) => {
    form.firstElementChild.style.backgroundImage = `url(${e.target.value})`
})
form.img_link.addEventListener("input", (e) => {

    form.firstElementChild.style.backgroundImage = `url(${e.target.value})`
})
form.addEventListener("submit", e => {
    e.preventDefault();
    let body = {};
    for (let i = 0; i < form.elements.length; i++) {
        let inp = form.elements[i];
        if (inp.type === "checkbox") {
            body[inp.name] = inp.checked;
        } else if (inp.name && inp.value) {
            if (inp.type === "number") {
                body[inp.name] = +inp.value;
            } else {
                body[inp.name] = inp.value;
            }
        }
    }
    console.log(body);
    // api.addCat(body)
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.message === "ok") {
    //             form.reset();
    //             closePopupForm.click();
    //         } else {
    //             console.log(data);
    //         }
    //     })

    api
        .addCat(body)
        .then(res => res.json())
        .then(data => {
            if (data.message === "ok") {
                form.reset();
                closePopupForm.click();
                api.getCat(body.id)
                    .then(res => res.json())
                    .then(cat => {
                        if (cat.message === "ok") {
                            catsData.push(cat.data);
                            localStorage.setItem("cats", JSON.stringify(catsData));

                            getCats(api, catsData);
                        } else {
                            console.log(cat);
                        }
                    })
            } else {
                console.log(data);
                api.getIds().then(r => r.json()).then(d => console.log(d));
            }
        })
})



// const getCats = function (api) {
//     api.getCats()
//         .then(res => res.json())
//         .then(data => {
//             if (data.message === "ok") {
//                 updCards(data.data);
//             }
//         })
// }
// getCats(api);



//let catsData = localStorage.getItem("cats");
//catsData = catsData ? JSON.parse(catsData) : [];






// catsData = [];

// const getCats = function (api) {
//     api.getCats()
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             if (data.message === "ok") {
//                 localStorage.setItem("cats", JSON.stringify(data.data));
//                 catsData = [...data.data];
//                 updCards(data.data);
//             }
//         })
// }
// getCats(api);












// let catsData = localStorage.getItem("cats");
// catsData = catsData ? JSON.parse(catsData) : [];
// const getCats = function (api, store) {
//     if (!store.length) {
//         api.getCats()
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//                 if (data.message === "ok") {
//                     localStorage.setItem("cats", JSON.stringify(data.data));
//                     catsData = [...data.data];
//                     updCards(data.data);
//                 }
//             })
//     } else {
//         updCards(store);
//     }
// }
// getCats(api, catsData);




// let catsData = localStorage.getItem("cats");
// catsData = catsData ? JSON.parse(catsData) : [];


let catsData = [];

const getCats = function (api, store) {
    if (!store.length) {
        api.getCats()
            .then(res => res.json())
            .then(data => {
                console.log(cats);
                console.log(data);
                if (data.message === "ok") {
                    localStorage.setItem("cats", JSON.stringify(data.data));
                    catsData = [...data.data];
                    updCards(data.data);
                }
            })
    } else {
        updCards(store);
    }
}
getCats(api, catsData);



