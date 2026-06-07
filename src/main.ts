interface NameUrl {
  name: string;
  url: string;
}

// we can actually create a universal type here
interface APIcontent {
  id: number;
  name: string;
  url: string;
  created: string;
}

//creating the base types of the API
interface Character extends APIcontent {
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: NameUrl;
  location: NameUrl;
  image: string;
  episode: string[];
}

interface Location extends APIcontent {
  type: string;
  dimension: string;
  residents: string[];
}

interface Episode extends APIcontent {
  air_date: string;
  episode: string;
  characters: string[];
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Result<T> {
  info: Info;
  results: T[];
}

//overall API responses :
//ID searches : from the API, no matter 1 or more IDs, it ALWAYS returns an array of characters/locations/episodes
//Query searches : it returns an object {info, results} where results is an array of  characters/locations/episodes
interface APIResponseMap {
  character: Character[];
  location: Location[];
  episode: Episode[];
  queryChar: Result<Character>;
  queryLocation: Result<Location>;
  queryEpisode: Result<Episode>;
}

interface CharInput {
  name: HTMLInputElement;
  status: HTMLSelectElement;
  gender: HTMLSelectElement;
  species: HTMLSelectElement;
}

interface LocationInput {
  name: HTMLInputElement;
  type: HTMLInputElement;
  dimension: HTMLInputElement;
}

interface EpisodeInput {
  name: HTMLInputElement;
  code: HTMLInputElement;
}

interface IDMap {
  character: Character[];
  location: Location[];
  episode: Episode[];
}

interface InputMap {
  queryChar: CharInput;
  queryLocation: LocationInput;
  queryEpisode: EpisodeInput;
}

//select query selectors!
const charTab = document.querySelector<HTMLButtonElement>(".char-select-btn");
const locationTab = document.querySelector<HTMLButtonElement>(
  ".location-select-btn",
);
const episodeTab = document.querySelector<HTMLButtonElement>(
  ".episode-select-btn",
);

//id search section selectors
const charIDSection = document.querySelector<HTMLDivElement>(".char-id-search");
const locationIDSection = document.querySelector<HTMLDivElement>(
  ".location-id-search",
);
const episodeIDSection =
  document.querySelector<HTMLDivElement>(".episode-id-search");

//sections query selectors
const charSection = document.querySelector<HTMLDivElement>(
  ".character-container",
);
const locationSection = document.querySelector<HTMLDivElement>(
  ".location-container",
);
const episodeSection =
  document.querySelector<HTMLDivElement>(".episode-container");

//id search buttons
const characterSearchID =
  document.querySelector<HTMLButtonElement>(".id-search1");
const locationSearchID =
  document.querySelector<HTMLButtonElement>(".id-search2");
const episodeSearchID =
  document.querySelector<HTMLButtonElement>(".id-search3");

//query buttons
const charQuery = document.querySelector<HTMLButtonElement>(".char-query");
const locationQuery =
  document.querySelector<HTMLButtonElement>(".location-query");
const episodeQuery =
  document.querySelector<HTMLButtonElement>(".episode-query");

//id input selectors
const idInput1 = document.querySelector<HTMLInputElement>("#id-input1");
const idInput2 = document.querySelector<HTMLInputElement>("#id-input2");
const idInput3 = document.querySelector<HTMLInputElement>("#id-input3");

//character query selectors
const charName = document.querySelector<HTMLInputElement>(".char-name");
const charStatus = document.querySelector<HTMLSelectElement>(".char-status");
const charGender = document.querySelector<HTMLSelectElement>(".char-gender");
const charSpecies = document.querySelector<HTMLSelectElement>(".char-species");

//location query selectors
const locationName = document.querySelector<HTMLInputElement>(".location-name");
const locationType = document.querySelector<HTMLInputElement>(".location-type");
const locationDimension = document.querySelector<HTMLInputElement>(
  ".location-dimension",
);

//episode query selectors
const episodeName = document.querySelector<HTMLInputElement>(".episode-name");
const episodeCode = document.querySelector<HTMLInputElement>(".episode-code");

charTab?.addEventListener("click", (e: MouseEvent) => {
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

locationTab?.addEventListener("click", (e: MouseEvent) => {
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

episodeTab?.addEventListener("click", (e: MouseEvent) => {
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

characterSearchID?.addEventListener("click", (e: MouseEvent) => {
  if (!idInput1) return;
  if (idInput1.value == "") return;
  handleIDClick("character", idInput1);
});

locationSearchID?.addEventListener("click", (e: MouseEvent) => {
  if (!idInput2) return;
  if (idInput2.value == "") return;
  handleIDClick("location", idInput2);
});

episodeSearchID?.addEventListener("click", (e: MouseEvent) => {
  if (!idInput3) return;
  if (idInput3.value == "") return;
  handleIDClick("episode", idInput3);
});

charQuery?.addEventListener("click", (e: MouseEvent) => {
  if (!charName || !charStatus || !charGender || !charSpecies) return;
  if (
    charName.value == "" &&
    charStatus.value == "" &&
    charGender.value == "" &&
    charSpecies.value == ""
  )
    return; //can't take an empty string
  handleQueryClick("queryChar", {
    name: charName,
    status: charStatus,
    gender: charGender,
    species: charSpecies,
  });
});

locationQuery?.addEventListener("click", (e: MouseEvent) => {
  if (!locationName || !locationType || !locationDimension) return;
  if (
    //can't take empty strings
    locationName.value == "" &&
    locationType.value == "" &&
    locationDimension.value == ""
  )
    return;

  handleQueryClick("queryLocation", {
    name: locationName,
    type: locationType,
    dimension: locationDimension,
  });
});

episodeQuery?.addEventListener("click", (e: MouseEvent) => {
  if (!episodeName || !episodeCode) return;
  if (episodeCode.value == "" && episodeName.value == "") return;
  handleQueryClick("queryEpisode", {
    name: episodeName,
    code: episodeCode,
  });
});

async function handleIDClick<T extends keyof IDMap>(
  type: T,
  idInput: HTMLInputElement,
) {
  const x: number[] = idInput.value.split(",").map(Number).filter(Boolean);
  const uniqueX: number[] = [...new Set(x)];

  const output =
    `https://rickandmortyapi.com/api/${type}/` + JSON.stringify(uniqueX);

  try {
    const object: APIResponseMap[T] = await fetchData(output);
    const top5 = (object as IDMap[T]).slice(0, 5);
    sessionStorage.setItem("rm_results", JSON.stringify(top5));
    sessionStorage.setItem("rm_type", type);
    window.location.href = "results.html";
  } catch (error) {
    if (error instanceof Error) {
      console.warn(`ERROR! error status : ${error.message}`);
    } else {
      console.error("An unknown error occured", error);
    }
  }
}

async function handleQueryClick<T extends keyof InputMap>( //query input takes the keys of query input map and then uses them to fetch the correct data type
  type: T,
  inputs: InputMap[T],
) {
  let message: string;
  if (type == "queryChar") {
    let cleanInputs: CharInput = inputs as CharInput;
    message =
      "?" +
      `name=${cleanInputs.name.value}&status=${cleanInputs.status.value}&gender=${cleanInputs.gender.value}&species=${cleanInputs.species.value}`;
  } else if (type == "queryLocation") {
    let cleanInputs: LocationInput = inputs as LocationInput;
    message =
      "?" +
      `name=${cleanInputs.name.value}&type=${cleanInputs.type.value}&dimension=${cleanInputs.dimension.value}`;
  } else {
    let cleanInputs: EpisodeInput = inputs as EpisodeInput;
    message =
      "?" + `name=${cleanInputs.name.value}&episode=${cleanInputs.code.value}`;
  }
  //i HATE this part
  let tag: string;
  if (type == "queryChar") {
    tag = "character";
  } else if (type == "queryLocation") {
    tag = "location";
  } else tag = "episode";

  const output = `https://rickandmortyapi.com/api/${tag}/` + message;

  try {
    const object: APIResponseMap[T] = await fetchData(output);
    const results = (object as Result<Character | Location | Episode>).results;
    const top5 = results.slice(0, 5);
    sessionStorage.setItem("rm_results", JSON.stringify(top5));
    sessionStorage.setItem("rm_type", tag);
    window.location.href = "results.html";
  } catch (error) {
    if (error instanceof Error) {
      console.warn(`ERROR! error status : ${error.message}`);
    } else {
      console.error("An unknown error occured", error);
    }
  }
}

async function fetchData<T extends keyof APIResponseMap>(
  information: string,
): Promise<APIResponseMap[T]> {
  const response = await fetch(information);

  if (!response.ok) {
    throw new Error(`ERROR! Error status : ${response.status}`);
  }

  const data: APIResponseMap[T] = await response.json();
  return data;
}
