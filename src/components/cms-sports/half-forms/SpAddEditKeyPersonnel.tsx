import WbcSubmitBtn from '@/components/cms-services/WbcSubmitBtn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { updateSpCounter } from '@/features/commonSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const SpAddEditKeyPersonnel = ({
  editId,
  setEditId,
}: {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    rank: '',
    designation: '',
    department: 'Department of Youth Services and Sports',
    govt: 'Govt. of West Bengal',
  });
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const dispatch = useAppDispatch();
  const { keyPersonnel } = useAppSelector((state) => state.spKeyPersonnel);
  const editData = editId && keyPersonnel.find((item) => item.id === editId);

  // ---------------------------------------

  useEffect(() => {
    if (editData) {
      setForm({
        ...form,
        name: editData.name || '',
        rank: editData.rank || '',
        designation: editData.designation || '',
        department: editData.department || '',
        govt: editData.govt || '',
      });
    }
  }, [editData]);

  // ---------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, profileImg: [] });
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors({
        ...errors,
        profileImg: ['Invalid file type. Allowed: jpeg, png, jpg, webp'],
      });
      setProfileImg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > 100 * 1024) {
      setErrors({
        ...errors,
        profileImg: ['File size must be less than 100 KB'],
      });
      setProfileImg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setProfileImg(file);
  };

  // ------------------------------

  const clearImage = () => {
    setProfileImg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ---------------------------------------

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ---------------------------------------

  const resetForm = () => {
    setForm({
      ...form,
      name: '',
      rank: '',
      designation: '',
    });
    setProfileImg(null);
    setErrors(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setEditId(null);
  };

  // ---------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    if (!form.name.trim()) {
      errorBag = { ...errorBag, name: ['Name is required'] };
      errorCount++;
    }
    if (!form.designation.trim()) {
      errorBag = { ...errorBag, designation: ['Designation is required'] };
      errorCount++;
    }
    if (!form.department.trim()) {
      errorBag = { ...errorBag, department: ['Department is required'] };
      errorCount++;
    }
    if (!form.govt.trim()) {
      errorBag = { ...errorBag, govt: ['Government is required'] };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = profileImg ? { ...data, profileImg: profileImg } : data;

    const apiUrl = editId
      ? `/sports/key-personnel/update/${editId}`
      : `/sports/key-personnel`;
    const msg = editId ? `Member details updated` : `Member details added`;
    try {
      const response = await customFetch.post(apiUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status === 200) {
        showSuccess(msg);
        resetForm();
        dispatch(updateSpCounter());
      }
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
    <div className="border p-2">
      <div className="bg-muted-foreground/10 text-muted-foreground p-2 text-base font-medium tracking-wider">
        {editId ? `Update details` : `Add details`}
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-6">
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="name" className="text-muted-foreground">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.name?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="name" className="text-muted-foreground">
              Rank
            </Label>
            <Input
              type="text"
              name="rank"
              id="rank"
              placeholder="Enter rank"
              value={form.rank}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.rank?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="designation" className="text-muted-foreground">
              Designation <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="designation"
              id="designation"
              placeholder="Enter designation"
              value={form.designation}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.designation?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="department" className="text-muted-foreground">
              Department <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="department"
              id="department"
              placeholder="Enter department"
              value={form.department}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.department?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="govt" className="text-muted-foreground">
              Government <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="govt"
              id="govt"
              placeholder="Enter govt."
              value={form.govt}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.govt?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="govt" className="text-muted-foreground">
              Upload a photo
            </Label>
            <Input
              type="file"
              name="profileImg"
              id="profileImg"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <span className="text-red-500 text-xs -mt-1">
              {!profileImg && errors?.profileImg?.[0]}
            </span>
            <div className="w-full flex justify-start items-start gap-2">
              <div className="w-24 h-28 border border-dashed flex justify-center items-center">
                {profileImg ? (
                  <img
                    src={URL.createObjectURL(profileImg)}
                    alt="slider"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-sm text-center font-extralight tracking-widest">
                    preview
                  </p>
                )}
              </div>
              {profileImg && (
                <Button variant="ghost" onClick={clearImage}>
                  <X className="text-red-500 h-8" />
                </Button>
              )}
            </div>
          </div>
          <Separator />
          <div className="my-4 flex flex-row justify-between items-center">
            <Button
              type="button"
              variant="outline"
              className="cs-btn-reset"
              onClick={resetForm}
              tabIndex={-1}
            >
              Reset
            </Button>
            <WbcSubmitBtn
              isLoading={isLoading}
              text={editId ? `Update Details` : `Add Person`}
              customClass="cs-btn-success"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default SpAddEditKeyPersonnel;
