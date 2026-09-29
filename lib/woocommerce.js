const CAT_API_BASE = "https://api.thecatapi.com/v1";

export const getCats = async (limit = 10, page = 0) => {
  try {
    const response = await fetch(
      `${CAT_API_BASE}/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch cats");
    return await response.json();
  } catch (error) {
    console.error("Error fetching cats:", error);
    throw error;
  }
};

export const getCatById = async (id) => {
  try {
    const response = await fetch(`${CAT_API_BASE}/images/${id}`);
    if (!response.ok) throw new Error("Cat not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching cat:", error);
    throw error;
  }
};

export const getCatBreeds = async () => {
  try {
    const response = await fetch(`${CAT_API_BASE}/breeds`);
    if (!response.ok) throw new Error("Failed to fetch breeds");
    return await response.json();
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw error;
  }
};
