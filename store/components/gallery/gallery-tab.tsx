import Image from "next/image";
import { Tab } from "@headlessui/react";

import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";

interface GalleryTabProps {
    image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({
    image
}) => {
    return (
        <Tab
            className="
                relative
                flex
                items-center
                justify-center
                cursor-pointer
                aspect-square
                rounded-md
                bg-white
            "
        >
            {({ selected }) => (
                <div>
                    <span 
                        className="
                            absolute 
                            w-full 
                            h-full 
                            aspect-square 
                            inset-0 
                            overflow-hidden 
                            rounded-md"
                    >
                        <Image 
                            fill
                            alt=""
                            src={image.url}
                            className="object-cover object-center"
                        />
                    </span>
                    <span className={cn(
                        "absolute inset-0 rounded-md ring-2 ring-offset-2",
                        selected ? "ring-black" : "ring-transparent"
                    )} />
                </div>
            )}
        </Tab>
    );
}
 
export default GalleryTab;