"use client";

import { useEffect, useState } from "react";
import CourseCard, { Course } from "../CourseCard";
import { getCourses } from "@/app/helpers/helpers";
import { Loader2 } from "lucide-react";

export default function CourseCardGrid() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [state, setState] = useState("");
  useEffect(() => {
    async function fetchData() {
      setState("loading");
      const res = await getCourses();
      if (res.data.length > 0) {
        setState("loaded");
      } else {
        setState("empty");
      }
      setCourses(res.data);
    }
    fetchData();
  }, []);
  return (
    <div className="w-[100%] py-4 overflow-y-auto justify-center min-h-full flex">
      {state == "loaded" && (
        <div className="grid grid-cols-1 h-fit md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 w-full">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
      {state == "loading" && (
        <div className="self-center">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {state == "empty" && (
        <div className="self-center text-white">No content found</div>
      )}
    </div>
  );
}
