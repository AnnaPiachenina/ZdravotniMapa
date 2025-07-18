import { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

const SideBar = ({ isOpen, onClose }) => {
    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();
                setPoints(data);
            } catch (error) {
                console.error('Error fetching points', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPoints();
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}> {/*sidebar je otevren na leve strane*/}
            <div className="bg-white shadow-lg rounded-lg p-4 h-full overflow-y-auto">
                <button
                    onClick={onClose} title='Zavřít'
                    className="absolute top-2 right-3 text-lg text-red-600 hover:text-red-800"
                    >
                    <IoMdClose className='size-6 mt-1' />
                </button>
                <h2 className="text-2xl font-semibold mb-4 mt-1">Jednotky</h2> 
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="space-y-2">
                        {points.map((point, idx) => (
                            <li key={idx} className="border-b border-gray-200 pb-2">
                                <h3 className="font-bold mb-2">{point.name}</h3>
                                <p className="flex items-center gap-1">
                                    <span className={`inline-block w-2 h-2 rounded-full ${
                                        point.status === 'active' ? 'bg-green-600' :
                                        point.status === 'inactive' ? 'bg-red-600' : 'bg-gray-500'
                                    }`}></span>
                                    <span className={
                                        point.status === 'active' ? 'text-green-600' :
                                        point.status === 'inactive' ? 'text-red-600' : 'text-gray-600'
                                    }>
                                        {point.status}
                                    </span>
                                </p>
                                <p>Poznamka: {point.note}</p>
                                <p className='text-gray-500 text-sm'>lat:{point.lat}, lng:{point.lng}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SideBar;
