type CompoCentreAddressProps = {
  address1: string;
  address2?: string;
  address3?: string;
  city?: string;
  pincode?: string;
};

export const formatAddress = ({
  address1,
  address2,
  address3,
  city,
  pincode,
}: CompoCentreAddressProps) => {
  let lastLine = '';
  if (city && pincode) {
    lastLine = `${city}, ${pincode}`;
  } else if (city && !pincode) {
    lastLine = city;
  } else if (!city && pincode) {
    lastLine = pincode;
  } else {
    lastLine = '';
  }

  return (
    <div className="flex flex-col justify-start items-start">
      {address1 && <span>{address1},</span>}
      {address2 && <span>{address2},</span>}
      {address3 && <span>{address3}</span>}
      <span>{lastLine}</span>
    </div>
  );
};
