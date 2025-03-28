"use client";

import React, { Suspense } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "../../../../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import CourseDesc from "@/components/course-desc";
import { Course } from "@/components/CourseCard";
import { useSearchParams } from "next/navigation";

const PageContent = () => {
  const [course, setCourses] = React.useState<Course>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const adm = searchParams.get("admin");
  const [admin, setAdmin] = React.useState<boolean>(false);
  const [state, setState] = React.useState("");

  const fetchCourses = async () => {
    try {
      setState("loading");
      const res = await fetch(`/api/get-courses?id=${id}`);
      const data = await res.json();
      console.log("id course", data);
      setCourses(data.course);
      if (data.course) {
        setState("loaded");
      } else {
        setState("empty");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Error fetching courses");
      setState("error");
    }
  };

  React.useEffect(() => {
    fetchCourses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    setAdmin(adm === course?.instructors[0]);
  }, [adm, course]);

  return (
    <div className="flex-1 flex px-5 w-full h-full min-h-[calc(100vh-3.5rem)] justify-center">
      {state === "loaded" && course ? (
        <CourseDesc key={course.id} course={course} admin={admin != null} />
      ) : state === "empty" ? (
        <div className="text-white self-center">No courses found</div>
      ) : (
        <Loader2 className="animate-spin self-center" />
      )}
    </div>
  );
};

const Page = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={new QueryClient()}>
        <Suspense fallback={<Loader2 className="animate-spin self-center" />}>
          <PageContent />
        </Suspense>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Page;