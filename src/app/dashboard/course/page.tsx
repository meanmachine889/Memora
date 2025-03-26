"use client";
import CourseDesc from "@/components/course-desc";
import { Course } from "@/components/CourseCard";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "../../../../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Page = () => {
  const [course, setCourses] = useState<Course>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const adm = searchParams.get("admin");
  const [admin, setAdmin] = useState<boolean>(false);
  const queryClient = new QueryClient();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/get-courses?id=${id}`);
        const data = await res.json();
        console.log("id course", data);
        setCourses(data.course);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, [id]);

  useEffect(() => {
    setAdmin(adm == course?.instructors[0]);
  }, [adm, course]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="flex-1 px-5 w-full h-full min-h-[calc(100vh-3.5rem)]">
          {course ? (
            <CourseDesc key={course.id} course={course} admin={admin != null} />
          ) : (
            <div className="text-white">No courses found</div>
          )}
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Page;
