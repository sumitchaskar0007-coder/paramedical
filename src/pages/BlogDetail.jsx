import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogAPI } from '../api';

const API_URL = 'http://jadhavarparamedicalcollege.com';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    loadBlog();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadBlog = async () => {
  try {
    setLoading(true);
    setError('');
    console.log('Fetching blog with slug:', slug); // ADD THIS
    const res = await blogAPI.getBySlug(slug);
    console.log('Blog Detail Response:', res.data); // ADD THIS
    setBlog(res.data);
    // ... rest of code
  } catch (err) {
    console.error('Error loading blog:', err);
    console.error('Error response:', err.response); // ADD THIS
    setError('Blog not found or failed to load.');
  } finally {
    setLoading(false);
  }
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = `Check out this article: ${blog.title}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <h3 className="text-xl font-medium text-red-600">{error || 'Blog not found'}</h3>
            <button
              onClick={() => navigate('/blog')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Parse content with formatting support
  const renderContent = (htmlContent) => {
    // This is a simple parser - in production, use a proper HTML sanitizer
    return { __html: htmlContent };
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Sticky Share Buttons */}
      <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col gap-3">
          <button
            onClick={shareOnWhatsApp}
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            title="Share on WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.414 3.488 2.245 2.248 3.482 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm.079-2.254c-.274-.408-.574-.868-.576-1.686 0-.628.375-1.064.656-1.373.259-.284.579-.437.925-.437.188 0 .319.021.428.067.096.041.19.104.314.219.435.406 1.226.964 2.078.964.416 0 .707-.119.928-.254.272-.167.459-.436.553-.717.1-.293.062-.536-.031-.742-.104-.222-.344-.427-.544-.543-.506-.296-1.242-.694-1.825-.978-.256-.125-.463-.226-.634-.328-.466-.279-.718-.633-.788-1.046-.032-.185-.012-.353.063-.528.066-.155.157-.268.26-.366.226-.214.435-.401.435-.791 0-.382-.169-.685-.336-.888-.21-.254-.512-.371-.784-.371-.146 0-.277.034-.388.074-.223.08-.388.233-.51.41-.32.464-.51 1.023-.567 1.69-.043.509.073 1.026.36 1.568.326.616.895 1.171 1.479 1.542.371.236.783.396 1.201.467.353.06.705.045 1.033-.086.247-.099.45-.257.61-.447.233-.275.334-.605.285-.944-.045-.301-.185-.516-.357-.667-.288-.252-.548-.404-.765-.523-.167-.091-.299-.164-.388-.219-.127-.078-.237-.146-.334-.236-.154-.142-.233-.304-.233-.521 0-.326.176-.518.291-.632.144-.144.276-.208.427-.251.102-.029.194-.037.282-.025.184.025.337.12.475.249.269.251.426.578.497.963.049.263.015.521-.094.76-.109.239-.277.444-.483.592-.192.137-.411.221-.649.265-.217.04-.442.027-.661-.03-.19-.05-.385-.137-.6-.257-.221-.124-.421-.275-.583-.436-.422-.42-.698-.895-.776-1.396-.081-.515.006-1.005.265-1.462.144-.252.339-.468.568-.631.225-.16.48-.27.756-.321.249-.045.506-.036.762.024.28.066.545.202.788.404.225.187.416.438.544.722.119.265.178.553.165.842-.012.271-.078.529-.199.772-.121.242-.299.456-.51.628-.185.15-.399.25-.627.296-.189.038-.382.026-.572-.026-.166-.046-.335-.133-.517-.261-.201-.142-.379-.317-.526-.513zm0 0"/>
            </svg>
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            title="Share on LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Blog Content */}
      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gray-50 py-12 border-b">
          <div className="max-w-3xl mx-auto px-6">
            {/* Category/Tag */}
            <div className="mb-4">
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
                {blog.status === 'published' ? 'Article' : 'Draft'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {blog.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {blog.author?.charAt(0) || 'A'}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{blog.author || 'Admin'}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatDate(blog.publishedDate)}</span>
                    <span>•</span>
                    <span>{blog.readingTime || 5} min read</span>
                    <span>•</span>
                    <span>{blog.views || 0} views</span>
                  </div>
                </div>
              </div>

              {/* Mobile Share Buttons */}
              <div className="flex gap-2 lg:hidden">
                <button
                  onClick={shareOnWhatsApp}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium"
                >
                  WhatsApp
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium"
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {blog.image && (
          <div className="max-w-4xl mx-auto px-6 -mt-8 mb-12">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={`${API_URL}${blog.image}`} 
                alt={blog.title}
                className="w-full h-auto object-cover"
                loading="eager"
              />
              {blog.imageCaption && (
                <p className="text-sm text-gray-500 text-center py-2 bg-gray-50">
                  {blog.imageCaption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div 
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={renderContent(blog.content)}
            style={{
              fontFamily: "'Inter', 'Helvetica', sans-serif",
              lineHeight: '1.8',
              fontSize: '18px',
              color: '#222'
            }}
          />

          {/* Divider */}
          <div className="my-12">
            <div className="border-t border-gray-200"></div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center my-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Join Jadhavar Paramedical College and take the first step towards a rewarding healthcare career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Enquire Now
              </Link>
              <Link
                to="/admissions"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition shadow-md border border-blue-200"
              >
                Book a Visit
              </Link>
            </div>
          </div>

          {/* Related Posts Section - You can implement this later */}
          <div className="text-center pt-8">
            <Link 
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to all articles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      {/* Custom CSS for Blog Content Styling */}
      <style jsx>{`
        .blog-content {
          font-family: 'Inter', 'Helvetica', sans-serif;
        }
        
        .blog-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-family: 'Georgia', 'Playfair Display', serif;
        }
        
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-family: 'Georgia', 'Playfair Display', serif;
        }
        
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        
        .blog-content p:first-of-type::first-letter {
          font-size: 4rem;
          font-weight: 700;
          float: left;
          line-height: 0.8;
          margin-right: 0.5rem;
          color: #2563eb;
          font-family: 'Georgia', serif;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #2563eb;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #4b5563;
          font-size: 1.125rem;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 1rem 0 1.5rem 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-content img {
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          max-width: 100%;
          height: auto;
        }
        
        .blog-content strong {
          color: #1f2937;
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .blog-content {
            font-size: 16px;
          }
          
          .blog-content h1 {
            font-size: 1.875rem;
          }
          
          .blog-content h2 {
            font-size: 1.5rem;
          }
          
          .blog-content p:first-of-type::first-letter {
            font-size: 3rem;
          }
        }
      `}</style>
    </>
  );
};

export default BlogDetail;