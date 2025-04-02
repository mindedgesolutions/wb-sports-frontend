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
import { compCentreCategory } from '@/constants';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import { updateSrCounter } from '@/features/commonSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import showSuccess from '@/utils/showSuccess';

type WbcAddEditCompCentreProps = {
  district: string | number | null;
  yctcName: string;
  yctcCode: string | null;
  centreCategory: string | null;
  address1: string | null;
  address2: string | null;
  address3: string | null;
  city: string | null;
  pincode: string | number | null;
  inchargeName: string | null;
  inchargeMobile: string | number | null;
  inchargeEmail: string | null;
  ownerName: string | null;
  ownerMobile: string | number | null;
};

const WbcAddEditCompCentre = ({ editId }: { editId?: number }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<WbcAddEditCompCentreProps>({
    district: '',
    yctcName: '',
    yctcCode: '',
    centreCategory: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    pincode: '',
    inchargeName: '',
    inchargeMobile: '',
    inchargeEmail: '',
    ownerName: '',
    ownerMobile: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const { districts } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const targetRef = useRef<HTMLSelectElement>(null);
  const { compCentres } = useAppSelector((state) => state.compCourses);
  const editData = editId && compCentres?.find((item) => item.id === editId);

  // ------------------------------------

  useEffect(() => {
    editData &&
      setForm({
        ...form,
        district: editData.district_id,
        yctcName: editData.yctc_name,
        yctcCode: editData?.yctc_code,
        centreCategory: editData?.center_category,
        address1: editData?.address_line_1,
        address2: editData?.address_line_2,
        address3: editData?.address_line_3,
        city: editData?.city,
        pincode: editData?.pincode,
        inchargeName: editData?.center_incharge_name,
        inchargeMobile: editData?.center_incharge_mobile,
        inchargeEmail: editData?.center_incharge_email,
        ownerName: editData?.center_owner_name,
        ownerMobile: editData?.center_owner_mobile,
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

    if (e.target.name === 'pincode' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, pincode: Number(numberValue) });
    }
    if (e.target.name === 'inchargeMobile' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, inchargeMobile: Number(numberValue) });
    }
    if (e.target.name === 'ownerMobile' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, ownerMobile: Number(numberValue) });
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
      yctcName: '',
      yctcCode: '',
      centreCategory: '',
      address1: '',
      address2: '',
      address3: '',
      city: '',
      pincode: '',
      inchargeName: '',
      inchargeMobile: '',
      inchargeEmail: '',
      ownerName: '',
      ownerMobile: '',
    });
    setErrors(null);
  };

  // ------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!form.district) {
      errorBag = { ...errorBag, district: ['District is required'] };
      errorCount++;
    }
    if (!form.yctcName) {
      errorBag = { ...errorBag, yctcName: ['YCTC name is required'] };
      errorCount++;
    }
    if (!form.address1) {
      errorBag = { ...errorBag, address1: ['Address line 1 is required'] };
      errorCount++;
    }
    if (form.pincode && form.pincode.toString().length !== 6) {
      errorBag = { ...errorBag, pincode: ['PIN code must be 6 digits'] };
      errorCount++;
    }
    if (form.inchargeMobile && form.inchargeMobile.toString().length !== 10) {
      errorBag = {
        ...errorBag,
        inchargeMobile: ['Mobile number must be 10 digits'],
      };
      errorCount++;
    }
    if (form.inchargeEmail && !regexEmail.test(form.inchargeEmail.toString())) {
      errorBag = { ...errorBag, inchargeEmail: ['Invalid email ID'] };
      errorCount++;
    }
    if (form.ownerMobile && form.ownerMobile.toString().length !== 10) {
      errorBag = {
        ...errorBag,
        ownerMobile: ['Mobile number must be 10 digits'],
      };
      errorCount++;
    }

    if (errorCount > 0) {
      if (targetRef.current) {
        targetRef.current.focus();
      }
      setErrors(errorBag);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const apiUrl = editId ? `/comp-centres/${editId}` : `/comp-centres`;
    const method = editId ? customFetch.put : customFetch.post;
    const msg = editId ? `Updated` : `Added`;
    const successMsg = `Centre ${msg} successfully!`;

    setIsLoading(true);
    try {
      const response = await method(apiUrl, data);

      if (response.status === 201 || response.status === 200) {
        resetForm();
        openModal();
        dispatch(updateSrCounter());
        showSuccess(successMsg);
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
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        {editId ? (
          <Pencil className="h-4 group-hover:text-yellow-500 duration-200 cursor-pointer" />
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
              {editId ? `Edit details` : `Add new centre`}
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
                <div className="col-span-1"></div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="yctcName" className="text-muted-foreground">
                YCTC name <span className="text-red-500">*</span>
              </Label>
              <Input
                name="yctcName"
                id="yctcName"
                placeholder="Enter YCTC name"
                value={form.yctcName}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.yctcName?.[0]}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="yctcCode" className="text-muted-foreground">
                    YCTC code
                  </Label>
                  <Input
                    name="yctcCode"
                    id="yctcCode"
                    placeholder="Enter YCTC code"
                    value={form.yctcCode || ''}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.yctcCode?.[0]}
                  </span>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="centreCategory"
                    className="text-muted-foreground"
                  >
                    Centre category
                  </Label>
                  <select
                    className="flex h-10 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    name="centreCategory"
                    id="centreCategory"
                    value={form.centreCategory || ''}
                    onChange={handleChange}
                  >
                    <option value="">- Select -</option>
                    {compCentreCategory.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-xs -mt-1">
                    {!form.centreCategory && errors?.centreCategory?.[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="address1" className="text-muted-foreground">
                Address line 1 <span className="text-red-500">*</span>
              </Label>
              <Input
                name="address1"
                id="address1"
                placeholder="Enter address line 1 (mandatory)"
                value={form.address1 || ''}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.address1?.[0]}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="address2" className="text-muted-foreground">
                Address line 2
              </Label>
              <Input
                name="address2"
                id="address2"
                placeholder="Enter address line 2 (if any)"
                value={form.address2 || ''}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.address2?.[0]}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="address3" className="text-muted-foreground">
                Address line 3
              </Label>
              <Input
                name="address3"
                id="address3"
                placeholder="Enter address line 3 (if any)"
                value={form.address3 || ''}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors?.address3?.[0]}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="city" className="text-muted-foreground">
                    City
                  </Label>
                  <Input
                    name="city"
                    id="city"
                    placeholder="Enter city"
                    value={form.city || ''}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.city?.[0]}
                  </span>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="pincode" className="text-muted-foreground">
                    PIN code
                  </Label>
                  <Input
                    name="pincode"
                    id="pincode"
                    placeholder="Enter PIN code"
                    value={form.pincode || ''}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.pincode?.[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="inchargeName"
                    className="text-muted-foreground"
                  >
                    Centre inchage name
                  </Label>
                  <Input
                    name="inchargeName"
                    id="inchargeName"
                    placeholder="Enter centre incharge name"
                    value={form.inchargeName || ''}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.inchargeName?.[0]}
                  </span>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="inchargeMobile"
                    className="text-muted-foreground"
                  >
                    Centre incharge contact no.
                  </Label>
                  <Input
                    name="inchargeMobile"
                    id="inchargeMobile"
                    placeholder="Enter centre incharge mobile no."
                    value={form.inchargeMobile || ''}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.inchargeMobile?.[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="inchargeEmail"
                    className="text-muted-foreground"
                  >
                    Centre inchage email ID
                  </Label>
                  <Input
                    name="inchargeEmail"
                    id="inchargeEmail"
                    placeholder="Enter centre incharge email ID"
                    value={form.inchargeEmail || ''}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.inchargeEmail?.[0]}
                  </span>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-2"></div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="ownerName" className="text-muted-foreground">
                    Centre owner name
                  </Label>
                  <Input
                    name="ownerName"
                    id="ownerName"
                    placeholder="Enter centre owner name"
                    value={form.ownerName || ''}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.ownerName?.[0]}
                  </span>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="ownerMobile"
                    className="text-muted-foreground"
                  >
                    Centre owner contact no.
                  </Label>
                  <Input
                    name="ownerMobile"
                    id="ownerMobile"
                    placeholder="Enter centre owner mobile no."
                    value={form.ownerMobile || ''}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors?.ownerMobile?.[0]}
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
export default WbcAddEditCompCentre;
