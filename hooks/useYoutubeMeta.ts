import { ChannelType } from "@/types";
import context from "@/utils/context.json";
import { apiUrl, generateUniqueId } from "@/utils/tools";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import useSWR from "swr";
import { useDebounceValue } from "usehooks-ts";

export default function useYoutubeMeta() {
  const [search, setSearch] = useDebounceValue("LIVE TV bangladesh", 700);
  const [fetchMoreToken, setFetchMoreToken] = useState("");
  const {
    data: youtubeData,
    isLoading,
    mutate,
    error,
  } = useSWR(apiUrl + `?search=${search}`, (url: string) =>
    axios
      .post(url.split("?")[0], {
        context,
        query: url.split("=")[1],
        params: "EgJAAQ==",
      })
      .then((res) => res.data),
  );

  const [channels, setChannels] = useState<ChannelType[]>([]);
  const parseYoutubeMetaFromList = useCallback(async (videoId: string) => {
    const meta = await getYoutubeMeta(videoId);
    if (channels.find((item) => item.id !== videoId) || channels.length === 0) {
      setChannels((prev) => [
        ...prev,
        { ...meta, key: generateUniqueId(12), id: videoId },
      ]);
    }
  }, []);

  useEffect(() => {
    if (
      youtubeData?.contents?.twoColumnSearchResultsRenderer?.primaryContents
        ?.sectionListRenderer?.contents?.[0].itemSectionRenderer?.contents
        .length
    ) {
      setChannels([]);
      const contentData =
        youtubeData?.contents?.twoColumnSearchResultsRenderer?.primaryContents
          ?.sectionListRenderer?.contents?.[0].itemSectionRenderer?.contents;
      contentData.forEach((item: any) => {
        if (item?.videoRenderer?.videoId) {
          parseYoutubeMetaFromList(item?.videoRenderer?.videoId);
        }
      });
    }
    if (
      youtubeData?.contents?.twoColumnSearchResultsRenderer?.primaryContents
        ?.sectionListRenderer?.contents?.[1]?.continuationItemRenderer
        ?.continuationEndpoint?.continuationCommand?.token
    ) {
      setFetchMoreToken(
        youtubeData?.contents?.twoColumnSearchResultsRenderer?.primaryContents
          ?.sectionListRenderer?.contents?.[1]?.continuationItemRenderer
          ?.continuationEndpoint?.continuationCommand?.token,
      );
    }
  }, [isLoading]);

  const fetchMore = async () => {
    try {
      if (fetchMoreToken) {
        const { data } = await axios.post(apiUrl.split("?")[0], {
          context,
          query: apiUrl.split("=")[1],
          params: "EgJAAQ==",
          continuation: fetchMoreToken,
        });
        if (
          data &&
          data?.onResponseReceivedCommands[0]?.appendContinuationItemsAction
            ?.continuationItems?.[0]?.itemSectionRenderer?.contents?.length
        ) {
          const contentData =
            data?.onResponseReceivedCommands[0]?.appendContinuationItemsAction
              ?.continuationItems?.[0]?.itemSectionRenderer?.contents;
          contentData.forEach((item: any) => {
            if (item?.videoRenderer?.videoId) {
              parseYoutubeMetaFromList(item?.videoRenderer?.videoId);
            }
          });
        }

        if (
          data?.onResponseReceivedCommands?.appendContinuationItemsAction
            ?.continuationItems?.[1]?.continuationItemRenderer
            ?.continuationEndpoint?.continuationCommand?.token
        ) {
          setFetchMoreToken(
            data?.onResponseReceivedCommands?.appendContinuationItemsAction
              ?.continuationItems?.[1]?.continuationItemRenderer
              ?.continuationEndpoint?.continuationCommand?.token,
          );
        }
      }
    } catch (error: any) {
      console.log("🚀 ~ fetchMore ~ error:", error);
      // Alert.alert(error?.message)
    }
  };

  return {
    channels,
    isLoading,
    error,
    mutate,
    setSearch,
    search,
    fetchMore,
  };
}
