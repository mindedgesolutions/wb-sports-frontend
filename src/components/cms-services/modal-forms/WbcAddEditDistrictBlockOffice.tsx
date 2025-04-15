import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Pencil } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import WbcSubmitBtn from '../WbcSubmitBtn';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import { updateSrCounter } from '@/features/commonSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import showSuccess from '@/utils/showSuccess';

type WbcAddEditCompCentreProps = {
  district: string | number | null;
  name: string;
  address: string;
  landline: string | number | undefined;
  email: string | undefined;
  mobile_1: string | number | undefined;
  mobile_2: string | number | undefined;
  officerName: string | undefined;
  officerDesignation: string;
  officerMobile: string | number | undefined;
};

const WbcAddEditDistrictBlockOffice = ({ editId }: { editId?: number }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<WbcAddEditCompCentreProps>({
    district: '',
    name: '',
    address: '',
    landline: '',
    email: '',
    mobile_1: '',
    mobile_2: '',
    officerName: '',
    officerDesignation: '',
    officerMobile: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const { districts } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const targetRef = useRef<HTMLSelectElement>(null);
  const { offices } = useAppSelector((state) => state.districtBlockOffices);
  const editData = editId && offices?.find((item) => item.id === editId);

  // ------------------------------------

  useEffect(() => {
    editData &&
      setForm({
        ...form,
        district: editData.district_id,
        name: editData.name,
        address: editData.address || '',
        landline: editData.landline_no || '',
        email: editData.email || '',
        mobile_1: editData.mobile_1 || '',
        mobile_2: editData.mobile_2 || '',
        officerName: editData.officer_name || '',
        officerDesignation: editData.officer_designation || '',
        officerMobile: editData.officer_mobile || '',
      });
    setErrors(null);
  }, [editId, open]);

  // ------------------------------------

  const openModal = () => {
    setOpen(!open);
  };

  // ------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === 'landline' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, landline: Number(numberValue) });
    }
    if (e.target.name === 'mobile_1' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, mobile_1: Number(numberValue) });
    }
    if (e.target.name === 'mobile_2' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, mobile_2: Number(numberValue) });
    }
    if (e.target.name === 'officerMobile' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, officerMobile: Number(numberValue) });
    }
  };

  // ------------------------------------

  const resetError = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ------------------------------------

  const resetForm = () => {
    setForm({
      ...form,
      district: '',
      name: '',
      address: '',
      landline: '',
      email: '',
      mobile_1: '',
      mobile_2: '',
      officerName: '',
      officerDesignation: '',
      officerMobile: '',
    });
    setErrors(null);
  };

  // ------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileFormat = /^[0-9]{10}$/;

    if (!form.district) {
      errorBag = { ...errorBag, district: ['District is required'] };
      errorCount++;
    }
    if (!form.name.trim()) {
      errorBag = { ...errorBag, name: ['Name of the office is required'] };
      errorCount++;
    }
    if (!form.address.trim()) {
      errorBag = { ...errorBag, address: ['Address is required'] };
      errorCount++;
    }
    if (!form.officerDesignation.trim()) {
      errorBag = {
        ...errorBag,
        officerDesignation: ['Officer designation is required'],
      };
      errorCount++;
    }
    if (form.email && !emailFormat.test(form.email)) {
      errorBag = { ...errorBag, email: ['Invalid email'] };
      errorCount++;
    }
    if (form.mobile_1 && !mobileFormat.test(form.mobile_1 as string)) {
      errorBag = { ...errorBag, mobile_1: ['Invalid mobile number'] };
      errorCount++;
    }
    if (form.mobile_2 && !mobileFormat.test(form.mobile_2 as string)) {
      errorBag = { ...errorBag, mobile_2: ['Invalid mobile number'] };
      errorCount++;
    }
    if (
      form.officerMobile &&
      !mobileFormat.test(form.officerMobile as string)
    ) {
      errorBag = { ...errorBag, officerMobile: ['Invalid mobile number'] };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    setIsLoading(true);
    const url = editId
      ? `/district-block-offices/${editId}`
      : `/district-block-offices`;
    const process = editId ? customFetch.put : customFetch.post;
    const msg = editId
      ? `District / Block office updated successfully`
      : `District / Block office added successfully`;

    try {
      const response = await process(url, data);
      if (response.status === 200 || response.status === 201) {
        resetForm();
        setOpen(false);
        dispatch(updateSrCounter());
        showSuccess(msg);
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        setErrors((error as any)?.response?.data?.errors);
      }
      showError(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        {editId ? (
          <Pencil className="h-4 text-yellow-500 duration-200 cursor-pointer" />
        ) : (
          <Button
            size={'sm'}
            className={cn('cs-btn-primary')}
            onClick={() => openModal}
          >
            Add centre
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:min-w-xl">
        <ScrollArea className="sm:max-w-xl max-h-[600px] pr-4 m-0">
          <DialogHeader>
            <DialogTitle>
              {editId ? `Edit details` : `Add new district / block office`}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="district" className="text-muted-foreground">
                    District <span className="text-red-500">*</span>
                  </Label>
                  <select
                    className="flex h-10 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    name="district"
                    id="district"
                    value={form.district as number}
                    onChange={handleChange}
                    ref={targetRef}
                  >
                    <option value="">- Select -</option>
                    {districts?.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-xs -mt-1">
                    {!form.district && errors?.district?.[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="name" className="text-muted-foreground">
                Office name <span className="text-red-500">*</span>
              </Label>
              <Input
                name="name"
                id="name"
                placeholder="Enter office name"
                value={form.name}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.name?.[0]}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="address" className="text-muted-foreground">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                name="address"
                id="address"
                placeholder="Enter office address"
                value={form.address}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.address?.[0]}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="landline" className="text-muted-foreground">
                    Landline no.
                  </Label>
                  <Input
                    name="landline"
                    id="landline"
                    placeholder="Enter landline no."
                    value={form.landline}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.landline?.[0]}
                  </span>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="email" className="text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    name="email"
                    id="email"
                    placeholder="Enter office email"
                    value={form.email}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.email?.[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="mobile_1" className="text-muted-foreground">
                    Office mobile no. 1
                  </Label>
                  <Input
                    name="mobile_1"
                    id="mobile_1"
                    placeholder="Enter office mobile no. 1 (if any)"
                    value={form.mobile_1}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.mobile_1?.[0]}
                  </span>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="mobile_2" className="text-muted-foreground">
                    Office mobile no. 2
                  </Label>
                  <Input
                    name="mobile_2"
                    id="mobile_2"
                    placeholder="Enter office mobile no. 2 (if any)"
                    value={form.mobile_2}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.mobile_2?.[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="officerName" className="text-muted-foreground">
                Officer's name
              </Label>
              <Input
                name="officerName"
                id="officerName"
                placeholder="Enter officer's name"
                value={form.officerName}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.officerName?.[0]}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label
                htmlFor="officerDesignation"
                className="text-muted-foreground"
              >
                Officer's designation <span className="text-red-500">*</span>
              </Label>
              <Input
                name="officerDesignation"
                id="officerDesignation"
                placeholder="Enter office's designation"
                value={form.officerDesignation}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.officerDesignation?.[0]}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="officerMobile"
                    className="text-muted-foreground"
                  >
                    Officer's mobile no.
                  </Label>
                  <Input
                    name="officerMobile"
                    id="officerMobile"
                    placeholder="Enter office's designation"
                    value={form.officerMobile}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.officerMobile?.[0]}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-row justify-between items-center">
              <Button
                variant={'outline'}
                type="button"
                className="cs-btn-reset"
                onClick={resetForm}
              >
                Reset
              </Button>
              <WbcSubmitBtn
                isLoading={isLoading}
                text={editId ? `Update` : `Add Details`}
                customClass="cs-btn-primary"
              />
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default WbcAddEditDistrictBlockOffice;
