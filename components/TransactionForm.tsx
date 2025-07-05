'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Textarea } from '@/components/ui/textarea';
import { Transaction } from '@/app/page';

const formSchema = z.object({
    amount: z.coerce.number()
        .min(0.01, { message: 'Amount must be positive' })
        .max(9999999.99, { message: 'Amount too large' })
        .refine(val => !isNaN(val), { message: 'Amount must be a valid number' }),
    date: z.date({
        required_error: 'A date is required.',
    }),
    description: z.string()
        .min(1, { message: 'Description is required' })
        .max(200, { message: 'Description cannot exceed 200 characters' }),
});

interface TransactionFormProps {
    initialData?: Transaction | null;
    onSuccess: () => void;
    onClose: () => void;
}

export default function TransactionForm({ initialData, onSuccess, onClose }: TransactionFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: initialData?.amount || 0,
            date: initialData?.date ? new Date(initialData.date) : new Date(),
            description: initialData?.description || '',
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                amount: initialData.amount,
                date: new Date(initialData.date),
                description: initialData.description,
            });
        } else {
            form.reset({
                amount: 0.01,
                date: new Date(),
                description: '',
            });
        }
    }, [initialData, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const url = initialData ? `/api/transactions/${initialData._id}` : '/api/transactions';
        const method = initialData ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    date: values.date.toISOString(),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                form.setError('root.serverError', {
                    type: 'custom',
                    message: errorData.message || 'Failed to save transaction',
                });
                throw new Error(errorData.message || 'Failed to save transaction');
            }

            onSuccess();
            form.reset();
        } catch (error) {
            console.error('Error saving transaction:', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="e.g., 50.25" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        autoFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g., Monthly rent payment" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.formState.errors.root?.serverError && (
                    <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.root.serverError.message}
                    </p>
                )}

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {initialData ? 'Update Transaction' : 'Add Transaction'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}