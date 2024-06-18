import moment from 'moment';
import {
  TLectureResponse,
  TTestResponse,
} from '../../components/course/@types/course';
import { MaterialTypes } from '../../components/course/config/constants';

export type TMaterials = TLectureResponse & TTestResponse;

export const getSortedMaterialItems = (
  lectures: TLectureResponse[],
  tests: TTestResponse[],
) => {
  return ([...lectures, ...tests] as TMaterials[])
    .sort((a, b) => moment(a.createdAt).diff(moment(b.createdAt)))
    .map((material) => ({
      type: material?.questions?.length
        ? MaterialTypes.TEST
        : material?.videoUrl
        ? MaterialTypes.VIDEO
        : MaterialTypes.LECTURE,
      ...material,
    }));
};
