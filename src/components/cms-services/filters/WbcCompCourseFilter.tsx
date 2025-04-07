import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { compCourseTypes, titles } from '@/constants';
import { useAppSelector } from '@/hooks';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const WbcCompCourseFilter = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const selectedDist = searchParams.get('dist');
  const enteredS = searchParams.get('s');
  const [form, setForm] = useState({
    type: selectedDist || '',
    s: enteredS || '',
  });
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const slug = currentUser!.user_details.slug;
  const url = `/${titles.servicesUrl}/${slug}/computer-training/course-details`;

  // ---------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.type || form.s) {
      searchParams.delete('page');
      form.type
        ? searchParams.set('type', form.type)
        : searchParams.delete('type');
      form.s ? searchParams.set('s', form.s) : searchParams.delete('s');
    }
    navigate(`${url}?${searchParams.toString()}`);
  };

  // ---------------------------------

  const resetForm = () => {
    setForm({ ...form, type: '', s: '' });
    navigate(url);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="mt-2 p-2 md:px-0 text-sky-foreground text-xs tracking-widest grid grid-cols-5 gap-4">
        <select
          className="flex h-9 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-sky-foreground/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          name="type"
          id="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="">- Search by Course Type -</option>
          {compCourseTypes.map((course) => (
            <option key={course.value} value={course.value}>
              {course.label}
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
export default WbcCompCourseFilter;
