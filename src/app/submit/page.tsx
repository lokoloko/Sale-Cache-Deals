import SubmitDealForm from '@/components/deals/SubmitDealForm';
import { Separator } from '@/components/ui/separator';

export default function SubmitDealPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Submit a Deal</h1>
        <p className="text-muted-foreground">
          Found a great deal? Share it with the GunDeals Navigator community! 
          Please provide as much detail as possible.
        </p>
      </header>
      <Separator />
      <SubmitDealForm />
    </div>
  );
}
