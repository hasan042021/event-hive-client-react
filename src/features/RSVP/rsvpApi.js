import { apiSlice } from "../api/apiSlice";

const rsvpApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all RSVPs
    getRSVPs: builder.query({
      query: () => "events/rsvp-list/",
      providesTags: ["RSVPs"], // Centralized RSVP tag
    }),

    // Fetch RSVPs by attendee
    getAttendeeRSVPs: builder.query({
      query: (filters) => ({
        url: "events/rsvp-list/",
        params: {
          attendee__id: filters.id,
          is_accepted: true,
        },
      }),
      providesTags: (result, error, filters) => [
        { type: "RSVPs", id: `Attendee-${filters.id}` },
      ],
    }),

    // Fetch RSVPs for a specific event
    getRSVPbyEvent: builder.query({
      query: (filters) => ({
        url: "events/rsvp-list/",
        params: {
          event__id: filters.id,
          is_accepted: true,
        },
      }),
      providesTags: (result, error, filters) => [
        { type: "RSVPs", id: `Event-${filters.id}` },
      ],
    }),

    // Fetch the RSVP for the current event and attendee
    getCurrentEventRSVP: builder.query({
      query: (filters) => ({
        url: "events/rsvp-list/",
        params: {
          event__id: filters.event_id,
          attendee__id: filters.attendee_id,
          is_accepted: true,
        },
      }),
      providesTags: (result, error, filters) => [
        { type: "RSVPs", id: `Event-${filters.event_id}` },
        { type: "RSVPs", id: `Attendee-${filters.attendee_id}` },
      ],
    }),

    // Create an RSVP
    createRSVP: builder.mutation({
      query: (data) => ({
        url: "events/rsvp-list/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["RSVPs"], // Invalidate everything RSVP-related to ensure consistency
    }),
  }),
});

export const {
  useGetRSVPsQuery,
  useGetAttendeeRSVPsQuery,
  useCreateRSVPMutation,
  useGetCurrentEventRSVPQuery,
  useGetRSVPbyEventQuery,
} = rsvpApi;
