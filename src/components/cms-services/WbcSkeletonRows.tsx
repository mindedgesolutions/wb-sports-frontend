import { Skeleton } from '@/components/ui/skeleton';

const WbcSkeletonRows = ({ count = 10 }: { count: number }) => {
  return Array.from({ length: count }, (_, index) => (
    <div className="mb-4" key={index + 1}>
      <Skeleton className="w-full h-8 rounded" />
    </div>
  ));
};
export default WbcSkeletonRows;
