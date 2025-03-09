document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const postList = document.querySelector('.post-list');

  // 增强的匹配函数
  function getMatchScore(title, query) {
    const cleanQuery = query.replace(/[^\w\u4e00-\u9fa5]/g, ''); // 去除非中文字符和数字
    const keywords = cleanQuery.toLowerCase().split('');
    const cleanTitle = title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]/g, '');
    
    return keywords.reduce((score, keyword) => {
      return score + (cleanTitle.includes(keyword) ? 1 : 0);
    }, 0);
  }

  function performSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
      searchResults.style.display = 'none';
      postList.style.display = 'block';
      return;
    }

    const results = window.posts
      .map(post => ({
        ...post,
        score: getMatchScore(post.title, query)
      }))
      .filter(post => post.score > 0)
      .sort((a, b) => b.score - a.score);

    searchResults.style.display = 'block';
    postList.style.display = 'none';
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
