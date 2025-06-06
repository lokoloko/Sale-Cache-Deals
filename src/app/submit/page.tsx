// src/app/submit/page.tsx

// --- UI Component Imports ---
import SubmitDealForm from '@/components/deals/SubmitDealForm'; // The main form component for submitting deals.
import { Separator } from '@/components/ui/separator'; // Reusable Separator component for visual division.

// --- SubmitDealPage Component ---
/**
 * @page SubmitDealPage
 * @description This page allows users to submit new deals to the platform.
 * It primarily renders the SubmitDealForm component.
 */
export default function SubmitDealPage() {
  return (
    <div className="space-y-8"> {/* Outer container with vertical spacing. */}
      {/* Page Header Section */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Submit a Deal</h1>
        <p className="text-muted-foreground">
          Found a great deal? Share it with the GunDeals Navigator community! 
          Please provide as much detail as possible.
        </p>
      </header>
      <Separator /> {/* Visual separator between header and form. */}
      
      {/* Deal Submission Form */}
      {/* // 🔍 This component handles all the logic for deal submission, including form validation and AI suggestions. */}
      <SubmitDealForm />
    </div>
  );
}
