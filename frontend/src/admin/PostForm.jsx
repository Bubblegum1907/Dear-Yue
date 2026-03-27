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
        placeholder="Title of this memory..."
        defaultValue={post?.title}
        required
      />

      <textarea
        name="content"
        rows={16}
        defaultValue={post?.content}
        placeholder="Begin writing..."
      />

      {/* This container pushes Save to the left and Published to the right */}
      <div className="editor-footer">
        <button type="submit">
          Save
        </button>

        <label className="publish-toggle">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={post?.is_published}
          />
          <span>Published</span>
        </label>
      </div>
    </form>
  );
}