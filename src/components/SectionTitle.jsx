const SectionTitle = ({ preText = '', accent = '', postText = '', className = '' }) => {
  return (
    <h2 className={`text-center text-3xl md:text-4xl font-bold mb-8 ${className}`}>
      {preText}
      {accent && <span className="text-accent">{accent}</span>}
      {postText}
    </h2>
  );
};

export default SectionTitle;
