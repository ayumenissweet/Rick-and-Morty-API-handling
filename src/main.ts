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

interface Result<T> {
  info: any; //this is temporary, i will fix this!
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
  episode: HTMLInputElement;
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

//just preparations.. these don't exist yet except the first one
const characterSearchID =
  document.querySelector<HTMLButtonElement>(".id-search1");
const locationSearchID =
  document.querySelector<HTMLButtonElement>(".id-search2");
const episodeSearchID =
  document.querySelector<HTMLButtonElement>(".id-search3");

//query buttons
const charQuery = document.querySelector<HTMLButtonElement>(".char-query");

//id search selectors
const idInput1 = document.querySelector<HTMLInputElement>("#id-input1");
const idInput2 = document.querySelector<HTMLInputElement>("#id-input2");
const idInput3 = document.querySelector<HTMLInputElement>("#id-input3");

//character query selectors
const charName = document.querySelector<HTMLInputElement>(".char-name");
const charStatus = document.querySelector<HTMLSelectElement>(".char-status");
const charGender = document.querySelector<HTMLSelectElement>(".char-gender");
const charSpecies = document.querySelector<HTMLSelectElement>(".char-species");

characterSearchID?.addEventListener("click", (e: MouseEvent) => {
  if (!idInput1) return;
  handleIDClick("character", idInput1);
});

charQuery?.addEventListener("click", (e: MouseEvent) => {
  if (!charName || !charStatus || !charGender || !charSpecies) return;
  handleQueryClick("queryChar", {
    name: charName,
    status: charStatus,
    gender: charGender,
    species: charSpecies,
  });
});

async function handleIDClick<T extends keyof IDMap>(
  type: T,
  idInput: HTMLInputElement,
) {
  const x: number[] = idInput.value.split(",").map(Number).filter(Boolean);
  const uniqueX: number[] = [...new Set(x)];

  const output = //based on the type return the correct API link
    `https://rickandmortyapi.com/api/${type}/` + JSON.stringify(uniqueX);

  try {
    const object: APIResponseMap[T] = await fetchData(output);
    console.log(object);
  } catch (error) {
    if (error instanceof Error) {
      console.warn(`Failed gracefully: ${error.message}`);
    } else {
      console.error("An unexpected, non-standard error occurred", error);
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
      "?" +
      `name=${cleanInputs.name.value}&episode=${cleanInputs.episode.value}`;
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
    console.log(object);
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
