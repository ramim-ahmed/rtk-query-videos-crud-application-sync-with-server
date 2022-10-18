import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://json-web-server-2023.herokuapp.com'
    }),
    tagTypes: ['Videos', "Video", "RelatedVideos"],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            keepUnusedDataFor: 600,
            providesTags: ['Videos']
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (arg) => [
                { type: 'Video', id: arg }
            ]
        }),
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                const tags = title.split(' ');
                const likesSearch = tags.map(tag => `title_like=${tag}`);
                const queryString = `/videos?${likesSearch.join('&')}&_limit=${4}&id_ne=${id}`;
                return queryString
            },
            providesTags: (arg) => [
                {
                    type: "RelatedVideos", id: arg.id
                }
            ]
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Videos']
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (arg) => [
                "Videos",
                { type: 'Video', id: arg.id },
                { type: 'RelatedVideos', id: arg.id }
            ]
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Videos"]
        }),
    })
})


export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } = apiSlice;