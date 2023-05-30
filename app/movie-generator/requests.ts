import axios from "axios"
export async function getMoviesRequest(): Promise<Movie[]> {
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles',
    params: {
      list: 'most_pop_movies',
      limit: 10,
      startYear: 2015,
    },
    headers: {
      'X-RapidAPI-Key': 'ac9f4cbd20msh17548b492976f48p1febb7jsn89a1abdfab3f',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    return response.data.results
  } catch (error) {
    console.error(error);
    return []
  }
}