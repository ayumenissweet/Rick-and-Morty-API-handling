"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleForm();
    });
}
function handleForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const myAwesomeChar = yield fetchData("https://rickandmortyapi.com/api/character/1");
        console.log(myAwesomeChar);
    });
}
function fetchData(information) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(information);
        if (!response.ok) {
            console.log(`ERROR! error status : ${response.status}`);
        }
        const data = yield response.json();
        return data;
    });
}
