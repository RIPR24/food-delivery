const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div className="circle-loading"></div>
        <h1>LOADING FOR RENDER.COM TO START</h1>
      </div>
    </div>
  );
};

export default Loading;
