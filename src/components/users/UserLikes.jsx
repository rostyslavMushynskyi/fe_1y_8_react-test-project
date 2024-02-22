import InfiniteScroll from "react-infinite-scroll-component";
import { usePosts } from "../../hooks/usePosts";
import { useMemo } from "react";
import { CircularProgress, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { getUserLikesService } from "../../services/usersServices";
import PostsList from "../posts/PostsList";

function UserLikes({ userId }) {
  const params = useMemo(() => {
    return {
      userId,
    };
  }, [userId]);

  const { posts, activePage, hasMore, fetchPosts, likePost, deletePost } =
    usePosts(getUserLikesService, params);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      endMessage={<span>🐧</span>}
      loader={
        <Stack py="32px" alignItems="center">
          <CircularProgress isIndeterminate />
        </Stack>
      }
      next={() => fetchPosts(activePage + 1)}
      hasMore={hasMore}
    >
      <PostsList posts={posts} onLike={likePost} onDelete={deletePost} />
    </InfiniteScroll>
  );
}

UserLikes.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default UserLikes;
