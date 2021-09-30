let books = [];
document.addEventListener("DOMContentLoaded", () => {
    const formInput = document.getElementById("inputbuku");
    const formCari = document.getElementById("caribuku");
    formInput.addEventListener("submit", (e) => {
        e.preventDefault();
        tambahBuku();
        formInput.reset();
    });

    formCari.addEventListener("submit", (e) => {
        e.preventDefault();
        cariBuku();
    });

    if (isStorageExist()) {
        loadData();
    }
});

document.addEventListener("ondataloaded", () => {
    refreshData();
});

function buatBuku(judul, penulis, tahun, dibaca) {
    const article = document.createElement("article");
    article.classList.add("buku");

    const h3 = document.createElement("h3");
    h3.innerHTML = judul;

    const p1 = document.createElement("p");
    p1.innerHTML = "Penulis: " + penulis;
    p1.classList.add("penulis");

    const p2 = document.createElement("p");
    p2.innerHTML = "Tahun: " + tahun;
    p2.classList.add("tahun");

    article.append(h3, p1, p2);

    if (dibaca) {
        article.append(btnBelumSelesai(), btnHapus());
    } else {
        article.append(btnSelesai(), btnHapus());
    }

    return article;
}

function buatObjekBuku(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
    };
}

function tambahBuku() {
    const listBelumSelesai = document.getElementById("listbelumselesai");
    const listSudahSelesai = document.getElementById("listsudahselesai");

    const inputJudul = document.getElementById("inputjudul").value;
    const inputPenulis = document.getElementById("inputpenulis").value;
    const inputTahun = document.getElementById("inputtahun").value;
    const inputDibaca = document.getElementById("inputdibaca").checked;

    const bukuBaru = buatBuku(
        inputJudul,
        inputPenulis,
        inputTahun,
        inputDibaca
    );

    const objekBukuBaru = buatObjekBuku(
        inputJudul,
        inputPenulis,
        inputTahun,
        inputDibaca
    );

    bukuBaru["id"] = objekBukuBaru.id;

    if (inputDibaca) {
        listSudahSelesai.append(bukuBaru);
    } else {
        listBelumSelesai.append(bukuBaru);
    }

    books.push(objekBukuBaru);
    updateDataToStorage();
}

function buatTombol(buttonClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonClass);
    button.addEventListener("click", function (e) {
        eventListener(e);
    });

    if (buttonClass == "selesai") {
        button.innerHTML = "Selesai dibaca <span>&check;</span>";
    } else if (buttonClass == "hapus") {
        button.innerHTML = "Hapus buku <span>&xotime;</span>";
    } else if (buttonClass == "belumselesai") {
        button.innerHTML = "Belum selesai dibaca <span>X</span>";
    }

    return button;
}

function bukuSelesai(buku) {
    const listSudahSelesai = document.getElementById("listsudahselesai");
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    article.classList.add("buku");
    h3.innerHTML = buku.querySelector("h3").innerHTML;
    p1.innerHTML = buku.querySelector(".penulis").innerHTML;
    p1.classList.add("penulis");
    p2.innerHTML = buku.querySelector(".tahun").innerHTML;
    p2.classList.add("tahun");

    article.append(h3, p1, p2, btnBelumSelesai(), btnHapus());

    listSudahSelesai.append(article);

    const bukunya = findBook(buku["id"]);
    bukunya.isComplete = true;
    article["id"] = bukunya.id;

    buku.remove();
    updateDataToStorage();
}

function btnSelesai() {
    return buatTombol("selesai", function (e) {
        bukuSelesai(e.target.parentElement);
    });
}

function bukuBelumSelesai(buku) {
    const listBelumSelesai = document.getElementById("listbelumselesai");
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    article.classList.add("buku");
    h3.innerHTML = buku.querySelector("h3").innerHTML;
    p1.innerHTML = buku.querySelector(".penulis").innerHTML;
    p1.classList.add("penulis");
    p2.innerHTML = buku.querySelector(".tahun").innerHTML;
    p2.classList.add("tahun");

    article.append(h3, p1, p2, btnSelesai(), btnHapus());

    listBelumSelesai.append(article);

    const bukunya = findBook(buku["id"]);
    bukunya.isComplete = false;
    article["id"] = bukunya.id;

    buku.remove();
    updateDataToStorage();
}

function btnBelumSelesai() {
    return buatTombol("belumselesai", function (e) {
        bukuBelumSelesai(e.target.parentElement);
    });
}

function bukuHapus(buku) {
    const konfirmasi = confirm("Hapus buku?");
    if (konfirmasi) {
        const indexBuku = findBookIndex(buku["id"]);
        books.splice(indexBuku, 1);

        buku.remove();
        updateDataToStorage();
    }
}

function btnHapus() {
    return buatTombol("hapus", function (e) {
        bukuHapus(e.target.parentElement);
    });
}

function findBook(id) {
    for (book of books) {
        if (book.id == id) {
            return book;
        }
    }
    return null;
}

function findBookIndex(id) {
    let index = 0;
    for (book of books) {
        if (book.id == id) {
            return index;
        }
        index++;
    }
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem("books", parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function isStorageExist() /* boolean */ {
    if (typeof Storage === undefined) {
        alert(
            "Browser Anda tidak mendukung local storage. Silahkan upgrade browser Anda."
        );
        return false;
    }
    return true;
}

function updateDataToStorage() {
    if (isStorageExist()) saveData();
}

function loadData() {
    const localData = localStorage.getItem("books");
    const data = JSON.parse(localData);

    if (data != null) {
        books = data;
    }

    const listBelumSelesai = document.getElementById("listbelumselesai");
    const listSudahSelesai = document.getElementById("listsudahselesai");

    for (book of books) {
        const buku = buatBuku(
            book.title,
            book.author,
            book.year,
            book.isComplete
        );
        buku["id"] = book.id;

        if (!book.isComplete) {
            listBelumSelesai.append(buku);
        } else {
            listSudahSelesai.append(buku);
        }
    }
}

function cariBuku() {
    const cariJudul = document.getElementById("carijudul").value;
    cariJudul.toString();

    const tidakDicari = [];

    for (book of books) {
        book.title.toString();
        if (!book.title.includes(cariJudul)) {
            tidakDicari.push(book.id);
        }
    }

    const semuaBuku = document.querySelectorAll(".buku");
    for (buku of semuaBuku) {
        buku.style.display = "block";
    }

    for (buku of semuaBuku) {
        for (id of tidakDicari) {
            if (buku["id"] == id) {
                buku.style.display = "none";
            }
        }
    }
}
