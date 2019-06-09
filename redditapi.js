export default {
  search: function(searchTerm, sortBy, searchLimit){
    return fetch(`https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
      .then(res => res.json())
      .then(data => {
        if (data.data.children) {
          console.log(data.data.children)
          return data.data.children.map(data => data.data)
        }else{
          console.log(data.data.children)
          alert('没有找到相关结果')
        }        
      })
      .catch(err => console.log(err))
  }
}

// return fetch() 返回一个promise，才能在index.js里继续使用then方法，否则会报错