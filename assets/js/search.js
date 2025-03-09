document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  function getMatchCount(title, query) {
    const regex = new RegExp(query, 'gi');
    return (title.match(regex) || []).length;
  }

  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }

    const results = window.posts
      .map(post => ({
        ...post,
        score: getMatchCount(post.title.toLowerCase(), query)
      }))
      .filter(post => post.score > 0)
      .sort((a, b) => b.score - a.score);

    displayResults(results);
  }

  function displayResults(results) {
    searchResults.innerHTML = results.length > 0 
      ? results.map(post => `
          <div class="search-result-item">
            <a href="${post.url}">${post.title}</a>
            <span class="post-date">${post.date}</span>
          </div>
        `).join('')
      : '<div class="no-results">无匹配结果</div>';
  }

  searchInput.addEventListener('input', performSearch);
});
