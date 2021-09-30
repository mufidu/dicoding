const fs = require("fs");

const comp = "./css/style.comp.css";
const post = "./css/style.post.css";
const prefix = "./css/style.prefix.css";
const sass = "./css/style.sass.css";

try {
    fs.unlinkSync(comp);
    fs.unlinkSync(post);
    fs.unlinkSync(prefix);
    fs.unlinkSync(sass);
    //file removed
} catch (err) {
    console.error(err);
}

// let books = [];

// const listsudahselesai = document.getElementById("listsudahselesai");
// const listbelumselesai = document.getElementById("listbelumselesai");

// const tombolhapus = document.getElementsByClassName("hapus");
// const tombolbelumselesai = document.getElementsByClassName("belumselesai");
// const tombolselesai = document.getElementsByClassName("selesai");

// function bukubaru(inputjudul, inputpenulis, inputtahun, cekdibaca) {
//     const buku = document.createElement("article");
//     buku.classList.add("buku");

//     const judul = document.createElement("h3");
//     judul.innerHTML = inputjudul.value;

//     const penulis = document.createElement("p");
//     penulis.classList.add("penulis");
//     penulis.innerHTML = "Penulis: " + inputpenulis.value;

//     const tahun = document.createElement("p");
//     tahun.classList.add("tahun");
//     tahun.innerHTML = "Tahun: " + inputtahun.value;

//     if (cekdibaca.checked == true) {
//         bukubaru.append(btnbelumselesai(), btnhapus());
//     } else {
//         bukubaru.append(btnselesai(), btnhapus());
//     }

//     buku.append(judul, penulis, tahun);

//     return buku;
// }

// function tambahbuku() {
//     const inputjudul = document.getElementById("inputjudul");
//     const inputpenulis = document.getElementById("inputpenulis");
//     const inputtahun = document.getElementById("inputtahun");
//     const cekdibaca = document.getElementById("inputdibaca");

//     const buku = bukubaru(inputjudul, inputpenulis, inputtahun, cekdibaca);

//     console.log(buku);
// }

// document.addEventListener("DOMContentLoaded", function () {
//     const forminput = document.querySelector("#inputbuku");

//     forminput.addEventListener("submit", function (event) {
//         event.preventDefault();
//         tambahbuku();
//     });
// });

// function savebuku() {
//     const data = JSON.stringify(books);
//     localStorage.setItem("books", data);
// }

// for (tombol of tombolhapus) {
//     tombol.addEventListener("click", function (ev) {
//         ev.target.parentNode.remove();
//     });
// }

// for (tombol of tombolbelumselesai) {
//     tombol.addEventListener("click", function (ev) {
//         ev.target.classList.remove("belumselesai");
//         ev.target.classList.add("selesai");
//         ev.target.innerHTML = "Selesai dibaca <span>&check;</span>";
//         const bukubelumselesai = ev.target.parentNode;
//         ev.target.parentNode.remove();
//         listbelumselesai.append(bukubelumselesai);
//     });
// }

// for (tombol of tombolselesai) {
//     tombol.addEventListener("click", function (ev) {
//         ev.target.classList.remove("selesai");
//         ev.target.classList.add("belumselesai");
//         ev.target.innerHTML = "Belum selesai dibaca <span>&xotime;</span>";
//         const bukuselesai = ev.target.parentNode;
//         ev.target.parentNode.remove();
//         listsudahselesai.append(bukuselesai);
//     });
// }
