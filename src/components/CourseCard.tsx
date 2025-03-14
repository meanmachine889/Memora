import Image from "next/image";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Buffer } from "buffer";

export interface Course {
  id: string; 
  title: string; 
  instructors: string[]; 
  image: string; 
  nftIds: string[]; 
  images: string[];
}

export default function CourseCard({ course, admin }: { course: Course , admin?: boolean }) {
  const encodedInstructor = Buffer.from(course.instructors[0]).toString("base64");
  return (
    <Card className="overflow-hidden bg-[#101010] rounded-sm transition-all duration-300 hover:shadow-lg p-0">
      <div className="relative">
        <Image
          width={600}
          height={800}
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover rounded-t-sm"
        />
      </div>
      <CardContent className="p-4 py-1">
        <h3 className="font-normal text-lg line-clamp-2 mb-2">{course.title}</h3>
        {!admin && <p className="text-sm text-muted-foreground mb-2">
          {course.instructors[0].slice(0, 11)}...{course.instructors[0].slice(-4)}
        </p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-end h-full">
        <Link
          href={admin ? `/dashboard/course?id=${course.id}&admin=${encodedInstructor}` : `/dashboard/course?id=${course.id}`}
          className="flex items-center text-primary hover:scale-105 transition-transform duration-300"
        >
          View <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
