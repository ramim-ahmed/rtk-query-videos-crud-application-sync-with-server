import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
    const { data, isError, isLoading } = useGetRelatedVideosQuery({ id, title });
    // what to decide render
    let content;
    if (isLoading) {
        content = (
            <>
                <RelatedVideoLoader />
                <RelatedVideoLoader />
                <RelatedVideoLoader />
                <RelatedVideoLoader />
            </>
        );
    }
    if (!isLoading && isError) {
        content = <Error />
    }
    if (!isLoading && !isError && data.length === 0) {
        content = <div> No related videos found!</div>
    }
    if (!isLoading && !isError && data.length > 0) {
        content = data.map(video => <RelatedVideo key={video.id} video={video} />)
    }
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
