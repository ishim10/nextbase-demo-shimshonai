import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegistrationClosedPage() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] py-12">
            <Card className="max-w-lg w-full mx-auto">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        🚧 Registration is temporarily closed.
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground text-lg">
                        We are preparing for launch — please check back soon!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
} 