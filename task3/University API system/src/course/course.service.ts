import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  private courses = [
    { id: '101', name: 'NestJS', code: 'CS301' },
    { id: '102', name: 'Database Systems', code: 'CS302' },
    { id: '103', name: 'Web Development', code: 'CS303' },
  ];

  getAllCourses() {
    return { message: 'All courses fetched', data: this.courses };
  }

  getCourseById(id: string) {
    return { message: 'Course fetched',  data: this.courses.find(course => course.id === id) };
  }

  createCourse(name: string, code: string) {
    const newCourse = { id: String(this.courses.length + 101), name, code };
    this.courses.push(newCourse);
    return { message: 'Course created', data: { name, code } };
  }
}