import {
  AppContentWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  WbcFairProgrammPopover,
  WbcSubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fairTypes, titles } from '@/constants';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Editor from 'react-simple-wysiwyg';

const WbAddEditFairProgramme = () => {
  document.title = `Fairs & Programmes | Add New | ${titles.services} `;

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    occurance: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [description, setDescription] = useState<string | undefined>('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { slug } = useParams();

  // ---------------------------------------

  function onChange(e: { target: { value: string } }) {
    setDescription(e.target.value);
  }

  // ---------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------------

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ---------------------------------------

  const resetForm = () => {
    setForm({
      title: '',
      occurance: '',
    });
    setErrors(null);
    setDescription('');
  };

  // ---------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    if (!form.title) {
      errorBag = { ...errorBag, title: ['Title is required'] };
      errorCount++;
    }
    if (!form.occurance) {
      errorBag = { ...errorBag, occurance: ['Occurance is required'] };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, description: description ? description : '' };
    setIsLoading(true);
    try {
      const response = await customFetch.post(`/fair-programme/store`, data);

      let fuuid = '';
      if (response.status === 201 || response.status === 200) {
        resetForm();
        showSuccess('Fair / programme added');
        fuuid = response.data.uuid;
      }
      const redirect = pathname.includes('uuid')
        ? pathname
        : `${pathname}/${fuuid}`;
      navigate(redirect);
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        return setErrors((error as any)?.response?.data?.errors);
      }
      return showError(`Something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppMainWrapper>
      <AppTitleWrapper>Add new fair / programme</AppTitleWrapper>
      <AppContentWrapper>
        <div className="p-2 border border-muted-foreground/10 flex flex-col justify-start items-start">
          <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500">
            information
          </div>
          <form className="w-full mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 flex flex-col gap-2">
                  <Label
                    htmlFor="title"
                    className="capitalize text-muted-foreground"
                  >
                    title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={form.title}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs">
                    {errors?.title?.[0]}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="occurance"
                    className="capitalize text-muted-foreground"
                  >
                    occurance <span className="text-red-500">*</span>
                  </Label>
                  <select
                    className="flex h-9 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    name="occurance"
                    id="occurance"
                    value={form.occurance}
                    onChange={handleChange}
                  >
                    <option value="">- Select -</option>
                    {fairTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-xs">
                    {!form.occurance && errors?.occurance?.[0]}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="description"
                  className="capitalize text-muted-foreground"
                >
                  description <WbcFairProgrammPopover />
                </Label>
                <Editor
                  name="description"
                  id="description"
                  value={description}
                  onChange={onChange}
                  className="border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-52 w-full bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end items-center gap-4">
              <WbcSubmitBtn
                isLoading={isLoading}
                text="Save"
                customClass="cs-btn-primary"
              />
              <Button type="button" variant={'outline'} onClick={resetForm}>
                Reset
              </Button>
              <Link to={`/${titles.servicesUrl}/${slug}/fairs-programmes`}>
                <Button type="button" variant={'outline'} onClick={resetForm}>
                  Back to List
                </Button>
              </Link>
            </div>
          </form>
        </div>
        <div className="mt-4 p-2 border border-muted-foreground/10 flex flex-col justify-start items-start">
          <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500">
            photos
          </div>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbAddEditFairProgramme;
