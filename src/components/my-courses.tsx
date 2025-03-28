/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import CourseCard, { Course } from "./CourseCard";
import FormDialog from "@/components/form-dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function MyCourses() {
  const { address } = useAccount();
  const [courses, setCourses] = useState<Course[]>([]);
  const [state, setState] = useState("");
  const fetchCourses = async () => {
    try {
      setState("loading");
      const res = await fetch(
        `/api/get-courses?instructor=${address?.toString()}`
      );
      const data = await res.json();
      console.log(data);
      setCourses(data.courses);
    } catch (error) {
      toast("Error fetching courses");
    } finally {
      setState("loaded");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [address]);

  return (
    <div className="py-4 flex flex-col justify-start items-start">
      <div className="flex md:flex-row flex-col md:justify-between md:gap-0 md:pb-0 md:mb-0 mb-4 gap-4 justify-start items-center w-full">
        <p className="text-2xl md:mb-9">Your Courses</p>
        <FormDialog fetchCourses={fetchCourses} />
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full w-full">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} admin={true} />
          ))}
        </div>
      ) : state == "loading" ? (
        <div className="flex w-full items-center justify-center h-full">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="text-white">No courses found</div>
      )}
    </div>
  );
}
