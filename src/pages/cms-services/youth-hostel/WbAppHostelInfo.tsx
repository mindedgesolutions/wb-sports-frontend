import {
  AppContentWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  WbcSubmitBtn,
  WbPageLoader,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { titles } from '@/constants';
import { useAppSelector } from '@/hooks';
import { YouthHostelProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  Link,
  LoaderFunction,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';

type FormProps = {
  name: string;
  district: number | string;
  address: string;
  phone1: string | number | undefined;
  phone2: string | number;
  email: string;
  accommodation: string | undefined;
  howtoReach: string;
  railwayStation: string;
  busStop: string;
  airport: string;
  network: string;
  remarks: string;
};

const WbAppHostelInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<FormProps>({
    name: '',
    district: '',
    address: '',
    phone1: '',
    phone2: '',
    email: '',
    accommodation: '',
    howtoReach: '',
    railwayStation: '',
    busStop: '',
    airport: '',
    network: '',
    remarks: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [hostelImg, setHostelImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { slug, uuid } = useParams();
  const { districts } = useAppSelector((state) => state.common);
  const { hostelData }: { hostelData: YouthHostelProps | null } =
    useLoaderData();
  const [dbHostelImg, setDbHostelImg] = useState<string | null>(null);
  const navigate = useNavigate();

  document.title =
    (uuid ? `${hostelData?.name} | Edit Details` : `Youth Hostel | Add New`) +
    ` | ${titles.services}`;

  // --------------------------------

  useEffect(() => {
    if (uuid && hostelData) {
      setForm({
        name: hostelData?.name,
        district: hostelData?.district_id ?? '',
        address: hostelData?.address ?? '',
        phone1: hostelData?.phone_1 ?? '',
        phone2: hostelData?.phone_2 ?? '',
        email: hostelData?.email ?? '',
        accommodation: hostelData?.accommodation ?? '',
        howtoReach: hostelData?.how_to_reach ?? '',
        railwayStation: hostelData?.railway_station ?? '',
        busStop: hostelData?.bus_stop ?? '',
        airport: hostelData?.airport ?? '',
        network: hostelData?.road_network ?? '',
        remarks: hostelData?.remarks ?? '',
      });
      setDbHostelImg(hostelData?.hostel_img ?? null);
    }
  }, [uuid]);

  // --------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === 'phone1' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, phone1: Number(numberValue) });
    }
    if (e.target.name === 'phone2' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, phone2: Number(numberValue) });
    }
  };

  // ---------------------------------------

  const resetError = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ---------------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors({
        ...errors,
        cover: ['Invalid file type. Allowed: jpeg, png, jpg, webp'],
      });
      setHostelImg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > 100 * 1024) {
      setErrors({ ...errors, cover: ['File size must be less than 100 KB'] });
      setHostelImg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setHostelImg(file);
  };

  // ---------------------------------------

  const clearImg = () => {
    setHostelImg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrors({ ...errors, cover: [] });
  };

  // ---------------------------------------

  const resetForm = () => {
    if (!uuid) {
      setForm({
        name: '',
        district: '',
        address: '',
        phone1: '',
        phone2: '',
        email: '',
        accommodation: '',
        howtoReach: '',
        railwayStation: '',
        busStop: '',
        airport: '',
        network: '',
        remarks: '',
      });
      setErrors(null);
      setHostelImg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      setForm({
        name: hostelData?.name ?? '',
        district: hostelData?.district_id ?? '',
        address: hostelData?.address ?? '',
        phone1: hostelData?.phone_1 ?? '',
        phone2: hostelData?.phone_2 ?? '',
        email: hostelData?.email ?? '',
        accommodation: hostelData?.accommodation ?? '',
        howtoReach: hostelData?.how_to_reach ?? '',
        railwayStation: hostelData?.railway_station ?? '',
        busStop: hostelData?.bus_stop ?? '',
        airport: hostelData?.airport ?? '',
        network: hostelData?.road_network ?? '',
        remarks: hostelData?.remarks ?? '',
      });
      setDbHostelImg(hostelData?.hostel_img ?? null);
      setErrors(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ---------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!form.name.trim()) {
      errorBag = { ...errorBag, name: ['Name is required'] };
      errorCount++;
    }
    if (!form.district) {
      errorBag = { ...errorBag, district: ['District is required'] };
      errorCount++;
    }
    if (!form.address.trim()) {
      errorBag = { ...errorBag, address: ['Address is required'] };
      errorCount++;
    }
    if (!form.railwayStation.trim()) {
      errorBag = { ...errorBag, phone1: ['Phone no. 1 is required'] };
      errorCount++;
    }
    if (form.phone1 && form.phone1.toString().length !== 10) {
      errorBag = { ...errorBag, phone1: ['Phone no. 1 must be 10 digits'] };
      errorCount++;
    }
    if (form.phone2 && form.phone2.toString().length !== 10) {
      errorBag = { ...errorBag, phone2: ['Phone no. 2 must be 10 digits'] };
      errorCount++;
    }
    if (form.email && !regexEmail.test(form.email)) {
      errorBag = { ...errorBag, email: ['Invalid email address'] };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = hostelImg ? { ...data, hostelImg: hostelImg } : data;
    const apiUrl = uuid
      ? `/youth-hostels/update/${hostelData?.id}`
      : `/youth-hostels`;
    const msg = uuid ? 'updated' : 'added';

    setIsLoading(true);
    try {
      const response = await customFetch.post(apiUrl, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200 || response.status === 201) {
        resetForm();
        showSuccess(`Youth hostel ${msg}`);
        if (response.status === 200) navigate(-1);
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        return setErrors((error as any)?.response?.data?.errors);
      }
      return showError(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppMainWrapper>
      {isLoading && <WbPageLoader />}
      <AppTitleWrapper>Add new Youth Hostel</AppTitleWrapper>
      <AppContentWrapper>
        <div className="p-2 border border-muted-foreground/10 flex flex-col justify-start items-start">
          <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
            <div className="w-full grid grid-cols-3 grid-flow-row gap-6">
              <div className="col-span-2">
                <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500 mb-4">
                  information
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 flex flex-col gap-2">
                      <Label
                        htmlFor="name"
                        className="capitalize text-muted-foreground"
                      >
                        name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        value={form.name}
                        onChange={handleChange}
                        onKeyUp={resetError}
                      />
                      <span className="text-red-500 text-xs">
                        {errors?.name?.[0]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="district"
                        className="capitalize text-muted-foreground"
                      >
                        district <span className="text-red-500">*</span>
                      </Label>
                      <select
                        className="flex h-9 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        name="district"
                        id="district"
                        value={form.district}
                        onChange={handleChange}
                      >
                        <option value="">- Select -</option>
                        {districts.map((dist) => (
                          <option key={dist.id} value={dist.id}>
                            {dist.name}
                          </option>
                        ))}
                      </select>
                      <span className="text-red-500 text-xs">
                        {!form.district && errors?.district?.[0]}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 flex flex-col gap-2">
                      <Label
                        htmlFor="address"
                        className="capitalize text-muted-foreground"
                      >
                        address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        value={form.address}
                        onChange={handleChange}
                        onKeyUp={resetError}
                      />
                      <span className="text-red-500 text-xs">
                        {errors?.address?.[0]}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="phone1"
                        className="capitalize text-muted-foreground"
                      >
                        phone no. 1
                      </Label>
                      <Input
                        type="text"
                        id="phone1"
                        name="phone1"
                        placeholder="Enter phone no. 1"
                        value={form.phone1}
                        onChange={handleChange}
                        onKeyUp={resetError}
                      />
                      <span className="text-red-500 text-xs">
                        {errors?.phone1?.[0]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="phone2"
                        className="capitalize text-muted-foreground"
                      >
                        phone no. 2
                      </Label>
                      <Input
                        type="text"
                        id="phone2"
                        name="phone2"
                        placeholder="Enter phone no. 2"
                        value={form.phone2}
                        onChange={handleChange}
                        onKeyUp={resetError}
                      />
                      <span className="text-red-500 text-xs">
                        {errors?.phone2?.[0]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="email"
                        className="capitalize text-muted-foreground"
                      >
                        email
                      </Label>
                      <Input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                        onKeyUp={resetError}
                      />
                      <span className="text-red-500 text-xs">
                        {errors?.email?.[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="accommodation"
                      className="capitalize text-muted-foreground"
                    >
                      type<span className="lowercase">of</span>accommodation
                    </Label>
                    <Textarea
                      id="accommodation"
                      name="accommodation"
                      placeholder="Enter type of accommodation"
                      value={form.accommodation}
                      onChange={handleChange}
                      onKeyUp={resetError}
                    />
                    <span className="text-red-500 text-xs">
                      {errors?.accommodation?.[0]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="howtoReach"
                      className="capitalize text-muted-foreground"
                    >
                      how<span className="lowercase">to</span>reach
                    </Label>
                    <Input
                      id="howtoReach"
                      name="howtoReach"
                      placeholder="Enter how to reach"
                      value={form.howtoReach}
                      onChange={handleChange}
                      onKeyUp={resetError}
                    />
                    <span className="text-red-500 text-xs">
                      {errors?.howtoReach?.[0]}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="railwayStation"
                        className="capitalize text-muted-foreground"
                      >
                        nearest railway station{' '}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="railwayStation"
                        name="railwayStation"
                        placeholder="Enter nearest railway station"
                        value={form.railwayStation}
                        onChange={handleChange}
                        onKeyUp={resetError}
                      />
                      <span className="text-red-500 text-xs">
                        {errors?.railwayStation?.[0]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="busStop"
                        className="capitalize text-muted-foreground"
                      >
                        nearest bus stop
                      </Label>
                      <Input
                        type="text"
                        id="busStop"
                        name="busStop"
                        placeholder="Enter nearest bus stop"
                        value={form.busStop}
                        onChange={handleChange}
                        onKeyUp={resetError}
                      />
                      <span className="text-red-500 text-xs">
                        {errors?.busStop?.[0]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="airport"
                        className="capitalize text-muted-foreground"
                      >
                        nearest airport
                      </Label>
                      <Input
                        type="text"
                        id="airport"
                        name="airport"
                        placeholder="Enter nearest airport"
                        value={form.airport}
                        onChange={handleChange}
                        onKeyUp={resetError}
                      />
                      <span className="text-red-500 text-xs">
                        {errors?.airport?.[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="network"
                      className="capitalize text-muted-foreground"
                    >
                      road transportation network
                    </Label>
                    <Input
                      id="network"
                      name="network"
                      placeholder="Enter road transportation network"
                      value={form.network}
                      onChange={handleChange}
                      onKeyUp={resetError}
                    />
                    <span className="text-red-500 text-xs">
                      {errors?.network?.[0]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="remarks"
                      className="capitalize text-muted-foreground"
                    >
                      remarks
                    </Label>
                    <Input
                      id="remarks"
                      name="remarks"
                      placeholder="Enter remarks"
                      value={form.remarks}
                      onChange={handleChange}
                      onKeyUp={resetError}
                    />
                    <span className="text-red-500 text-xs">
                      {errors?.remarks?.[0]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500 mb-4">
                  cover photo
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="text-muted-foreground">
                      Select a cover photo
                    </Label>
                    <Input
                      type="file"
                      id="hostelImg"
                      name="hostelImg"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                    <span className="text-red-500 text-xs">
                      {errors?.cover?.[0]}
                    </span>
                  </div>
                  <div className="flex flex-row justify-start items-start">
                    <div className="w-40 h-44 border border-dashed flex justify-center items-center">
                      {hostelImg ? (
                        <img
                          src={URL.createObjectURL(hostelImg)}
                          alt="cover"
                          className="w-full h-full object-cover"
                        />
                      ) : dbHostelImg ? (
                        <img
                          src={`${titles.baseUrl}${dbHostelImg}`}
                          alt={hostelData?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-muted-foreground font-extralight">
                          preview
                        </span>
                      )}
                    </div>
                    {hostelImg && (
                      <Button
                        type="button"
                        variant={'ghost'}
                        className="hover:bg-transparent"
                        onClick={clearImg}
                      >
                        <X className="text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-3 flex justify-end items-center gap-4">
                <WbcSubmitBtn
                  isLoading={isLoading}
                  text="Save"
                  customClass="cs-btn-primary"
                />
                <Button type="button" variant={'outline'} onClick={resetForm}>
                  Reset
                </Button>
                {uuid ? (
                  <Button
                    type="button"
                    variant={'outline'}
                    onClick={() => navigate(-1)}
                  >
                    Back to List
                  </Button>
                ) : (
                  <Link to={`/${titles.servicesUrl}/${slug}/youth-hostels`}>
                    <Button type="button" variant={'outline'}>
                      Back to List
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </form>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbAppHostelInfo;

// ---------------------------------

export const loader: LoaderFunction = async ({ params }) => {
  const { uuid } = params;
  let hostelData = {} as YouthHostelProps | null;
  if (uuid) {
    try {
      const response = await customFetch.get(`/youth-hostels/${uuid}`);
      hostelData = response.data.data;

      return { hostelData };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return hostelData;
};
