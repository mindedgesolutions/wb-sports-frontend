import { useAppSelector } from '@/hooks';
import { srGbMembersProps } from '@/types/contents';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { nanoid } from 'nanoid';

const WbGbMembersTable = () => {
  const { webGbMembers }: { webGbMembers: srGbMembersProps[] } = useAppSelector(
    (state) => state.mountains
  );

  return (
    <Table className="text-xs uppercase">
      <TableHeader>
        <TableRow className="bg-sky/30 hover:bg-sky/30">
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Designation / Name</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {webGbMembers?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-xs uppercase text-center">
              NO DATA FOUND
            </TableCell>
          </TableRow>
        ) : (
          webGbMembers?.map((member: srGbMembersProps, index: number) => {
            return (
              <TableRow
                key={nanoid()}
                className="text-sky-foreground group odd:bg-sky/5 even:bg-sky/10 duration-200"
              >
                <TableCell className="font-medium">{index + 1}.</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell className="align-top">
                  {member.description}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
export default WbGbMembersTable;
