import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Ajouter: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <button
        className="bg-orange-500 text-white px-4 py-2 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Ajouter
      </button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 className="text-xl font-bold mb-4">Ajouter un élément</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              className="border border-gray-300 p-2 w-full rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 w-full rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Enregistrer
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Ajouter;