import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PricingPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Enterprise Solutions</h1>
        <p className="text-xl text-muted-foreground">
          Custom project design and tailored solution based on your business needs.
        </p>
      </div>
      <div className="flex justify-center">
        <Card className="max-w-xl w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Enterprise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-center text-muted-foreground py-8">
              Custom project design and tailored solution based on your business needs.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
