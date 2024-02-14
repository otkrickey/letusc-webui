export default function LoginForm() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded">
                <h1 className="text-lg font-bold mb-4">Login</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Username</label>
                        <input type="text" className="w-full px-3 py-2 border rounded shadow-sm" autoComplete="letusc-username" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2">Password</label>
                        <input type="password" className="w-full px-3 py-2 border rounded shadow-sm" autoComplete="letusc-password" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Login</button>
                </form>
            </div>
        </div>
    );
}
