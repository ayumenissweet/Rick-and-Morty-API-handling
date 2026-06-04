const form = document.querySelector<HTMLFormElement>("form");

if (form) {
  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    handleForm();
  });
}

async function handleForm() {
  const myAwesomeChar = await fetchData(
    "https://rickandmortyapi.com/api/character/1",
  );
  console.log(myAwesomeChar);
}

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

async function fetchData(information: string): Promise<character> {
  const response = await fetch(information);

  if (!response.ok) {
    console.log(`ERROR! error status : ${response.status}`);
  }

  const data: character = await response.json();
  return data;
}
