function App() {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await fetch(`${window.location.origin}/upload`, {
        method: "POST",
        body: formData,
      });

      alert("File uploaded");
    }
  };

  return (
    <>
      <h1>Vite + React</h1>
      <input type="file" onChange={handleUpload} />
    </>
  );
}

export default App;
