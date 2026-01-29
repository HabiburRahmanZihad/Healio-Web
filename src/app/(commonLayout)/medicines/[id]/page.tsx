import { medicineService } from "@/services/medicine.service";
import { MedicineDetailsClient } from "./medicine-details-client";
import { notFound } from "next/navigation";

interface MedicineDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function MedicineDetailsPage({ params }: MedicineDetailsPageProps) {
    const { id } = await params;
    const { data: medicine, error } = await medicineService.getMedicineById(id, {
        cache: "no-store",
    });

    if (error || !medicine) {
        notFound();
    }

    return <MedicineDetailsClient medicine={medicine} />;
}
