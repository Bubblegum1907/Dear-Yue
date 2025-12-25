export default function PostForm({ post, onSave }) {
  return (
    <form
      className="post-form"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;

        onSave({
          title: form.title.value,
          content: form.content.value,
          is_published: form.is_published.checked,
        });
      }}
    >
      <input
        name="title"
        placeholder="Title"
        defaultValue={post?.title}
        required
      />

      <textarea
        name="content"
        rows={16}
        defaultValue={post?.content}
        placeholder="Write..."
      />

      <label className="publish-toggle">
      <input
          type="checkbox"
          name="is_published"
          defaultChecked={post?.is_published}
      />
      <span>Published</span>
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
