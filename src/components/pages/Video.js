import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";

export default function Video() {
    const { videoId } = useParams()
    const { data: video, isLoading, isError } = useGetVideoQuery(videoId);
    // what to decide render
    let content;
    if (isLoading) {
        content = (
            <>
                <PlayerLoader />
                <DescriptionLoader />
            </>
        )
    }
    if (!isLoading && isError && !video.id) {
        content = <Error />
    }

    if (!isLoading && !isError && video?.id) {
        content = <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <Player link={video.link} title={video.title} />
            <Description video={video} />
        </div>
    }
    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    {content}
                    {
                        video?.id ? <RelatedVideos id={video.id} title={video.title} /> : isLoading ? (
                            <>
                                <RelatedVideoLoader />
                                <RelatedVideoLoader />
                                <RelatedVideoLoader />
                            </>
                        ) : (
                            <Error />
                        )
                    }
                </div>
            </div>
        </section>
    );
}
