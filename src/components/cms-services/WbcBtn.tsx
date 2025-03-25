import { Button } from '../ui/button';

const WbcBtn = ({ text }: { text: string }) => {
  return (
    <Button className="cs-btn capitalize">
      <span className="flex flex-row justify-center items-center gap-3">
        {text}
      </span>
    </Button>
  );
};
export default WbcBtn;
