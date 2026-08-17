function Spinner({ label = "Loading..." }) {
  return (
    <div className="spinner-wrap">
      <div className="spinner"></div>
      <p>{label}</p>
    </div>
  );
}

export default Spinner;
