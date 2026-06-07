"use strict";
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
charTab?.addEventListener("click", (e) => {
    charTab.classList.add("active");
    locationTab?.classList.remove("active");
    episodeTab?.classList.remove("active");
    charSection?.classList.remove("hidden");
    locationSection?.classList.add("hidden");
    episodeSection?.classList.add("hidden");
    charQuery?.classList.remove("hidden");
    locationQuery?.classList.add("hidden");
    episodeQuery?.classList.add("hidden");
    charIDSection?.classList.remove("hidden");
    locationIDSection?.classList.add("hidden");
    episodeIDSection?.classList.add("hidden");
});
locationTab?.addEventListener("click", (e) => {
    locationTab.classList.add("active");
    charTab?.classList.remove("active");
    episodeTab?.classList.remove("active");
    locationSection?.classList.remove("hidden");
    charSection?.classList.add("hidden");
    episodeSection?.classList.add("hidden");
    locationQuery?.classList.remove("hidden");
    charQuery?.classList.add("hidden");
    episodeQuery?.classList.add("hidden");
    locationIDSection?.classList.remove("hidden");
    charIDSection?.classList.add("hidden");
    episodeIDSection?.classList.add("hidden");
});
episodeTab?.addEventListener("click", (e) => {
    episodeTab.classList.add("active");
    locationTab?.classList.remove("active");
    charTab?.classList.remove("active");
    episodeSection?.classList.remove("hidden");
    locationSection?.classList.add("hidden");
    charSection?.classList.add("hidden");
    episodeQuery?.classList.remove("hidden");
    locationQuery?.classList.add("hidden");
    charQuery?.classList.add("hidden");
    episodeIDSection?.classList.remove("hidden");
    locationIDSection?.classList.add("hidden");
    charIDSection?.classList.add("hidden");
});
characterSearchID?.addEventListener("click", (e) => {
    if (!idInput1)
        return;
    if (idInput1.value == "")
        return;
    handleIDClick("character", idInput1);
});
locationSearchID?.addEventListener("click", (e) => {
    if (!idInput2)
        return;
    if (idInput2.value == "")
        return;
    handleIDClick("location", idInput2);
});
episodeSearchID?.addEventListener("click", (e) => {
    if (!idInput3)
        return;
    if (idInput3.value == "")
        return;
    handleIDClick("episode", idInput3);
});
charQuery?.addEventListener("click", (e) => {
    if (!charName || !charStatus || !charGender || !charSpecies)
        return;
    if (charName.value == "" &&
        charStatus.value == "" &&
        charGender.value == "" &&
        charSpecies.value == "")
        return; //can't take an empty string
    handleQueryClick("queryChar", {
        name: charName,
        status: charStatus,
        gender: charGender,
        species: charSpecies,
    });
});
locationQuery?.addEventListener("click", (e) => {
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
episodeQuery?.addEventListener("click", (e) => {
    if (!episodeName || !episodeCode)
        return;
    if (episodeCode.value == "" && episodeName.value == "")
        return;
    handleQueryClick("queryEpisode", {
        name: episodeName,
        code: episodeCode,
    });
});
async function handleIDClick(type, idInput) {
    const x = idInput.value.split(",").map(Number).filter(Boolean);
    const uniqueX = [...new Set(x)];
    const output = `https://rickandmortyapi.com/api/${type}/` + JSON.stringify(uniqueX);
    try {
        const object = await fetchData(output);
        const top5 = object.slice(0, 5);
        sessionStorage.setItem("rm_results", JSON.stringify(top5));
        sessionStorage.setItem("rm_type", type);
        window.location.href = "results.html";
    }
    catch (error) {
        if (error instanceof Error) {
            console.warn(`ERROR! error status : ${error.message}`);
        }
        else {
            console.error("An unknown error occured", error);
        }
    }
}
async function handleQueryClick(//query input takes the keys of query input map and then uses them to fetch the correct data type
type, inputs) {
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
        const object = await fetchData(output);
        const results = object.results;
        const top5 = results.slice(0, 5);
        sessionStorage.setItem("rm_results", JSON.stringify(top5));
        sessionStorage.setItem("rm_type", tag);
        window.location.href = "results.html";
    }
    catch (error) {
        if (error instanceof Error) {
            console.warn(`ERROR! error status : ${error.message}`);
        }
        else {
            console.error("An unknown error occured", error);
        }
    }
}
async function fetchData(information) {
    const response = await fetch(information);
    if (!response.ok) {
        throw new Error(`ERROR! Error status : ${response.status}`);
    }
    const data = await response.json();
    return data;
}
