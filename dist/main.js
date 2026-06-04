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
//just preparations.. these don't exist yet except the first one
const characterSearchID = document.querySelector(".id-search1");
const locationSearchID = document.querySelector(".id-search2");
const episodeSearchID = document.querySelector(".id-search3");
//id search selectors
const idInput1 = document.querySelector("#id-input1");
const idInput2 = document.querySelector("#id-input2");
const idInput3 = document.querySelector("#id-input3");
characterSearchID === null || characterSearchID === void 0 ? void 0 : characterSearchID.addEventListener("click", (e) => {
    if (!idInput1)
        return;
    handleClick("character", idInput1);
});
function handleClick(type, idInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const x = idInput.value.split(",").map(Number).filter(Boolean);
        const uniqueX = [...new Set(x)];
        const output = //based on the type return the correct API link
         `https://rickandmortyapi.com/api/${type}/` + JSON.stringify(uniqueX);
        const object = yield fetchData(output);
        console.log(object);
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
