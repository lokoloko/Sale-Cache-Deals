import type { Deal } from '@/lib/types';
import DealCard from './DealCard';

interface DealListProps {
  deals: Deal[];
}

const DealList: React.FC<DealListProps> = ({ deals }) => {
  if (!deals || deals.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No deals found. Check back later or adjust your filters!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default DealList;
