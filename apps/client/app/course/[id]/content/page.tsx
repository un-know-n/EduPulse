import { CourseContent } from '../../../components/course/pages/CourseContent';

export default function Page({ params }: { params: { id: string } }) {
  return <CourseContent id={params.id} />;
}
