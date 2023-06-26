import axios from "axios"

export async function getMoviesRequest(filters: MovieFilters): Promise<Movie[]> {
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
    params: {
      list: 'most_pop_movies',
      limit: 50,
      ...filters
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