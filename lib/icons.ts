import {
    ShieldCheck,
    FileText,
    Gavel,
    FolderOpenDot,
    ClipboardCheck,
    CheckCircle2,
    IdCard,
    Trophy,
    Award,
    BriefcaseBusiness,
    HeartHandshake,
    BadgeCheck,
    Scale,
    Users,
    HandHelping,
    CalendarClock,
    Phone,
    Building2,
    MapPin,
    Linkedin,
    Star,
    MessageSquareQuote,
    ArrowRight
} from "lucide-react";

export const IconMap: Record<string, any> = {
    ShieldCheck,
    FileText,
    Gavel,
    FolderOpenDot,
    ClipboardCheck,
    CheckCircle2,
    IdCard,
    Trophy,
    Award,
    BriefcaseBusiness,
    HeartHandshake,
    BadgeCheck,
    Scale,
    Users,
    HandHelping,
    CalendarClock,
    Phone,
    Building2,
    MapPin,
    Linkedin,
    Star,
    MessageSquareQuote,
    ArrowRight
};

export const getIcon = (name: string) => {
    return IconMap[name] || ShieldCheck;
};
