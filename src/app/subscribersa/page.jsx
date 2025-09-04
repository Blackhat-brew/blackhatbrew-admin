'use client'
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdTrash } from "react-icons/io";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Api } from '@/components/Api';

function Dashboard() {

    const [subscribers, setsubscribers] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Initialize the router
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/signin");
        }
    }, [isLoggedIn, router]);

    const fetchsubscribers = async () => {
        try {
            const response = await axios.get(`${Api}/api/subscriber/v1`); // Replace with your API endpoint
            console.log(response)
            setsubscribers(response.data.subscribers);
          
        } catch (error) {
            console.error('Error fetching subscribers:', error);
        }
    };

    const handleDelete = async (subscriberId) => {
        try {
            setLoading(true);
            await axios.delete(`${Api}/api/subscriber/v1/${subscriberId}`);
            setsubscribers(subscribers.filter((subscriber) => subscriber._id !== subscriberId));
            toast.success('subscriber deleted successfully!');
        } catch (error) {
            console.error('Error deleting subscriber:', error);
            toast.error('Failed to delete subscriber.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchsubscribers();
    }, []);


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Subscribers</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table className="min-w-full text-gray-800">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-6 text-left text-sm font-semibold">#</th>
                            <th className="py-2 px-6 text-left text-sm font-semibold">Name</th>
                            <th className="py-2 px-6 text-left text-sm font-semibold">Email</th>
                            <th className="py-2 px-6 text-left text-sm font-semibold">Date</th>
                            <th className="py-2 px-6 text-left text-sm font-semibold">Time</th>
                            <th className="py-2 px-6 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No subscribers Available
                                </td>
                            </tr>
                        ) : (
                            subscribers.map((subscriber, index) => (
                                <tr
                                    key={subscriber._id}
                                    className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                >
                                    <td className="py-2 text-sm px-6">{index + 1}</td>
                                    <td className="py-2 text-sm px-6">{subscriber.name}</td>
                                    <td className="py-2 text-sm px-6">{subscriber.email}</td>
                                    <td className="py-2 text-sm px-6">{subscriber.date}</td>
                                    <td className="py-2 text-sm px-6">{subscriber.time}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleDelete(subscriber._id)}
                                            disabled={loading}
                                        >
                                            <IoMdTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Toaster />
        </div>
    );

}

function App() {

    return (

        <main className="p-4 rounded-b"> <Dashboard /> </main>
    );
}

export default App;
