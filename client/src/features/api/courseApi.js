import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/course",
    credentials: "include",
  }),
  tagTypes: ["CreatorCourses", "Refetch_LECTURE"],
  endpoints: (builder) => ({
    getCreatorCourses: builder.query({
      query: () => ({
        url: "creator",
        method: "GET",
      }),
      providesTags: ["CreatorCourses"],
    }),
    getSearchCourse: builder.query({
      query: ({ searchQuery = "", categories = [], sortByPrice = "" } = {}) => {
        // Build query string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;
    
        // Append categories if provided
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }
    
        // Append sort by price if provided
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }
    
        return {
          url: queryString,
          method: "GET",
        };
      },
    }),
    
    
    getPublishedCourse: builder.query({
      query: () => ({
        url: "published-courses",
        method: "GET",
      }),
    }),
    createCourse: builder.mutation({
      query: (newCourse) => ({
        url: "",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["CreatorCourses"],
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["CreatorCourses"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: ["CreatorCourses"],
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
   getCourseLecture: builder.query({
      query: ( courseId ) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
        
      }),
      providesTags: ["Refetch_LECTURE"],
    }),
    editLecture: builder.mutation({
      query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "PUT",
        body: { lectureTitle, videoInfo, isPreviewFree },


      })
    }),
    removeLecture: builder.mutation({
      query: ( lectureId ) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
       


      }),
      invalidatesTags: ["Refetch_LECTURE"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
      invalidatesTags: ["CreatorCourses"],
      
    })
  }),
});


export const {
  useGetCreatorCoursesQuery,
  useGetSearchCourseQuery,
  useGetPublishedCourseQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
 
} = courseApi;
