const templateArray = Array.from({ length: 6 });

function MessageLoadingSkeleton() {
  return (
    <div className="max-w-full animate-pulse">
      <p className="mb-4 h-3 w-72 rounded-full bg-gray-300">&nbsp;</p>
      {templateArray.map((_, index) => (
        <p key={index} className="mb-2 h-2 rounded-full bg-gray-300">
          &nbsp;
        </p>
      ))}
    </div>
  );
}

export default MessageLoadingSkeleton;
