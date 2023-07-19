'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import * as z from "zod";
import axios from "axios";
import { Billboard } from "@prisma/client";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
    initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit billboard" : "Create billboard"
    const description = initialData ? "Edit your billboard" : "Add a new billboard"
    const toastMessage = initialData ? "Billboard updated" : "CBillboard created."
    const action = initialData ? "Save changes" : "Create"


    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true)
            axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            toast.success("Store Updated")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true)
            axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push("/")
            toast.success("Store Deleted")
        } catch (error) {
            toast.error("Make sure you removed all products and categories first")
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <AlertModal 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                { initialData && (
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}