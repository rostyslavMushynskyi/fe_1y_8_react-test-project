import InfiniteScroll from "react-infinite-scroll-component";
import { usePosts } from "../../hooks/usePosts";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Stack } from "@chakra-ui/react";
import { getUserPostsService } from "../../services/usersServices";
import PostsList from "../posts/PostsList";

function UserPosts({ userId }) {
  const params = useMemo(() => {
    return {
      userId,
    };
  }, [userId]);

  const { posts, activePage, hasMore, fetchPosts, likePost, deletePost } =
    usePosts(getUserPostsService, params);

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

UserPosts.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserPosts;
