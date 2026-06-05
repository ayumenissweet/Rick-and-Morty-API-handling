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
//query buttons
const charQuery = document.querySelector(".char-query");
//id search selectors
const idInput1 = document.querySelector("#id-input1");
const idInput2 = document.querySelector("#id-input2");
const idInput3 = document.querySelector("#id-input3");
//character query selectors
const charName = document.querySelector(".char-name");
const charStatus = document.querySelector(".char-status");
const charGender = document.querySelector(".char-gender");
const charSpecies = document.querySelector(".char-species");
characterSearchID === null || characterSearchID === void 0 ? void 0 : characterSearchID.addEventListener("click", (e) => {
    if (!idInput1)
        return;
    handleIDClick("character", idInput1);
});
charQuery === null || charQuery === void 0 ? void 0 : charQuery.addEventListener("click", (e) => {
    if (!charName || !charStatus || !charGender || !charSpecies)
        return;
    handleQueryClick("queryChar", {
        name: charName,
        status: charStatus,
        gender: charGender,
        species: charSpecies,
    });
});
function handleIDClick(type, idInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const x = idInput.value.split(",").map(Number).filter(Boolean);
        const uniqueX = [...new Set(x)];
        const output = //based on the type return the correct API link
         `https://rickandmortyapi.com/api/${type}/` + JSON.stringify(uniqueX);
        try {
            const object = yield fetchData(output);
            console.log(object);
        }
        catch (error) {
            if (error instanceof Error) {
                console.warn(`Failed gracefully: ${error.message}`);
            }
            else {
                console.error("An unexpected, non-standard error occurred", error);
            }
        }
    });
}
function handleQueryClick(//query input takes the keys of query input map and then uses them to fetch the correct data type
type, inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        let message;
        if (type == "queryChar") {
            let cleanInputs = inputs;
            message =
                "?" +
                    `name=${cleanInputs.name.value}&status=${cleanInputs.status.value}&gender=${cleanInputs.gender.value}&species=${cleanInputs.species.value}`;
        }
        else if (type == "queryLocation") {
            let cleanInputs = inputs;
            message =
                "?" +
                    `name=${cleanInputs.name.value}&type=${cleanInputs.type.value}&dimension=${cleanInputs.dimension.value}`;
        }
        else {
            let cleanInputs = inputs;
            message =
                "?" +
                    `name=${cleanInputs.name.value}&episode=${cleanInputs.episode.value}`;
        }
        //i HATE this part
        let tag;
        if (type == "queryChar") {
            tag = "character";
        }
        else if (type == "queryLocation") {
            tag = "location";
        }
        else
            tag = "episode";
        const output = `https://rickandmortyapi.com/api/${tag}/` + message;
        try {
            const object = yield fetchData(output);
            console.log(object);
        }
        catch (error) {
            if (error instanceof Error) {
                console.warn(`ERROR! error status : ${error.message}`);
            }
            else {
                console.error("An unknown error occured", error);
            }
        }
    });
}
function fetchData(information) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(information);
        if (!response.ok) {
            throw new Error(`ERROR! Error status : ${response.status}`);
        }
        const data = yield response.json();
        return data;
    });
}
