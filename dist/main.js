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
//select query selectors!
const charTab = document.querySelector(".char-select-btn");
const locationTab = document.querySelector(".location-select-btn");
const episodeTab = document.querySelector(".episode-select-btn");
//id search section selectors
const charIDSection = document.querySelector(".char-id-search");
const locationIDSection = document.querySelector(".location-id-search");
const episodeIDSection = document.querySelector(".episode-id-search");
//sections query selectors
const charSection = document.querySelector(".character-container");
const locationSection = document.querySelector(".location-container");
const episodeSection = document.querySelector(".episode-container");
//id search buttons
const characterSearchID = document.querySelector(".id-search1");
const locationSearchID = document.querySelector(".id-search2");
const episodeSearchID = document.querySelector(".id-search3");
//query buttons
const charQuery = document.querySelector(".char-query");
const locationQuery = document.querySelector(".location-query");
const episodeQuery = document.querySelector(".episode-query");
//id input selectors
const idInput1 = document.querySelector("#id-input1");
const idInput2 = document.querySelector("#id-input2");
const idInput3 = document.querySelector("#id-input3");
//character query selectors
const charName = document.querySelector(".char-name");
const charStatus = document.querySelector(".char-status");
const charGender = document.querySelector(".char-gender");
const charSpecies = document.querySelector(".char-species");
//location query selectors
const locationName = document.querySelector(".location-name");
const locationType = document.querySelector(".location-type");
const locationDimension = document.querySelector(".location-dimension");
//episode query selectors
const episodeName = document.querySelector(".episode-name");
const episodeCode = document.querySelector(".episode-code");
charTab === null || charTab === void 0 ? void 0 : charTab.addEventListener("click", (e) => {
    charTab.classList.add("active");
    locationTab === null || locationTab === void 0 ? void 0 : locationTab.classList.remove("active");
    episodeTab === null || episodeTab === void 0 ? void 0 : episodeTab.classList.remove("active");
    charSection === null || charSection === void 0 ? void 0 : charSection.classList.remove("hidden");
    locationSection === null || locationSection === void 0 ? void 0 : locationSection.classList.add("hidden");
    episodeSection === null || episodeSection === void 0 ? void 0 : episodeSection.classList.add("hidden");
    charQuery === null || charQuery === void 0 ? void 0 : charQuery.classList.remove("hidden");
    locationQuery === null || locationQuery === void 0 ? void 0 : locationQuery.classList.add("hidden");
    episodeQuery === null || episodeQuery === void 0 ? void 0 : episodeQuery.classList.add("hidden");
    charIDSection === null || charIDSection === void 0 ? void 0 : charIDSection.classList.remove("hidden");
    locationIDSection === null || locationIDSection === void 0 ? void 0 : locationIDSection.classList.add("hidden");
    episodeIDSection === null || episodeIDSection === void 0 ? void 0 : episodeIDSection.classList.add("hidden");
});
locationTab === null || locationTab === void 0 ? void 0 : locationTab.addEventListener("click", (e) => {
    locationTab.classList.add("active");
    charTab === null || charTab === void 0 ? void 0 : charTab.classList.remove("active");
    episodeTab === null || episodeTab === void 0 ? void 0 : episodeTab.classList.remove("active");
    locationSection === null || locationSection === void 0 ? void 0 : locationSection.classList.remove("hidden");
    charSection === null || charSection === void 0 ? void 0 : charSection.classList.add("hidden");
    episodeSection === null || episodeSection === void 0 ? void 0 : episodeSection.classList.add("hidden");
    locationQuery === null || locationQuery === void 0 ? void 0 : locationQuery.classList.remove("hidden");
    charQuery === null || charQuery === void 0 ? void 0 : charQuery.classList.add("hidden");
    episodeQuery === null || episodeQuery === void 0 ? void 0 : episodeQuery.classList.add("hidden");
    locationIDSection === null || locationIDSection === void 0 ? void 0 : locationIDSection.classList.remove("hidden");
    charIDSection === null || charIDSection === void 0 ? void 0 : charIDSection.classList.add("hidden");
    episodeIDSection === null || episodeIDSection === void 0 ? void 0 : episodeIDSection.classList.add("hidden");
});
episodeTab === null || episodeTab === void 0 ? void 0 : episodeTab.addEventListener("click", (e) => {
    episodeTab.classList.add("active");
    locationTab === null || locationTab === void 0 ? void 0 : locationTab.classList.remove("active");
    charTab === null || charTab === void 0 ? void 0 : charTab.classList.remove("active");
    episodeSection === null || episodeSection === void 0 ? void 0 : episodeSection.classList.remove("hidden");
    locationSection === null || locationSection === void 0 ? void 0 : locationSection.classList.add("hidden");
    charSection === null || charSection === void 0 ? void 0 : charSection.classList.add("hidden");
    episodeQuery === null || episodeQuery === void 0 ? void 0 : episodeQuery.classList.remove("hidden");
    locationQuery === null || locationQuery === void 0 ? void 0 : locationQuery.classList.add("hidden");
    charQuery === null || charQuery === void 0 ? void 0 : charQuery.classList.add("hidden");
    episodeIDSection === null || episodeIDSection === void 0 ? void 0 : episodeIDSection.classList.remove("hidden");
    locationIDSection === null || locationIDSection === void 0 ? void 0 : locationIDSection.classList.add("hidden");
    charIDSection === null || charIDSection === void 0 ? void 0 : charIDSection.classList.add("hidden");
});
characterSearchID === null || characterSearchID === void 0 ? void 0 : characterSearchID.addEventListener("click", (e) => {
    if (!idInput1)
        return;
    if (idInput1.value == "")
        return;
    handleIDClick("character", idInput1);
});
locationSearchID === null || locationSearchID === void 0 ? void 0 : locationSearchID.addEventListener("click", (e) => {
    if (!idInput2)
        return;
    if (idInput2.value == "")
        return;
    handleIDClick("location", idInput2);
});
episodeSearchID === null || episodeSearchID === void 0 ? void 0 : episodeSearchID.addEventListener("click", (e) => {
    if (!idInput3)
        return;
    if (idInput3.value == "")
        return;
    handleIDClick("episode", idInput3);
});
charQuery === null || charQuery === void 0 ? void 0 : charQuery.addEventListener("click", (e) => {
    if (!charName || !charStatus || !charGender || !charSpecies)
        return;
    if (charName.value == "")
        return; //can't take an empty string
    handleQueryClick("queryChar", {
        name: charName,
        status: charStatus,
        gender: charGender,
        species: charSpecies,
    });
});
locationQuery === null || locationQuery === void 0 ? void 0 : locationQuery.addEventListener("click", (e) => {
    if (!locationName || !locationType || !locationDimension)
        return;
    if (
    //can't take empty strings
    locationName.value == "" &&
        locationType.value == "" &&
        locationDimension.value == "")
        return;
    handleQueryClick("queryLocation", {
        name: locationName,
        type: locationType,
        dimension: locationDimension,
    });
});
episodeQuery === null || episodeQuery === void 0 ? void 0 : episodeQuery.addEventListener("click", (e) => {
    if (!episodeName || !episodeCode)
        return;
    if (episodeCode.value == "" && episodeName.value == "")
        return;
    handleQueryClick("queryEpisode", {
        name: episodeName,
        code: episodeCode,
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
                console.warn(`ERROR! error status : ${error.message}`);
            }
            else {
                console.error("An unknown error occured", error);
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
                "?" + `name=${cleanInputs.name.value}&episode=${cleanInputs.code.value}`;
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
