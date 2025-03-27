import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useEffect, useRef, useState } from 'react';
import WbcSubmitBtn from '../WbcSubmitBtn';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateSrCounter } from '@/features/commonSlice';
import showError from '@/utils/showError';
import { CompSyllabusProps } from '@/types/contents';
import { images } from '@/constants';
import { handleDownload } from '@/utils/function';

const WbcAddEditCompSyllabus = ({
  editId,
  setEditId,
}: {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ syllabusName: '' });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const dispatch = useAppDispatch();
  const { syllabi } = useAppSelector((state) => state.compCourses);
  const editData: CompSyllabusProps | undefined = editId
    ? syllabi.find((item: CompSyllabusProps) => item.id === editId)
    : undefined;

  // ------------------------------------

  useEffect(() => {
    if (editData) {
      setForm({
        syllabusName: (editData as CompSyllabusProps).name ?? null,
      });
    }
  }, [editId]);

  // ------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrors({
        ...errors,
        file: ['Invalid file type. Allowed: pdf only'],
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > 1024 * 1024) {
      setErrors({ ...errors, file: ['File size must be less than 1 MB'] });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setFile(file);
  };

  // ------------------------------------

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ------------------------------------

  const resetForm = () => {
    setForm({ ...form, syllabusName: '' });
    setFile(null);
    setErrors(null);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    if (!form.syllabusName.trim()) {
      errorBag = { ...errorBag, syllabusName: ['Syllabus name is required'] };
      errorCount++;
    }
    if (!file && !editId) {
      errorBag = { ...errorBag, file: ['PDF file is required'] };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);
    const data = new FormData();
    data.append('syllabusName', form.syllabusName);
    file ? data.append('file', file as File) : null;

    const apiUrl = editId
      ? `/comp-syllabus/update/${editId}`
      : `/comp-syllabus`;
    const msg = editId ? 'Syllabus updated' : 'Syllabus added';
    try {
      const response = await customFetch.post(apiUrl, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201 || response.status === 200) {
        resetForm();
        showSuccess(msg);
        dispatch(updateSrCounter());
      }
    } catch (error) {
      console.log(error);
      if ((error as any).response?.status === 400) {
        return setErrors((error as any).response.data.errors);
      }
      return showError(`Something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border p-2">
      <div className="bg-muted-foreground/10 text-muted-foreground p-2 text-base font-medium tracking-wider">
        Add new banner
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="syllabusName" className="text-muted-foreground">
              Syllabus name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="syllabusName"
              id="syllabusName"
              value={form.syllabusName}
              onChange={handleChange}
              onKeyUp={resetError}
              placeholder="A fitting syllabus name"
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.syllabusName?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <div className="flex flex-row gap-2">
              <Label htmlFor="file" className="text-muted-foreground">
                Select a PDF{' '}
                {!!editId ? (
                  '(optional)'
                ) : (
                  <span className="text-red-500">*</span>
                )}
              </Label>
            </div>
            <Input
              type="file"
              name="file"
              id="file"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <span className="text-red-500 text-xs -mt-1">
              {!file && errors?.file?.[0]}
            </span>
          </div>
          {editId && (
            <div className="w-full flex justify-start items-start gap-2">
              <div className="w-full h-20 flex justify-start items-start">
                <img
                  src={images.pdfIcon}
                  alt="banner"
                  className="h-16 object-cover cursor-pointer"
                  onClick={() =>
                    handleDownload({
                      filePath: editData!.file_path,
                      fileName: editData!.name,
                    })
                  }
                />
              </div>
            </div>
          )}

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
      </form>
    </div>
  );
};
export default WbcAddEditCompSyllabus;
