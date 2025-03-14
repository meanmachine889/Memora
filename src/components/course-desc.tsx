/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { Course } from "./CourseCard";
import UploadForm from "./image-upload";

export default function CourseDesc({
  course,
  admin,
}: {
  course: Course;
  admin?: boolean;
}) {
  return (
    <div className="flex-1 py-4 min-w-full h-full flex flex-col justify-start items-start min-h-[calc(100vh-3.5rem)]">
      <p className="text-4xl mb-9">{course.title}</p>
      <p className="text-2xl mb-5">
        Content
      </p>
      <div className="gap-3 grid grid-cols-4 w-full">
        {course.images.map((content, index) => (
          <div key={index} className="flex flex-col relative items-center">
            <Image
              src={content}
              alt={""}
              width={400}
              height={200}
              quality={100}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
      <UploadForm />
    </div>
  );
}
