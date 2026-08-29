import { useState, useEffect } from "react";

import UserCard from "../components/UserCard";


function UsersPage() {

    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem('token');
        setIsLoading(true);
        async function fetchInitialUsers() {
            
            const response = await fetch("http://localhost:8000/github/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
                console.log("Success");
            } else {
                console.error("Failed to fetch GitHub users");
            }
            setIsLoading(false);


        }

        fetchInitialUsers();
    }, []);

    async function loadMore() {
        if (users.length === 0) return;

        setIsLoading(true);

        const lastUser = users[users.length - 1]
        const lastId = lastUser.id;

        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:8000/github/users?since=${lastId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            setUsers([...users, ...data]);
        } else {
            console.error("Failed to fetch GitHub users");
        }
        
        setIsLoading(false)

    }

    return (
        <>
            <h2>Browse Public Github Users</h2>
            <div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">

                    {users.map((user) => (

                        <UserCard key={user.id} user={user} />

                    ))}

                </div>
            </div>

            <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-150 hover:bg-gray-50 hover:text-gray-900 hover:shadow active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white dark:disabled:bg-zinc-800"
          >
            {isLoading ? (
              <>
                <svg 
                  className="h-4 w-4 animate-spin text-gray-500 dark:text-zinc-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Loading users...</span>
              </>
            ) : (
              <>
                <span>Load More Users</span>
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
            </button>
        </>
    )
}


export default UsersPage