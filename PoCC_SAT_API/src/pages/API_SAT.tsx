import { useEffect, useState } from 'react';

interface JobResult {
    thumbnail: string;
    title: string;
    company_name: string;
    detected_extensions: {
        salary: string;
    };
    location: string;
}

interface SerpApiResponse {
    jobs_results: JobResult[];
}

function Liong() { // Liong 
    const [data, setData] = useState<SerpApiResponse | null>(null);
    const params = {
        engine: "google_jobs",
        q: "firefighter", // bagian q bisa diganti terserah
        hl: "en",
    }
    
    useEffect(() => {
        const queryString = new URLSearchParams(params).toString();
        fetch(`api/search?${queryString}`)
            .then(response => response.json())
            .then((result: SerpApiResponse) => {
                console.log(result);
                setData(result);
            })
            .catch((err) => console.error('Error:', err));
    }, []);

    if (!data) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <img src={data.jobs_results[1].thumbnail} width="100"/>
            <h2>{data.jobs_results[1].title}</h2>
            <p>{data.jobs_results[1].company_name}</p>
            <p>${data.jobs_results[1].detected_extensions.salary}</p>
            <p>{data.jobs_results[1].location}</p>
        </div>
    )
} export default Liong;