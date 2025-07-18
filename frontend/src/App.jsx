import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Map from './components/Map';
import InfoModal from './components/InfoModal';
import SideBar from './components/SideBar';

function App() {
    // stav pro vybrany bod
    const [selectedPoint, setSelectedPoint] = useState(null); 
    // stav sidebaru
    const [SidebarOpen, setSidebarOpen] = useState(false);
    // stav pro nacteni dat
    const [points, setPoints] = useState([]);
    // stav pro vyhledavani
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // nacteni dat z JSON souboru
        const loadData = async () => {
            const res = await fetch('/data.json');
            const data = await res.json();
            setPoints(data);
        };
        loadData();
    }, []);
    
    // filtrace body podle dotazu
    const filteredPoints = points.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );  
        // vyhledavani a nastaveni vybraneho bodu
    const searchSelect = (name) => {
        setSearchQuery(name);
        const point = points.find(p => p.name === name);
        if (point) setSelectedPoint(point);
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col relative">
                <Header
                    onSearch={setSearchQuery}
                    onSideBar={() => setSidebarOpen(true)}
                    searchQuery={searchQuery}
                    points={points}
                    onSuggestion={searchSelect}
                />
                <main className="flex-grow relative">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                points.length > 0 ? (
                                    <Map points={filteredPoints} onSelectPoint={setSelectedPoint} />
                                ) : (
                                    <div></div>
                                )
                            }
                        />
                    </Routes>
                    <InfoModal point={selectedPoint} onClose={() => setSelectedPoint(null)} />
                    <SideBar isOpen={SidebarOpen} onClose={() => setSidebarOpen(false)} />
                </main>
            </div>
        </Router>
    );
}

export default App;
