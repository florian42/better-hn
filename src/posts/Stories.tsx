import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainPosts, Story } from "../hackernews/api";
import { fetchHottestStories } from "../lobsters/api";
import { RootState } from "../reducer";
import {
  fetchStoriesFailed,
  fetchStoriesStarted,
  fetchStoriesSuccess,
} from "./storiesSlice";
import StoryInfo from "./StoryInfo";
import Title from "./Title";

const Stories: React.FC = () => {
  const dispatch = useDispatch();
  const { stories, loading } = useSelector((state: RootState) => state.posts);
  const { selectedSite } = useSelector((state: RootState) => state.app);

  const fetchPosts = React.useCallback<() => Promise<Story[]>>(() => {
    return selectedSite === "lobsters"
      ? fetchHottestStories()
      : fetchMainPosts();
  }, [selectedSite]);

  useEffect(() => {
    async function fetchTopStories() {
      const posts = await fetchPosts();
      dispatch(fetchStoriesSuccess(posts));
    }
    dispatch(fetchStoriesStarted());
    try {
      fetchTopStories();
    } catch (error) {
      dispatch(fetchStoriesFailed(error));
    }
  }, [dispatch, fetchPosts]);
  return (
    <ul>
      {!loading
        ? stories.map((post: Story) => {
            return (
              <li key={post.id} className="post">
                <Title url={post.url} title={post.title} id={post.id} />
                <StoryInfo id={post.id} descendants={post.descendants} />
              </li>
            );
          })
        : renderLoading()}
    </ul>
  );
};

function renderLoading() {
  return [...Array(25)].map((_item, index) => {
    return (
      <div key={index} style={{ padding: "8px" }}>
        <Skeleton width={400} />
        <Skeleton width={100} />
      </div>
    );
  });
}

export default Stories;
