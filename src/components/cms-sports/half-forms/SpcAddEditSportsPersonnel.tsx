import WbcSubmitBtn from '@/components/cms-services/WbcSubmitBtn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { sportsList } from '@/constants';
import { updateSpCounter } from '@/features/commonSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { SportsPersonnelProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { useEffect, useRef, useState } from 'react';

const SpcAddEditSportsPersonnel = ({
  editId,
  setEditId,
}: {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    sport: '',
    name: '',
    address: '',
    dob: '',
    contactOne: '',
    contactTwo: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const dispatch = useAppDispatch();
  const { sportsPersonnel } = useAppSelector(
    (state) => state.spSportsPersonnel
  );
  const editData =
    editId &&
    (sportsPersonnel.find(
      (item) => item.id === editId
    ) as SportsPersonnelProps);
  const selectRef = useRef<HTMLSelectElement>(null);

  // ---------------------------------------

  useEffect(() => {
    if (editData) {
      setForm({
        ...form,
        sport: editData.sport || '',
        name: editData.name || '',
        address: editData.address || '',
        dob: editData.dob?.toString() || '',
        contactOne: editData.contact_1 || '',
        contactTwo: editData.contact_2 || '',
      });
    }
  }, [editData]);

  // ---------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === 'contactOne' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, contactOne: numberValue });
    }
    if (e.target.name === 'contactTwo' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, contactTwo: numberValue });
    }
  };

  // ---------------------------------------

  const resetError = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ---------------------------------------

  const resetForm = () => {
    setForm({
      ...form,
      sport: '',
      name: '',
      address: '',
      dob: '',
      contactOne: '',
      contactTwo: '',
    });
    setErrors(null);
    if (selectRef.current) selectRef.current.focus();
    setEditId(null);
  };

  // ---------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    if (!form.sport) {
      errorBag = { ...errorBag, sport: ['Sport is required'] };
      errorCount++;
    }
    if (!form.name.trim()) {
      errorBag = { ...errorBag, name: ['Name is required'] };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);

    const apiUrl = editId
      ? `/sports/sports-personnel/${editId}`
      : `/sports/sports-personnel`;
    const process = editId ? customFetch.put : customFetch.post;
    const msg = editId ? `Member details updated` : `Member details added`;
    try {
      const response = await process(apiUrl, data);

      if (response.status === 201 || response.status === 200) {
        showSuccess(msg);
        resetForm();
        dispatch(updateSpCounter());
        if (selectRef.current) selectRef.current.focus();
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
              Sport <span className="text-red-500">*</span>
            </Label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              name="sport"
              id="sport"
              value={form.sport}
              onChange={handleChange}
              ref={selectRef}
            >
              <option value="">- Select -</option>
              {sportsList
                .sort((a, b) => a.value.localeCompare(b.value))
                .map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
            <span className="text-red-500 text-xs -mt-1">
              {!form.sport && errors?.sport?.[0]}
            </span>
          </div>
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
              Address
            </Label>
            <Textarea
              name="address"
              id="address"
              placeholder="Enter address"
              value={form.address}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.address?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="dob" className="text-muted-foreground">
              Date of Birth
            </Label>
            <Input
              type="date"
              name="dob"
              id="dob"
              value={form.dob}
              onChange={handleChange}
              onKeyUp={resetError}
              max={new Date().toISOString().split('T')[0]}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.dob?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="contactOne" className="text-muted-foreground">
              Contact no. 1
            </Label>
            <Input
              type="text"
              name="contactOne"
              id="contactOne"
              placeholder="Enter contact no. 1"
              value={form.contactOne}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.department?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="contactTwo" className="text-muted-foreground">
              Contact no. 2
            </Label>
            <Input
              type="text"
              name="contactTwo"
              id="contactTwo"
              placeholder="Enter contact no. 2"
              value={form.contactTwo}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.contactTwo?.[0]}
            </span>
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
              text={editId ? `Update Details` : `Add Member`}
              customClass="cs-btn-success"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default SpcAddEditSportsPersonnel;
