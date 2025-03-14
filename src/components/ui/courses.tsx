import CourseCard, { Course } from "../CourseCard";

export default function CourseCardGrid() {
  const courses: Course[] = [
    {
      id: "1",
      title: "ChatGPT Complete Guide: Learn Generative AI, ChatGPT & More",
      instructors: ["Julian Melanson"],
      image:
        "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
      nftIds: [],
      images: [],
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals: From Zero to Hero",
      instructors: ["Sarah Johnson"],
      image:
        "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
      nftIds: [],
      images: [],
    },
    {
      id: "3",
      title: "Web Development Bootcamp 2024",
      instructors: ["Michael Chen"],
      image:
        "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
      nftIds: [],
      images: [],
    },
    {
      id: "4",
      title: "Data Science: Python for Analytics",
      instructors: ["Emma Wilson"],
      image:
        "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
      nftIds: [],
      images: [],
    },
    {
      id: "5",
      title: "UI/UX Design Masterclass",
      instructors: ["Alex Rodriguez"],
      image:
        "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
      nftIds: [],
      images: [],
    },
    {
      id: "6",
      title: "Blockchain Development: Smart Contracts",
      instructors: ["David Kim"],
      image:
        "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
      nftIds: [],
      images: [],
    },
  ];

  return (
    <div className="w-[100%] py-4 overflow-y-auto min-h-fit">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
