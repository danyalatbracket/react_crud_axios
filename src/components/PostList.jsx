import { useEffect, useState } from "react";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../api/PostApi";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [editingPostId, setEditingPostId] = useState(null); // track which post is being edited

  const getPostData = async () => {
    const res = await getAllPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPostId) {
        const res = await updatePost(editingPostId, formData);
        console.log("Updated:", res.data);

        setPosts((prev) =>
          prev.map((post) =>
            post.id === editingPostId ? { ...post, ...res.data } : post
          )
        );
        setEditingPostId(null);
      } else {
        const res = await createPost({ ...formData, userId: 1 });
        console.log("Created:", res.data);
        setPosts([res.data, ...posts]);
      }

      setFormData({ title: "", body: "" });
    } catch (err) {
      console.error("Error submitting post", err);
    }
  };

  const handleEdit = (post) => {
    setFormData({ title: post.title, body: post.body });
    setEditingPostId(post.id);
  };

  const handleDelete = async (post) => {
    try {
      await deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Container className="mt-4">
      {/* Post Form */}
      <Form
        onSubmit={handleSubmit}
        className="mb-4 p-4 bg-dark text-white rounded shadow-sm"
      >
        <h4>{editingPostId ? "Update Post" : "Create New Post"}</h4>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Body</Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          {editingPostId ? "Update" : "Submit"}
        </Button>
      </Form>

      {/* Post List */}
      <Row className="g-4">
        {posts.length > 0 &&
          posts.map((post, index) => (
            <Col key={post.id} xs={12} sm={6} md={4} className="d-flex">
              <PostCard
                post={post}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default PostList;
