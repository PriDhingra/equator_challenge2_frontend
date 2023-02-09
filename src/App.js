import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import useAxios from './hooks/useAxios';
import './App.css';

//Environment Variables
const { REACT_APP_BACKEND } = process.env;

function App() {
    console.log(REACT_APP_BACKEND);
    //Call user defined hook useAxios
    const { scrapers, error, loading, reload } = useAxios('http://localhost:5400/scrapers');

    //Columns in the grid
    const columns = React.useMemo(
		() => [
            { field: "id", headerName: "S.No.", width: 100 },
			{ field: "name", headerName: "Scrapper Name", width: 200 },
			{ 
                field: "gitHubUrl", 
                headerName: "GitHub URL", 
                width: 500, 
                renderCell: params => (
                    <Button variant="contained" href={params.value} target="_blank">
                        View Github URL
                    </Button>  
                )
            },
			{ 
                field: "downloadUrl", 
                headerName: "Download URL", 
                width: 500, 
                renderCell: params => (
                    <Button variant="contained" href={params.value} target="_blank">
                        View Download URL
                    </Button> 
                )
            }
		],
        []
    );

    return (
        <div className='App' style={{ height: 600, width: "100%", backgroundColor: "#f2f2f2" }}>
            {/* Display when we are waiting fro response from backen */}
            {loading && <CircularProgress style={{margin: 100}} />}

            {/* Display error if something wrong happens with API */}
            {
                error && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <p style={{ color: "red", fontWeight: "bold" }}>Error: {error.message}</p>
                        <Button variant="contained" onClick={reload}>Retry</Button>
                    </div>
                )
            }

            {/* Display scrappers as a grid */}
            {
                scrapers && (
                    <DataGrid
                        columns={columns}
                        rows={scrapers}
                        pagination
                        rowsPerPageOptions={[10, 25, 50, 75, 100]}
                        checkboxSelection
                        style={{ backgroundColor: "#fff", padding: 20 }}
                    />
                )
            }
        </div>
    );
}

export default App;
