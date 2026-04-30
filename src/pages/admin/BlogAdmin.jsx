import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../../api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_URL = 'http://jadhavarparamedicalcollege.com';

// Quill toolbar configuration
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean'],
    [{ 'direction': 'rtl' }]
  ],
  clipboard: {
    matchVisual: false,
  }
};

// Quill formats
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'list', 'bullet', 'check',
  'indent', 'align',
  'blockquote', 'code-block',
  'link', 'image', 'video',
  'direction'
];

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  status: 'published',
  author: 'Admin',
  metaTitle: '',
  metaDescription: '',
  publishedDate: new Date().toISOString().split('T')[0]
};

const BlogAdmin = () => {
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [slugPreview, setSlugPreview] = useState('');

  // Generate slug from title
  const generateSlug = (title) => {
    if (!title) return '';
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Update slug preview when title changes
  useEffect(() => {
    const slug = generateSlug(form.title);
    setSlugPreview(slug);
  }, [form.title]);

  const loadBlogs = async () => {
    try {
      const res = await blogAPI.getAllAdmin();
      setBlogs(res.data);
    } catch (err) {
      console.error('Error loading blogs:', err);
      alert('Failed to load blogs: ' + err.message);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert('Title is required');
      return;
    }
    if (!form.excerpt.trim()) {
      alert('Excerpt is required');
      return;
    }
    if (!form.content.trim()) {
      alert('Content is required');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('excerpt', form.excerpt);
      formData.append('content', form.content);
      formData.append('status', form.status);
      formData.append('author', form.author);
      formData.append('metaTitle', form.metaTitle || form.title);
      formData.append('metaDescription', form.metaDescription || form.excerpt.substring(0, 160));
      formData.append('publishedDate', form.publishedDate);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editingId) {
        await blogAPI.update(editingId, formData);
      } else {
        await blogAPI.create(formData);
      }

      setForm(emptyForm);
      setImageFile(null);
      setImagePreview('');
      setEditingId(null);
      await loadBlogs();
      alert(editingId ? 'Blog updated successfully!' : 'Blog created successfully!');

    } catch (err) {
      console.error('BLOG ERROR:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      status: blog.status || 'published',
      author: blog.author || 'Admin',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      publishedDate: blog.publishedDate
        ? new Date(blog.publishedDate).toISOString().split('T')[0]
        : new Date(blog.createdAt).toISOString().split('T')[0]
    });

    if (blog.image) {
      setImagePreview(`${API_URL}${blog.image}`);
    } else {
      setImagePreview('');
    }

    setImageFile(null);
    setEditingId(blog._id);
    setShowPreview(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogAPI.delete(id);
      await loadBlogs();
      alert('Blog deleted successfully!');
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCancelEdit = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setEditingId(null);
    setShowPreview(false);
  };

  const insertTemplate = (type) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection(true);
    
    switch(type) {
      case 'quote':
        quill.insertText(range.index, '\n');
        quill.formatText(range.index + 1, 0, 'blockquote', true);
        quill.insertText(range.index + 1, 'Add your quote here...');
        break;
      case 'bullet-list':
        quill.insertText(range.index, '\n• Item 1\n• Item 2\n• Item 3\n');
        break;
      case 'numbered-list':
        quill.insertText(range.index, '\n1. Item 1\n2. Item 2\n3. Item 3\n');
        break;
      case 'divider':
        quill.insertText(range.index, '\n---\n');
        break;
      case 'highlight':
        quill.insertText(range.index, '\n');
        quill.formatText(range.index + 1, 0, 'background', '#ffff99');
        quill.insertText(range.index + 1, 'Important note or highlight text here...');
        quill.formatText(range.index + 1, 40, 'background', '#ffff99');
        quill.insertText(range.index + 41, '\n');
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        <div className="w-24"></div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        {/* Editor Tabs */}
        <div className="border-b border-gray-200 bg-gray-50 px-6">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={`py-3 px-4 font-medium transition-colors ${
                !showPreview 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ✏️ Write
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className={`py-3 px-4 font-medium transition-colors ${
                showPreview 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              👁️ Preview
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Write Mode */}
          {!showPreview ? (
            <>
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter blog title..."
                    required
                  />
                  {slugPreview && (
                    <p className="text-xs text-gray-500 mt-1">
                      🔗 URL: /blog/{slugPreview}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Author name..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Published Date
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={form.publishedDate}
                    onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Status
                  </label>
                  <select
                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="published">📢 Published</option>
                    <option value="draft">📝 Draft</option>
                  </select>
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Featured Image
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Excerpt / Short Description *
                </label>
                <textarea
                  rows="3"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Brief summary of the blog post (shown in blog listings)..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {form.excerpt.length} characters (recommended: 150-160 for SEO)
                </p>
              </div>

              {/* SEO Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">🔍 SEO Settings (Optional)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Meta Title</label>
                    <input
                      type="text"
                      className="border border-gray-300 p-2 w-full rounded"
                      value={form.metaTitle}
                      onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                      placeholder={form.title}
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty to use blog title</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Meta Description</label>
                    <textarea
                      rows="2"
                      className="border border-gray-300 p-2 w-full rounded"
                      value={form.metaDescription}
                      onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                      placeholder={form.excerpt}
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty to use excerpt</p>
                  </div>
                </div>
              </div>

              {/* Quick Templates */}
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Quick insert:</span>
                <button
                  type="button"
                  onClick={() => insertTemplate('quote')}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  💬 Quote Block
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('bullet-list')}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  📝 Bullet List
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('numbered-list')}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  🔢 Numbered List
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('divider')}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  ─── Divider
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('highlight')}
                  className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 rounded text-sm"
                >
                  ✨ Highlight Box
                </button>
              </div>

              {/* Rich Text Editor */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Blog Content *
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={form.content}
                    onChange={(value) => setForm({ ...form, content: value })}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your blog content here... Use the toolbar above to format text, add images, links, lists, and more!"
                    style={{ height: '400px', marginBottom: '50px' }}
                  />
                </div>
              </div>
            </>
          ) : (
            /* Preview Mode */
            <div className="preview-container">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-700">Preview Mode</h3>
                <p className="text-sm text-gray-500">This is how your blog will appear to readers</p>
              </div>
              
              <div className="border rounded-lg p-8 bg-white">
                {/* Preview Blog Content */}
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{form.title || 'Blog Title'}</h1>
                  
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {form.author?.charAt(0) || 'A'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{form.author || 'Admin'}</div>
                      <div className="text-sm text-gray-500">
                        {form.publishedDate ? new Date(form.publishedDate).toLocaleDateString() : 'Date'}
                      </div>
                    </div>
                  </div>

                  {imagePreview && (
                    <div className="mb-8">
                      <img src={imagePreview} alt="Preview" className="w-full rounded-xl" />
                    </div>
                  )}

                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: form.content }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? '✏️ Update Blog' : '📝 Publish Blog'}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Blog List Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            📚 All Blog Posts ({blogs.length})
          </h2>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p>No blogs created yet. Create your first blog above!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      {blog.image ? (
                        <img
                          src={`${API_URL}${blog.image}`}
                          alt={blog.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{blog.title}</div>
                      <div className="text-xs text-gray-500 font-mono">/{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{blog.author || 'Admin'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(blog.publishedDate || blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Custom CSS for better editor styling */}
      <style jsx>{`
        .ql-editor {
          min-height: 300px;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .ql-editor h1 {
          font-size: 2em;
          font-weight: bold;
        }
        
        .ql-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
        }
        
        .ql-editor blockquote {
          border-left: 4px solid #ccc;
          margin-bottom: 5px;
          margin-top: 5px;
          padding-left: 16px;
        }
        
        .preview-container .prose {
          max-width: 100%;
        }
        
        .preview-container .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        
        .preview-container .prose blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          font-style: italic;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default BlogAdmin;