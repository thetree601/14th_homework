interface ErrorComponentProps {
  error: any;
  onRetry: () => void;
}

export default function ErrorComponent({ error, onRetry }: ErrorComponentProps) {
  return (
    <div className="text-center mt-20 text-red-500">
      <p>에러가 발생했습니다.</p>
      <p className="text-sm mt-2">{error?.message}</p>
      <button 
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}
