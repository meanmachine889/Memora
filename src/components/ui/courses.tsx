import CourseCard, { Course } from "../CourseCard"

export default function CourseCardGrid() {
    // Sample course data - replace with your actual data
    const courses: Course[] = [
      {
        id: "1",
        title: "ChatGPT Complete Guide: Learn Generative AI, ChatGPT & More",
        instructors: ["Julian Melanson"],
        rating: 4.5,
        reviewCount: 45166,
        price: 549,
        originalPrice: 2699,
        image: "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
        tags: ["Premium", "Bestseller"],
      },
      {
        id: "2",
        title: "Machine Learning Fundamentals: From Zero to Hero",
        instructors: ["Sarah Johnson"],
        rating: 4.7,
        reviewCount: 32450,
        price: 699,
        originalPrice: 3499,
        image: "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
        tags: ["Premium"],
      },
      {
        id: "3",
        title: "Web Development Bootcamp 2024",
        instructors: ["Michael Chen"],
        rating: 4.8,
        reviewCount: 28900,
        price: 799,
        originalPrice: 3999,
        image: "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
        tags: ["Bestseller"],
      },
      {
        id: "4",
        title: "Data Science: Python for Analytics",
        instructors: ["Emma Wilson"],
        rating: 4.6,
        reviewCount: 18750,
        price: 649,
        originalPrice: 2999,
        image: "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
        tags: ["Premium"],
      },
      {
        id: "5",
        title: "UI/UX Design Masterclass",
        instructors: ["Alex Rodriguez"],
        rating: 4.9,
        reviewCount: 12340,
        price: 899,
        originalPrice: 4499,
        image: "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
        tags: ["Premium", "Bestseller"],
      },
      {
        id: "6",
        title: "Blockchain Development: Smart Contracts",
        instructors: ["David Kim"],
        rating: 4.4,
        reviewCount: 8920,
        price: 749,
        originalPrice: 3699,
        image: "https://images.unsplash.com/photo-1741547905925-90f7260ca9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
        tags: [],
      },
    ]
  
    return (
      <div className="w-[100%] py-4 overflow-y-auto min-h-fit">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    )
  }