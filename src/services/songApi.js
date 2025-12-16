export const fetchSongs = async () => {
    try {
        const response =await fetch("http://localhost:7000/api/v1/songs");
        return response.json();
    } catch (error) {
        console.log("Error fetching songs:", error);
        throw error;
    }
}