import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { compCentreCategory, titles } from '@/constants';
import { useAppSelector } from '@/hooks';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const WbcCompCentresFilter = () => {
  const { districts } = useAppSelector((state) => state.common);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const selectedDist = searchParams.get('dist');
  const selectedCat = searchParams.get('cat');
  const enteredS = searchParams.get('s');
  const [form, setForm] = useState({
    dist: selectedDist || '',
    cat: selectedCat || '',
    s: enteredS || '',
  });
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const slug = currentUser?.user_details?.slug;
  const url = `/${titles.servicesUrl}/${slug}/computer-training/training-centres`;

  // ---------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.dist || form.cat || form.s) {
      searchParams.delete('page');
      form.dist
        ? searchParams.set('dist', form.dist)
        : searchParams.delete('dist');
      form.cat ? searchParams.set('cat', form.cat) : searchParams.delete('cat');
      form.s ? searchParams.set('s', form.s) : searchParams.delete('s');
    }
    navigate(`${url}?${searchParams.toString()}`);
  };

  // ---------------------------------

  const resetForm = () => {
    setForm({ ...form, dist: '', cat: '', s: '' });
    navigate(url);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="mt-2 p-2 md:px-0 text-sky-foreground text-xs tracking-widest grid grid-cols-5 gap-4">
        <select
          className="flex h-9 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          name="dist"
          id="dist"
          value={form.dist}
          onChange={handleChange}
        >
          <option value="">- Search by District -</option>
          {districts?.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
        <select
          className="flex h-9 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          name="cat"
          id="cat"
          value={form.cat}
          onChange={handleChange}
        >
          <option value="">- Search by Category -</option>
          {compCentreCategory.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <Input
          className="w-full h-9 placeholder:text-sky-foreground/50"
          name="s"
          id="s"
          value={form.s}
          onChange={handleChange}
          placeholder="Search by anything ..."
        />
        <div className="flex gap-2">
          <Button type="submit" variant={'secondary'}>
            Search
          </Button>
          <Button type="button" variant={'ghost'} onClick={resetForm}>
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};
export default WbcCompCentresFilter;
