import Image from "next/image";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export interface Course {
  id: string;
  title: string;
  instructors: string[];
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  image: string;
  tags: string[];
}

export default function CourseCard({ course }: { course: Course }) {
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
        <p className="text-sm text-muted-foreground mb-2">
          {course.instructors.join(", ")}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-end h-full">
        <Link
          href={`/course/${course.id}`}
          className="flex items-center text-primary hover:scale-105 transition-transform duration-300"
        >
          View <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
