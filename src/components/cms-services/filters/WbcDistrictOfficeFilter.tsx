import { useAppSelector } from '@/hooks';

const WbcDistrictOfficeFilter = () => {
  const { districts } = useAppSelector((state) => state.common);

  return (
    <div className="mt-2 p-2 md:p-1.5 md:px-4 text-sky-foreground text-xs tracking-widest flex flex-row justify-end items-center gap-2">
      <select
        className="flex h-9 max-w-[220px] w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
        name="district"
        id="district"
      >
        <option value="">- Select -</option>
        {districts?.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default WbcDistrictOfficeFilter;
