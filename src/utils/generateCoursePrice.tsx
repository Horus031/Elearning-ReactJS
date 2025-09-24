import type { Course } from "@/types/course";

export const getRandomPrice = () => {
  const price = Math.floor(Math.random() * 10_000_000) + 1_000_000;
  return price;
};

export const getRandomDiscount = () => {
  const percent = Math.floor(Math.random() * 41) + 10;
  return percent;
};

export const getRandomDuration = () => {
  const duration = Math.floor(Math.random() * 91) + 10;
  return duration;
};

export const getRandomStudent = () => {
  const students = Math.floor(Math.random() * 41000) + 10000;

  return students;
};

export const getRandomView = () => {
    const views = Math.floor(Math.random() * 91000) + 10000;
    return views
}

export const generateCoursePrice = () => {
  const originalPrice = getRandomPrice();
  const discountPercent = getRandomDiscount();
  const promotionPrice = Math.floor(
    originalPrice * (1 - discountPercent / 100)
  );
  const duration = getRandomDuration();
  const students = getRandomStudent();
  const views = getRandomView()
  return { originalPrice, promotionPrice, discountPercent, duration, students, views, };
};

export const generateCoursePrices = (courses: Course[] | Course) => {
  if (Array.isArray(courses)) {
    return courses.reduce((acc, course: Course) => {
      acc[course.maKhoaHoc] = generateCoursePrice();
      return acc;
    }, {} as Record<string, { originalPrice: number; promotionPrice: number; discountPercent: number, duration: number, students: number, views: number }>);
  } else {
    return generateCoursePrice();
  }
};
