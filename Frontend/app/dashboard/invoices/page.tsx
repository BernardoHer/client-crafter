"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/app/lib/definitions';

interface Invoice {
  _id: number;
  customer_id: string;
  amount: string;
  date: string;
  status: 'Pending' | 'Paid';
}
const purchasesMap: Record<string, Invoice[]> = {};
let userPurchases:Invoice[];
const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const fetchAllInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/purchases');
      setInvoices(response.data);

    response.data.forEach((purchase:Invoice) => {
      if (!purchasesMap[purchase.customer_id]) {
        purchasesMap[purchase.customer_id] = [];
      }
      purchasesMap[purchase.customer_id].push(purchase);
    });
      
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      console.log(response.data);
      response.data.forEach((user:User) => {
        console.log(`Nombre: ${user.name}, Email: ${user.email}`);
  
        userPurchases = purchasesMap[user._id] || [];
        userPurchases.forEach((purchase) => {
          console.log(`  Compra: ${purchase.amount}, Estado: ${purchase.status}`);
        });
      });
      setUsers(response.data);
    }catch(error){
      console.error('Error fetching users: ', error)
    }
    
  };

  const handlePayInvoice = async (id: number) => {
    try {
      await axios.patch(`/api/invoices/${id}`, { status: 'Paid' }); 
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === id ? { ...invoice, status: 'Paid' } : invoice
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
            <tr key={invoice._id}>
              <td className="py-2 px-4 border-b">{invoice.customer_id}</td>
              <td className="py-2 px-4 border-b">{invoice.amount}</td>
              <td className="py-2 px-4 border-b">${invoice.date}</td>
              <td className="py-2 px-4 border-b">{invoice.status}</td>
              <td className="py-2 px-4 border-b">
                {invoice.status === 'Pending' && (
                  <button
                    onClick={() => handlePayInvoice(invoice._id)}
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
