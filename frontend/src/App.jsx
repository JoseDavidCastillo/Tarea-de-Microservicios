import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header';
import PostComposer from './components/PostComposer';
import ProfileCard from './components/ProfileCard';
import StreamList from './components/StreamList';
import { createPost, fetchMe, fetchStream } from './services/api';

export default function App() {
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently, user } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [draft, setDraft] = useState('');
  const [streamLoading, setStreamLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [streamError, setStreamError] = useState('');
  const [composerError, setComposerError] = useState('');
  const [notice, setNotice] = useState('');

  async function loadStream() {
    setStreamLoading(true);
    setStreamError('');

    try {
      const payload = await fetchStream();
      setPosts(Array.isArray(payload) ? payload : payload.items || []);
    } catch (error) {
      setStreamError(error.message || 'Unable to load the public stream');
    } finally {
      setStreamLoading(false);
    }
  }

  async function loadProfile() {
    if (!isAuthenticated) {
      setProfile(null);
      return;
    }

    setProfileLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const payload = await fetchMe(token);
      setProfile(payload);
    } catch (error) {
      setComposerError(error.message || 'Unable to load /api/me');
    } finally {
      setProfileLoading(false);
    }
  }

  useEffect(() => {
    void loadStream();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void loadProfile();
    } else {
      setProfile(null);
    }
  }, [isAuthenticated]);

  async function handlePublish(event) {
    event.preventDefault();
    setComposerError('');
    setNotice('');

    if (!isAuthenticated) {
      await loginWithRedirect();
      return;
    }

    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    setPosting(true);

    try {
      const token = await getAccessTokenSilently();
      await createPost(token, trimmed);
      setDraft('');
      setNotice('Post published successfully.');
      await loadStream();
      await loadProfile();
    } catch (error) {
      setComposerError(error.message || 'Unable to publish post');
    } finally {
      setPosting(false);
    }
  }

  async function handleLogout() {
    logout({ logoutParams: { returnTo: window.location.origin } });
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <main className="page-frame">
        <Header user={user} isAuthenticated={isAuthenticated} onLogin={loginWithRedirect} onLogout={handleLogout} />

        <section className="hero card">
          <div className="hero-copy">
            <p className="eyebrow">Auth0 secured feed</p>
            <h2>Public reading, protected writing, and a clean migration path to microservices.</h2>
            <p>
              The stream is public. The composer and profile endpoint are protected with JWT access tokens issued by Auth0.
              The same UI can point to the monolith now or to separate services later by changing environment variables.
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-tile">
              <strong>{posts.length}</strong>
              <span>posts loaded</span>
            </div>
            <div className="stat-tile">
              <strong>{isAuthenticated ? 'Yes' : 'No'}</strong>
              <span>authenticated</span>
            </div>
            <div className="stat-tile">
              <strong>140</strong>
              <span>char limit</span>
            </div>
          </div>
        </section>

        {notice ? <div className="banner success">{notice}</div> : null}
        {composerError ? <div className="banner error">{composerError}</div> : null}

        <section className="content-grid">
          <div className="primary-column">
            <PostComposer
              isAuthenticated={isAuthenticated}
              value={draft}
              remaining={140 - draft.length}
              busy={posting}
              message={notice}
              error={composerError}
              onChange={setDraft}
              onSubmit={handlePublish}
              onLogin={loginWithRedirect}
            />

            <StreamList posts={posts} loading={streamLoading} error={streamError} onReload={loadStream} />
          </div>

          <aside className="sidebar">
            <ProfileCard profile={profile} isAuthenticated={isAuthenticated} loading={profileLoading} />

            <section className="card notes-card">
              <div className="card-header">
                <div>
                  <p className="eyebrow">Implementation notes</p>
                  <h2>Frontend contract</h2>
                </div>
              </div>

              <ul className="notes-list">
                <li>GET /api/stream is public.</li>
                <li>POST /api/posts requires a valid bearer token.</li>
                <li>GET /api/me requires a valid bearer token.</li>
                <li>Set VITE_USER_API_URL, VITE_POSTS_API_URL, and VITE_STREAM_API_URL when services split.</li>
              </ul>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}