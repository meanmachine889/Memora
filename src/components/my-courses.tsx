"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import CourseCard, { Course } from "./CourseCard";
import FormDialog from "@/components/form-dialog";

export default function MyCourses() {
  const { address } = useAccount();
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `/api/get-courses?instructor=${address?.toString()}`
        );
        const data = await res.json();
        console.log(data);
        setCourses(data.courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [address]);

  return (
    <div className="py-4 flex flex-col justify-start items-start">
      <div className="flex justify-between items-center w-full">
        <p className="text-2xl mb-9">Your Courses</p>
        <FormDialog />
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} admin={true} />
          ))}
        </div>
      ) : (
        <div className="text-white">No courses found</div>
      )}
    </div>
  );
}
