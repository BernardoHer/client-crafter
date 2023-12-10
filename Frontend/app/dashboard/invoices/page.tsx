"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Invoice {
  id: number;
  userName: string;
  userEmail: string;
  invoiceAmount: number;
  invoiceStatus: 'Pending' | 'Paid';
}

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const fetchAllInvoices = async () => {
    try {
      const response = await axios.get('/api/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handlePayInvoice = async (id: number) => {
    try {
      await axios.patch(`/api/invoices/${id}`, { invoiceStatus: 'Paid' }); 
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === id ? { ...invoice, invoiceStatus: 'Paid' } : invoice
        )
      );
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Invoices Page</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User Name</th>
            <th className="py-2 px-4 border-b">User Email</th>
            <th className="py-2 px-4 border-b">Invoice Amount</th>
            <th className="py-2 px-4 border-b">Invoice Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="py-2 px-4 border-b">{invoice.userName}</td>
              <td className="py-2 px-4 border-b">{invoice.userEmail}</td>
              <td className="py-2 px-4 border-b">${invoice.invoiceAmount.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{invoice.invoiceStatus}</td>
              <td className="py-2 px-4 border-b">
                {invoice.invoiceStatus === 'Pending' && (
                  <button
                    onClick={() => handlePayInvoice(invoice.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesPage;
