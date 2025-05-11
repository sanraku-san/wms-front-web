import { XCircle } from "lucide-react";






export const TransactionDetailsModal = ({ transaction, onClose, onDelete }) => {
    if (!transaction) return null;
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP' // Philippine Peso
        }).format(amount);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-start">
                    <h2 className="text-xl font-semibold">Transaction Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <XCircle className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[400px]">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Date:</p>
                                <p className="font-medium">{transaction.date}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Store:</p>
                                <p className="font-medium">{transaction.store?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Type:</p>
                                <p className="font-medium capitalize">{transaction.transaction_type_id === 1 ? 'Inbound' : 'Outbound'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Amount:</p>
                                <p className="font-medium">{formatCurrency(transaction.total_transaction_price)}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Products:</p>
                            {transaction.products && transaction.products.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {transaction.products.map((product) => (
                                        <li key={product.id} className="text-sm">
                                            Product ID: {product.name}, Quantity: {product.pivot?.quantity}
                                        </li>
                                    ))} 
                                </ul>
                            ) : (
                                <p className="text-sm">No products associated with this transaction.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-4 sm:p-6 border-t border-gray-200 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onDelete(transaction.id);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
