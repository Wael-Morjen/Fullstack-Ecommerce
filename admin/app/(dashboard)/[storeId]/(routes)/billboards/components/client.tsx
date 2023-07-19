'use client';

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

export const BillboardClient = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title="Billboard (0)"
                    description="Manage billboards of your store"
                />
                <Button>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add billboard
                </Button>
            </div>
            <Separator />
        </>
    )
}