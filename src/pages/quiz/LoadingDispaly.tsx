import { Card } from '@/components/ui/card';

function LoadingDisplay() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-center">Loading...</h2>
      </Card>
    </div>
  );
}

export default LoadingDisplay;
