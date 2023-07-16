'use client';

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        } 
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <Modal
            title="Create Store"
            description="Create a new store."
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control} 
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="E-commerce" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-x-2 pt-6 flex items-center justify-end w-full">
                                <Button 
                                    variant="outline" 
                                    onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}