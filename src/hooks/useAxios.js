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
            axios.get(url).then(response => {
                const allScrappers = response.data.map((scraper, index) => ({
                    id: index + 1,
                    name: scraper.name,
                    gitHubUrl: scraper.html_url,
                    downloadUrl: scraper.download_url
                }))
                setScrappers(allScrappers);
            });
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
