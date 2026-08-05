const repoList = document.getElementById('repo-list');
const errorMessage = document.getElementById('error-message');

function createRepoItem(repo) {
  const item = document.createElement('li');
  item.className = 'repo-item';

  const link = document.createElement('a');
  link.href = repo.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = repo.repo_name;
  link.className = 'repo-link';

  const description = document.createElement('p');
  description.textContent = repo.description;
  description.className = 'repo-description';

  const meta = document.createElement('p');
  meta.textContent = `Starred at ${new Date(repo.starred_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`;
  meta.className = 'repo-meta';

  item.appendChild(link);
  item.appendChild(description);
  item.appendChild(meta);

  return item;
}

async function loadStarredRepos() {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error('Failed to load starred repositories.');
    }
    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      repoList.innerHTML = '<li>No starred repositories found.</li>';
      return;
    }

    repoList.innerHTML = '';
    repos.forEach(repo => {
      repoList.appendChild(createRepoItem(repo));
    });
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

loadStarredRepos();
