import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAxios(url) {
    const [scrapers, setScrappers] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //Fetch scrappers from backend
    const fetchScrapers = async () => {
        try {
            setLoading(true);
            const scrapersResponse = await axios.get(url);
            setScrappers(scrapersResponse.data);
        } catch(err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    //Fetch Data again
    const reload = () => {
        setError(null);
        fetchScrapers();
    }

    useEffect(() => {
        fetchScrapers(); 
    }, [url]);

    return { scrapers, error, loading, reload };
}