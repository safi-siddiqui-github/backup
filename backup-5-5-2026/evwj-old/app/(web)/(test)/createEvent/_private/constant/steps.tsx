import { SectionId } from "../types/types"
import { Camera, FileText, Puzzle, Settings } from 'lucide-react';


    export const sections = [
        {
            id: "details" as SectionId,
            title: "Essential Details",
            icon: <FileText className="h-5 w-5" />,
            isRequired: true,
        },
        {
            id: "photos" as SectionId,
            title: "Event Photos",
            icon: <Camera className="h-5 w-5" />,
            isRequired: false,
        },
        {
            id: "modules" as SectionId,
            title: "Features & Modules",
            icon: <Puzzle className="h-5 w-5" />,
            isRequired: false,
        },
        {
            id: "optional" as SectionId,
            title: "Optional Details",
            icon: <Settings className="h-5 w-5" />,
            isRequired: false,
        },
    ];
