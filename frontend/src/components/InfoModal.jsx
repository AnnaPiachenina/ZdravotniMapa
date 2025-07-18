import React from 'react';
import { IoMdClose } from "react-icons/io";

const InfoModal = ({ point, onClose }) => {
  if (!point) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-[400px] max-w-full p-4 relative">
            <button
                onClick={onClose} title='Zavřít'
                className="absolute top-2 right-3 text-lg text-red-600 hover:text-red-800"
                >
                <IoMdClose className='size-6 mt-1' />
            </button>

            <h3 className="text-xl font-bold mb-4">{point.name}</h3>

            <div className="flex items-center gap-1">
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
            </div>

            <div className="">Poznámka: {point.note}</div>
            <div className='text-xs text-gray-500'>lat:{point.lat}, lng:{point.lng}</div>
        </div>
        </div>
    );
};

export default InfoModal;
