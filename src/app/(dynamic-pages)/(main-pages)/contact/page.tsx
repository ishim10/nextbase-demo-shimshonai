"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Valid email required'),
    message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'submitting'>('idle');
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        setStatus('submitting');
        setError(null);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                const result = await res.json();
                setError(result.error || 'Something went wrong.');
                setStatus('error');
            }
        } catch (e) {
            setError('Network error. Please try again.');
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 flex justify-center">
            <Card className="max-w-xl w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                    {status === 'success' ? (
                        <div className="text-green-600 text-center py-8">Thank you for reaching out! We'll get back to you soon.</div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea rows={5} placeholder="How can we help you?" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {status === 'error' && error && (
                                    <div className="text-red-600 text-center">{error}</div>
                                )}
                                <Button type="submit" className="w-full" disabled={status === 'submitting' || !form.formState.isValid}>
                                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 