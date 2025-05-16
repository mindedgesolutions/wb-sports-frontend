import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import WbcSubmitBtn from '../WbcSubmitBtn';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateSrCounter } from '@/features/commonSlice';
import { NewsEventsProps } from '@/types/contents';
import { Textarea } from '@/components/ui/textarea';
import { newsEvemtsSchema } from '@/types/servicesSchema';
import { images, newsTypes } from '@/constants';

type FormProps = {
  type: string;
  title: string;
  description: string;
  eventDate: Date | string;
};

const WbcAddEditNewsEvents = ({
  editId,
  setEditId,
}: {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [form, setForm] = useState<FormProps>({
    type: '',
    title: '',
    description: '',
    eventDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [savedFile, setSavedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { newsEvents } = useAppSelector((state) => state.newsEvents);

  const editData: NewsEventsProps | 0 | null | undefined =
    newsEvents &&
    editId &&
    newsEvents.find((newsEvent: NewsEventsProps) => newsEvent.id === editId);

  // ---------------------------------------

  useEffect(() => {
    if (editData) {
      resetForm();
      setEditId(editData.id);
      setForm({
        type: editData.type || '',
        title: (editData as NewsEventsProps).title,
        description: (editData as NewsEventsProps).description || '',
        eventDate: (editData as NewsEventsProps).event_date || '',
      });
      setSavedFile((editData as NewsEventsProps).file_path || null);
    }
  }, [editId]);

  // ---------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------------

  const resetError = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrors({ ...errors, [e.currentTarget.name]: '' });
  };

  // ---------------------------------------

  const resetForm = () => {
    setForm({
      type: '',
      title: '',
      description: '',
      eventDate: '',
    });
    setFile(null);
    setSavedFile(null);
    setErrors({});
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ---------------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 512 * 1024) {
      setErrors({ ...errors, file: 'File size must be less than 512 KB' });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setFile(file);
  };

  // ---------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    const validate = { ...data, file, editId: editId || null };
    const validated = newsEvemtsSchema.safeParse(validate);
    const fieldErrors: Record<string, string> = {};
    if (!validated.success) {
      validated.error.issues.map(
        (issue) => (fieldErrors[issue.path[0]] = issue.message)
      );
      setErrors(fieldErrors);
      return;
    }
    if (file && file?.size > 0) {
      data = { ...data, file };
    }

    const api = editId ? `/news-events/update/${editId}` : `/news-events`;
    setIsLoading(true);
    try {
      const response = await customFetch.post(api, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201 || response.status === 200) {
        showSuccess(
          editId
            ? 'News / Event details updated successfully'
            : 'News / Event added successfully'
        );
        dispatch(updateSrCounter());
        resetForm();
      }
    } catch (error: any) {
      if (error.status === 400) {
        return setErrors(error?.response?.data?.message);
      }
      setErrors(error?.response?.data?.errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border p-2">
      <div className="bg-muted-foreground/10 text-muted-foreground p-2 text-base font-medium tracking-wider">
        {editId ? 'Edit news / form details' : 'Add news / form'}
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <fieldset disabled={isLoading}>
          <div className="mt-6">
            <div className="flex flex-col justify-start items-start gap-2 my-4">
              <Label htmlFor="type" className="text-muted-foreground">
                Type <span className="text-red-500">*</span>
              </Label>
              <select
                className="cs-select"
                name="type"
                id="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="">- Select -</option>
                {newsTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <span className="text-red-500 text-xs -mt-1">
                {!form.type && errors?.type}
              </span>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 my-4">
              <Label htmlFor="title" className="text-muted-foreground">
                Title <span className="text-red-500">*</span>
              </Label>
              <Textarea
                name="title"
                id="title"
                placeholder="News / Event title"
                value={form.title}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.title}
              </span>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 my-4">
              <Label htmlFor="description" className="text-muted-foreground">
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                placeholder="News / Event description"
                value={form.description}
                onChange={handleChange}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.description}
              </span>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 my-4">
              <Label htmlFor="eventDate" className="text-muted-foreground">
                Event date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="eventDate"
                id="eventDate"
                value={form.eventDate as string}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.eventDate}
              </span>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 my-4">
              <Label className="text-muted-foreground">
                Select a file{' '}
                {!!editId ? (
                  '(optional)'
                ) : (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                type="file"
                name="file"
                id="file"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <span className="text-red-500 text-xs -mt-1">
                {!file && errors?.file}
              </span>
              <div className="w-full flex justify-start items-start gap-2">
                {file ? (
                  <>
                    {file.type.startsWith('image/') && (
                      <img src={images.noImg} alt="file" className="h-10" />
                    )}
                    {file.type === 'application/pdf' && (
                      <img src={images.pdfIcon} alt="file" className="h-10" />
                    )}
                    {(file.type === 'application/msword' ||
                      file.type ===
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && (
                      <img src={images.docIcon} alt="file" className="h-10" />
                    )}
                  </>
                ) : savedFile ? (
                  <img src={images.attachBg} alt="file" className="h-10" />
                ) : null}
              </div>
            </div>
            <Separator />
            <div className="my-4 flex flex-row justify-between items-center">
              <Button
                type="button"
                variant="outline"
                className="cs-btn-reset"
                onClick={resetForm}
              >
                Reset
              </Button>
              <WbcSubmitBtn
                isLoading={isLoading}
                text="Upload"
                customClass="cs-btn-primary"
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
export default WbcAddEditNewsEvents;
