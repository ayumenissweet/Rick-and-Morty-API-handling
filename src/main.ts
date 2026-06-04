interface nameUrl {
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
interface character extends APIcontent {
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: nameUrl;
  location: nameUrl;
  image: string;
  episode: string[];
}

interface location extends APIcontent {
  type: string;
  dimension: string;
  residents: string[];
}

interface episode extends APIcontent {
  air_date: string;
  episode: string;
  characters: string[];
}

interface APIResponseMap {
  character: character[];
  location: location[];
  episode: episode[];
}

//just preparations.. these don't exist yet except the first one
const characterSearchID =
  document.querySelector<HTMLButtonElement>(".id-search1");
const locationSearchID =
  document.querySelector<HTMLButtonElement>(".id-search2");
const episodeSearchID =
  document.querySelector<HTMLButtonElement>(".id-search3");

//id search selectors
const idInput1 = document.querySelector<HTMLInputElement>("#id-input1");
const idInput2 = document.querySelector<HTMLInputElement>("#id-input2");
const idInput3 = document.querySelector<HTMLInputElement>("#id-input3");

characterSearchID?.addEventListener("click", (e: MouseEvent) => {
  if (!idInput1) return;
  handleClick("character", idInput1);
});

async function handleClick<T extends keyof APIResponseMap>(
  type: T,
  idInput: HTMLInputElement,
) {
  const x: number[] = idInput.value.split(",").map(Number).filter(Boolean);
  const uniqueX: number[] = [...new Set(x)];

  const output = //based on the type return the correct API link
    `https://rickandmortyapi.com/api/${type}/` + JSON.stringify(uniqueX);

  const object: APIResponseMap[T] = await fetchData(output);
  console.log(object);
}

async function fetchData<T extends keyof APIResponseMap>(
  information: string,
): Promise<APIResponseMap[T]> {
  const response = await fetch(information);

  if (!response.ok) {
    console.log(`ERROR! error status : ${response.status}`);
  }

  const data: APIResponseMap[T] = await response.json();
  return data;
}
