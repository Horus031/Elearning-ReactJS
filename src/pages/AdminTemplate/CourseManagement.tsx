import React from "react";
import CourseTable from "@/components/admin/course/CourseTable";

const CourseManagement: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Quản lý khóa học
      </h2>
      <CourseTable />
    </div>
  );
};

export default CourseManagement;
