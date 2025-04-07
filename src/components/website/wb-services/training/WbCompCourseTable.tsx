import { ComputerCourseProps } from '@/types/contents';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { nanoid } from 'nanoid';
import { currencyFormat } from '@/utils/function';

const WbCompCourseTable = ({
  courseInfo,
  title,
}: {
  courseInfo: ComputerCourseProps[];
  title: string;
}) => {
  return (
    <div>
      <div className="p-1 px-3 bg-sky-foreground max-w-[200px] uppercase text-white font-medium tracking-wider">
        {title}
      </div>
      <Table className="text-xs uppercase">
        <TableHeader>
          <TableRow className="bg-sky/30 hover:bg-sky/30">
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Eligibility</TableHead>
            <TableHead>Fees (Rs.)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseInfo?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-xs uppercase text-center">
                NO DATA FOUND
              </TableCell>
            </TableRow>
          ) : (
            courseInfo?.map((course: ComputerCourseProps, index: number) => {
              return (
                <TableRow
                  key={nanoid()}
                  className="text-sky-foreground group odd:bg-sky/5 even:bg-sky/10 duration-200"
                >
                  <TableCell className="font-medium">{index + 1}.</TableCell>
                  <TableCell>
                    <div className="max-w-[250px] text-left text-wrap">
                      {course.course_name}
                    </div>
                  </TableCell>
                  <TableCell>{course.course_duration}</TableCell>
                  <TableCell>
                    <div className="max-w-[250px] text-left text-wrap">
                      {course.course_eligibility ?? `NA`}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    {currencyFormat().format(course.course_fees)}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default WbCompCourseTable;
