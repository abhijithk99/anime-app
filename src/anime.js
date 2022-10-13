import axios from 'axios';

const baseUrl = 'https://api.jikan.moe/v4/anime?';


export const getAnimeData = async (currentPage) => {
    try{
        const {data} = await axios.get(baseUrl + `page=${currentPage}&limit=15`);
        return data;
    }catch(error) {
        throw error;
    }
}