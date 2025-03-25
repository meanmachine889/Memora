"use client";

import { useEffect, useState } from "react";
import CourseCard, { Course } from "../CourseCard";
import { getCourses } from "@/app/helpers/helpers";

export default function CourseCardGrid() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [state, setState] = useState("");
  useEffect(() => {
    async function fetchData() {
      setState("loading");
      const res = await getCourses();
      if(res.data.length > 0){
        setState("loaded");
      }
      else {
        setState("empty");
      }
      setCourses(res.data);
    }
    fetchData();
  }, [])
  return (
    <div className="w-[100%] py-4 overflow-y-auto min-h-fit">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2">
        {state == "loading" && <p>Loading...</p>}
        {state == "empty" && <p>No courses found</p>}
        {state == "loaded" && courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
