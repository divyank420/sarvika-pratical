interface IErrorProps {
  message?: string;
}

export default function Error({ message }: IErrorProps) {
  if (!message) return null;

  return (
      <span className="text-sm text-red-600">Error! {message}</span> 
  );
}
