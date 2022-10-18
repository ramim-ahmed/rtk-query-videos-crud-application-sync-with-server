import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    const { data, isLoading, isError } = useGetVideosQuery();

    // what to decide render
    let content;
    if (isLoading) {
        content = (
            <><VideoLoader /><VideoLoader /><VideoLoader /><VideoLoader /></>
        );
    }
    if (!isLoading && isError) {
        content = <Error />
    }
    if (!isLoading && !isError && data.length === 0) {
        content = <div> No videos found</div>
    }
    if (!isLoading && !isError && data.length > 0) {
        content = data.map(video => <Video key={video.id} video={video} />)
    }

    return content;
}
