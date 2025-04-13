import { Card } from '@/components/ui/card';

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{message}</p>
      </Card>
    </div>
  );
}

export default ErrorDisplay;
