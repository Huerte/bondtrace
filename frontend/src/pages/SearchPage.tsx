function SearchPage() {
<<<<<<< Updated upstream
    return (
        <>
            <h1>Search Github User</h1>
            <p>Hi i am the search page section</p>
=======

    const [query, setQuery] = useState("");
    const [githubUser, setGithubUser] = useState<any>(null);

    async function searchUser() {
        const response = await fetch(`http://localhost:8000/github/search/${query}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const data = await response.json();

            setGithubUser(data);
        } else {
            console.error("User not found");
            console.error(response.status)
            setGithubUser(null);
        }
        
    }

    async function followUser() {
        
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("You are not logged in!");
            return;
        }

        const response = await fetch(`http://localhost:8000/users/${githubUser.login}/follow`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
        });

        if (response.ok) {
            console.log("Followed successfully");
        } else {
            console.error("Failed to follow");
        }

    }

    async function unFollowUser() {

        const token = localStorage.getItem('token');

        if (!token) {
            console.error("You are not logged in!");
            return;
        }

        const response = await fetch(`http://localhost:8000/users/${githubUser.login}/unfollow`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });

        if (response.ok) {
            console.log("Successfully unfollowed:", githubUser.login);
        } else {
            console.error("Failed to unfollow");
        }

    }
    
    return (
        <>
            <input id="searchBar" value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Enter Github Username"/>
            <button onClick={searchUser}>Search</button>

            {githubUser && 
                <>
                    <h2>
                        Found: {githubUser.login}
                    </h2>

                    <button onClick={followUser}>Follow</button>
                    <button onClick={unFollowUser}>Unfollow</button>

                    <img
                        height={300}
                        width={300}
                        src={githubUser.avatar_url}
                        alt={`${githubUser.login}'s avatar`}
                    />

                    <div>
                        <p><strong>Name:</strong> {githubUser.name || "Not provided"}</p>

                        <p><strong>GitHub ID:</strong> {githubUser.id}</p>

                        <p><strong>Profile:</strong></p>
                        <a
                            href={githubUser.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {githubUser.html_url}
                        </a>

                        <p><strong>Location:</strong> {githubUser.location || "Not provided"}</p>

                        <p><strong>Bio:</strong> {githubUser.bio || "No bio available"}</p>

                        <p><strong>Company:</strong> {githubUser.company || "Not provided"}</p>

                        <p><strong>Public Repositories:</strong> {githubUser.public_repos}</p>

                        <p><strong>Public Gists:</strong> {githubUser.public_gists}</p>

                        <p><strong>Followers:</strong> {githubUser.followers}</p>

                        <p><strong>Following:</strong> {githubUser.following}</p>

                        <p><strong>Hireable:</strong> {githubUser.hireable ? "Yes" : "No"}</p>

                        <p>
                            <strong>Account Created:</strong>{" "}
                            {new Date(githubUser.created_at).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Last Updated:</strong>{" "}
                            {new Date(githubUser.updated_at).toLocaleDateString()}
                        </p>
                    </div>
                </>
            }
>>>>>>> Stashed changes
        </>
    )
}

export default SearchPage