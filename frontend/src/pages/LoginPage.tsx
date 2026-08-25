const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const SCOPE = 'user:follow';

function LoginPage() {

  function handleLogin(){
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
  }

  return (
    <div>
      <h1>Welcome to Bondtrace</h1>
      <p>Login with your GitHub account to get started.</p>

      <button onClick={handleLogin}>Login with GitHub</button>

    </div>
  )
}

export default LoginPage
