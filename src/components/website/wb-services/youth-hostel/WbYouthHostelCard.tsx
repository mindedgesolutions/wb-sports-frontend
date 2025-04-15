import { images, titles } from '@/constants';
import { MapPin, Phone } from 'lucide-react';
import { YouthHostelProps } from '@/types/contents';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/hooks';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const WbYouthHostelCard = ({ hostel }: { hostel: YouthHostelProps }) => {
  const [open, setOpen] = useState(false);
  const { hostels } = useAppSelector((state) => state.hostels);
  const dbhostel = hostels.find((h) => h.id === hostel.id);

  const openModal = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        <div
          className="grid grid-cols-6 gap-4 p-3 cursor-pointer min-h-40 border rounded-none hover:shadow-lg duration-300 group"
          onClick={() => openModal}
        >
          <div className="col-span-2">
            <img
              src={
                hostel.hostel_img
                  ? `${titles.baseUrl}${hostel.hostel_img}`
                  : images.hostelDefault
              }
              alt={hostel.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-4">
            <h1 className="text-sm md:text-base tracking-wider text-sky-foreground font-medium">
              {hostel.name}
            </h1>
            <div className="mt-3 flex items-start gap-1">
              <MapPin className="h-3.5 text-muted-foreground/70" />{' '}
              <span className="text-xs uppercase text-muted-foreground/70 font-medium tracking-wide leading-relaxed">
                {hostel.address.length > 35
                  ? hostel.address.slice(0, 35) + '...'
                  : hostel.address}
              </span>
            </div>
            <div className="w-full mt-1 flex flex-row justify-start items-start gap-2">
              {hostel.phone_1 ? (
                <div className="mt-1 flex justify-start items-center gap-1">
                  <Phone className="h-3.5 text-muted-foreground/70" />{' '}
                  <span className="text-sm uppercase text-muted-foreground/70 font-medium tracking-wide leading-relaxed">
                    +91{hostel.phone_1}
                  </span>
                </div>
              ) : null}
              {hostel.phone_2 ? (
                <div className="mt-1 flex justify-start items-center gap-1">
                  <Phone className="h-3.5 text-muted-foreground/70" />{' '}
                  <span className="text-sm uppercase text-muted-foreground/70 font-medium tracking-wide leading-relaxed">
                    +91{hostel.phone_2}
                  </span>
                </div>
              ) : null}
              {!hostel.phone_1 && !hostel.phone_2 && (
                <div className="mt-1 flex justify-start items-center gap-1">
                  <Phone className="h-3.5 text-muted-foreground/70" />{' '}
                  <span className="text-sm uppercase text-muted-foreground/70 font-medium tracking-wide leading-relaxed">
                    NA
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="md:min-w-2xl">
        <DialogHeader>
          <DialogTitle>{dbhostel?.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Address :</Label>
              <p className="text-sm">{dbhostel?.address}</p>
              <div className="flex gap-4">
                {dbhostel?.phone_1 && (
                  <p className="text-sm">+91{dbhostel.phone_1}</p>
                )}
                {dbhostel?.phone_2 && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="bg-primary/30 h-2"
                    />
                    <p className="text-sm">+91{dbhostel.phone_2}</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">
                Type of Accommodation :
              </Label>
              {dbhostel?.accommodation && (
                <ol className="list-disc list-inside">
                  {dbhostel.accommodation.split(',').map((accom) => (
                    <li key={accom} className="text-sm">
                      {accom.trim()}
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">How to reach :</Label>
              <p className="text-sm">{dbhostel?.how_to_reach}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">
                Nearest railway station :
              </Label>
              <p className="text-sm">{dbhostel?.railway_station ?? `NA`}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">
                Nearest bus stop :
              </Label>
              <p className="text-sm">{dbhostel?.bus_stop ?? `NA`}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Nearest airport :</Label>
              <p className="text-sm">{dbhostel?.airport ?? `NA`}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">
                Road transportation network :
              </Label>
              <p className="text-sm">{dbhostel?.road_network}</p>
            </div>
          </div>
          <div className="">
            <img
              src={
                dbhostel?.hostel_img
                  ? `${titles.baseUrl}${dbhostel.hostel_img}`
                  : images.hostelDefault
              }
              alt={dbhostel?.name}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default WbYouthHostelCard;
