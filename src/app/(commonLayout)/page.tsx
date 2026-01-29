export default async function Home() {

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      <p className="text-lg">This is the main landing page of the application.</p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Get Started</button>
    </div>
  );
}
