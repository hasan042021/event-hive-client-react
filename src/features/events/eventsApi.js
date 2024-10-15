import { apiSlice } from "../api/apiSlice";

const eventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "events/list/",
      providesTags: ["Events"],
    }),
    getEvent: builder.query({
      query: (id) => `events/list/${id}`,
      providesTags: (result, error, arg) => [
        "Events",
        { type: "Events", id: arg },
      ],
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: `/events/list/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/events/list/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Events",
        { type: "Events", id: arg.id },
      ],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/list/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
    filterEvents: builder.query({
      query: (filters) => ({
        url: "events/list/",
        params: {
          category__slug: filters?.category,
          tags__id: filters?.tags,
        },
      }),
      providesTags: (result, error, filters) => [
        { type: "Events", category: filters?.category },
        ...(filters?.tags?.map((tag) => ({ type: "Events", tagId: tag })) || [
          "Events",
        ]),
      ],
    }),
    getOrganizersEvents: builder.query({
      query: (id) => ({
        url: "events/list/",
        params: {
          organizer__id: id,
        },
      }),
      providesTags: ["Events"],
    }),
    getTags: builder.query({
      query: () => "events/tags/",
      providesTags: ["Tags"],
    }),
    getCategories: builder.query({
      query: () => "events/categories/",
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetEventQuery,
  useGetEventsQuery,
  useUpdateEventMutation,
  useFilterEventsQuery,
  useGetOrganizersEventsQuery,
  useDeleteEventMutation,
  useGetTagsQuery,
  useGetCategoriesQuery,
  useCreateEventMutation,
} = eventsApi;
