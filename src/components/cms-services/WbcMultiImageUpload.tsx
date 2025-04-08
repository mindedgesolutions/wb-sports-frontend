import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Editor from 'react-simple-wysiwyg';
import { X } from 'lucide-react';
import WbcSubmitBtn from './WbcSubmitBtn';
import { Button } from '../ui/button';
import { Link, useParams } from 'react-router-dom';
import { titles } from '@/constants';
import showError from '@/utils/showError';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { FairGalleryProps, GalleryImageProps } from '@/types/contents';
import { useAppDispatch } from '@/hooks';
import { updateSrCounter } from '@/features/commonSlice';

type FormProps = {
  galleryTitle: string | undefined;
  programmeDate: string | undefined;
};

const WbcMultiImageUpload = ({
  editRef,
  editGallery,
  setEditGallery,
}: {
  editRef: React.RefObject<HTMLInputElement | null>;
  editGallery?: FairGalleryProps | null;
  setEditGallery: React.Dispatch<React.SetStateAction<FairGalleryProps | null>>;
}) => {
  const { slug, uuid } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<FormProps>({
    galleryTitle: '',
    programmeDate: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [description, setDescription] = useState<string | undefined>('');
  const [images, setImages] = useState<File[]>([]);
  const [validImages, setValidImages] = useState<
    {
      file: File;
      preview: string;
    }[]
  >([]);
  const [dbImages, setDbImages] = useState<GalleryImageProps[] | null>(null);
  const dispatch = useAppDispatch();

  // ----------------------------------

  useEffect(() => {
    if (editGallery) {
      setForm({
        galleryTitle: editGallery?.title || '',
        programmeDate: editGallery?.programme_date?.toString() || '',
      });
      setDescription(editGallery?.description || '');
      setDbImages(editGallery?.images || []);
    }
  }, [editGallery]);

  // ----------------------------------

  function onChange(e: { target: { value: string } }) {
    setDescription(e.target.value);
  }

  // ----------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ----------------------------------

  const resetForm = () => {
    setForm({ ...form, galleryTitle: '', programmeDate: '' });
    setDescription('');
    setImages([]);
    setValidImages([]);
    setErrors(null);
    setEditGallery(null);
    setDbImages(null);
  };

  // ----------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    const filteredFiles = imageFiles.filter((file) => file.size <= 100 * 1024);

    if (imageFiles.length < files.length) {
      setErrors({ ...errors, images: ['Only image files are allowed'] });
    }

    if (filteredFiles.length < imageFiles.length) {
      setErrors({
        ...errors,
        images: ['Some images were too large (over 100KB) and were not added'],
      });
    }

    const newImages = filteredFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setValidImages((prevImages) => [...prevImages, ...newImages].slice(0, 10));
    setImages((prevImages) => [...prevImages, ...filteredFiles].slice(0, 10));
  };

  // ----------------------------------

  const removeImage = (index: number) => {
    setValidImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // ----------------------------------

  const removeDbImage = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await customFetch.delete(
        `/fair-programme/gallery/delete-image/${id}`
      );

      if (response.status === 200) {
        setDbImages(
          (prevImages) => prevImages?.filter((img) => img.id !== id) || null
        );
        showSuccess('Image deleted successfully');
        dispatch(updateSrCounter());
      }
    } catch (error) {
      if ((error as any)?.response?.status === 404) {
        return showError('Image not found!');
      }
      return showError(`Something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uuid) {
      return showError(
        'Must add fair / programme deatils to add gallery images'
      );
    }

    let errorBag = {};
    let errorCount = 0;

    if (!form.galleryTitle) {
      errorBag = { ...errorBag, galleryTitle: ['Gallery title is required'] };
      errorCount++;
    }
    if (!form.programmeDate) {
      errorBag = { ...errorBag, programmeDate: ['Programme date is required'] };
      errorCount++;
    }
    if (!editGallery && images.length === 0) {
      errorBag = { ...errorBag, images: ['At least one image is required'] };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    const data = new FormData();
    data.append('uuid', uuid);
    data.append('title', form.galleryTitle ?? '');
    data.append('programmeDate', form.programmeDate ?? '');
    data.append('description', description ?? '');

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        if (images[i] instanceof File) {
          data.append('images[]', images[i]);
        }
      }
    }
    const apiUrl = editGallery
      ? `/fair-programme/gallery/update/${editGallery?.id}`
      : `/fair-programme/gallery/store`;
    const msg = editGallery
      ? 'Gallery images updated successfully'
      : 'Gallery images uploaded successfully';

    setIsLoading(true);
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
      if ((error as any)?.response?.status === 422) {
        return setErrors((error as any)?.response?.data?.errors);
      } else if ((error as any)?.response?.status === 404) {
        return showError('Programme not found!');
      }
      return showError(`Something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-4 w-full">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 grid-flow-row gap-6">
              <div className="col-span-2 flex flex-row justify-start items-start gap-4">
                <div className="w-full flex flex-col gap-2">
                  <Label
                    htmlFor="galleryTitle"
                    className="text-muted-foreground"
                  >
                    Gallery title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="galleryTitle"
                    id="galleryTitle"
                    placeholder="Gallery title"
                    value={form.galleryTitle}
                    onChange={handleChange}
                  />
                  <span className="text-red-500 text-xs">
                    {errors?.galleryTitle?.[0]}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Label className="text-muted-foreground">
                    Programme date (tentative){' '}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    className="text-muted-foreground"
                    name="programmeDate"
                    id="programmeDate"
                    max={new Date().toISOString().split('T')[0]}
                    value={form.programmeDate}
                    onChange={handleChange}
                  />
                  <span className="text-red-500 text-xs">
                    {errors?.programmeDate?.[0]}
                  </span>
                </div>
              </div>
              <div className="col-span-2 flex flex-row justify-start items-start gap-4">
                <div className="w-full flex flex-col gap-2">
                  <Label
                    htmlFor="description"
                    className="text-muted-foreground"
                  >
                    Gallery description
                  </Label>
                  <Editor
                    name="description"
                    id="description"
                    className="border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-52 w-full bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={description}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 grid-flow-row">
              <div className="col-span-1 flex flex-row justify-start items-start gap-4">
                <div className="w-full flex flex-col gap-2">
                  <Label className="text-muted-foreground">
                    Select images (upload max. 10 at a time)
                  </Label>
                  <Input
                    type="file"
                    name="images"
                    id="images"
                    multiple
                    onChange={handleImageChange}
                    ref={editRef}
                  />
                  <span className="text-red-500 text-xs">
                    {errors?.images?.[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-start items-start flex-wrap gap-4">
              {validImages
                ? validImages.map((img, index) => {
                    return (
                      <div key={index} className="relative w-32">
                        <img
                          src={img.preview}
                          alt="Uploaded"
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white text-xs p-0.5 rounded cursor-pointer"
                          onClick={() => removeImage(index)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })
                : null}
              {dbImages
                ? dbImages?.map((img, index) => {
                    return (
                      <div key={index} className="relative w-32">
                        <img
                          src={`${titles.baseUrl}${img.image_path}`}
                          alt="Uploaded"
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white text-xs p-0.5 rounded cursor-pointer"
                          onClick={() => removeDbImage(img.id)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="col-span-3 flex justify-end items-center gap-4">
              <WbcSubmitBtn
                isLoading={isLoading}
                text="Upload"
                customClass="cs-btn-primary"
              />
              <Button type="button" variant={'outline'} onClick={resetForm}>
                Reset
              </Button>
              <Link to={`/${titles.servicesUrl}/${slug}/fairs-programmes`}>
                <Button type="button" variant={'outline'}>
                  Back to List
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default WbcMultiImageUpload;
