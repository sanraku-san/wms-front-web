import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function Store() {
  const [stores, setStores] = useState([
    { 
      id: 1, 
      name: 'Main Branch', 
      address: '123 Main Street, Central Business District, Metro Manila', 
      contact: '0917-123-4567' 
    },
    { 
      id: 2, 
      name: 'Downtown Store', 
      address: '456 Downtown Avenue, Near City Hall, Quezon City', 
      contact: '0918-234-5678' 
    },
    { 
      id: 3, 
      name: 'Uptown Outlet', 
      address: '789 Uptown Boulevard, 2nd Floor, Mega Mall Complex, Pasig City', 
      contact: '0919-345-6789' 
    },
    { 
      id: 4, 
      name: 'Coastal Warehouse', 
      address: '321 Seaside Road, Port Area, Manila Bay Reclamation Area', 
      contact: '0920-456-7890' 
    },
    { 
      id: 5, 
      name: 'Mountain View Branch', 
      address: '654 Highland Drive, Baguio City, Benguet Province', 
      contact: '0921-567-8901' 
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentStore, setCurrentStore] = useState({ id: null, name: '', address: '', contact: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleAdd = () => {
    setCurrentStore({ id: null, name: '', address: '', contact: '' });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (store) => {
    setCurrentStore(store);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStores(stores.filter(store => store.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEdit) {
      setStores(stores.map(store => 
        store.id === currentStore.id ? { ...store, ...currentStore } : store
      ));
    } else {
      const newId = stores.length ? Math.max(...stores.map(s => s.id)) + 1 : 1;
      setStores([...stores, { ...currentStore, id: newId }]);
    }
    setShowModal(false);
    setCurrentStore({ id: null, name: '', address: '', contact: '' });
  };

  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Store Management</h1>
            <p className="text-gray-500 mt-1">Manage your store locations</p>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            + Add Store
          </button>
        </div>
      </div>

      {/* Store Grid */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map(store => (
            <div 
              key={store.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{store.name}</h2>
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                  <p className="text-sm text-gray-700 break-words">{store.address}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500">Contact</p>
                  <p className="text-sm text-gray-700">{store.contact}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex gap-2">
                <button
                  onClick={() => handleEdit(store)}
                  className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition font-medium text-sm flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(store.id)}
                  className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium text-sm flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {stores.length === 0 && (
            <div className="col-span-full py-10 text-gray-400 text-center text-lg bg-white rounded-xl shadow">
              No stores found.
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {isEdit ? 'Edit Store' : 'Add Store'}
            </h3>
            <form onSubmit={handleSave}>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Store Name"
                    value={currentStore.name}
                    onChange={e => setCurrentStore({ ...currentStore, name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Address"
                    value={currentStore.address}
                    onChange={e => setCurrentStore({ ...currentStore, address: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Contact Number"
                    value={currentStore.contact}
                    onChange={e => setCurrentStore({ ...currentStore, contact: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {isEdit ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  )
}
