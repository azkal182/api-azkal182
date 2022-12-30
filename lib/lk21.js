// lk21.js


import axios from 'axios'
import cheerio from 'cheerio'
import NodeCache from 'node-cache'
const nodeCache = new NodeCache()

const url = "https://lk21official.info/"
export async function lk21Search(query, tmdb=null) {
 const cacheSearch = nodeCache.has(query);
 const cacheSearchTmdb = nodeCache.has(query+(tmdb ? 'tmdb' :''));
 console.log(query+(tmdb ? 'tmdb' :''))

 if (tmdb && !query) {
    return ({message: 'error params query missing', })
   }

   if (tmdb){
   if (cacheSearchTmdb) {
    console.log('ada tmdb bro')
   return nodeCache.get(query+'tmdb')
  }
   } 
  if (!tmdb) {
   if (cacheSearch) {
    return nodeCache.get(query)
   }
  }
  
  
  const config = {
   params: {
    s: query,
   },
   headers: {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept-Encoding": "application/json",
   },
  };
  function getId(href) {
   var match = href.match(
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
   );
   return match[5].split("/").join("");
  }
  let result = await axios.get(url, config).then((res) => {
   const html = res.data;
   const $ = cheerio.load(html);

   let list = $(".search-item");
   let index = [];

   list.each(function (v, i) {
    let title = $(this).find("figure > a").attr("title");
    let poster = "https:" + $(this).find("figure > a > img").attr("src");
    let id = getId($(this).find("figure > a").attr("href"));
    let link = $(this).find(".search-content > h2 > a").attr("href");
    let tag = $(this).find("p.cat-links > a:nth-child(1)").attr("href");
    if (!tag.match(/series/gm)) {
     index.push({
      title,
      poster,
      id,
      link,
     });
    }
   });
   return {
    message: "success",
    length: index.length,
    results: index,
   };
  });

  if (tmdb) {
   // get data themlviebd
   for (let i = 0; i < result.length; i++) {
    // console.log(result.results.data[i].id.replaceAll('-', ' ').replace(/[0-9]*$/gm, '').trim())
    const forId = result.results[i].id
     .replaceAll("-", " ")
     .replace(/[0-9]*$/gm, "")
     .trim();
    // console.log(forId)
    let oke = await axios.get(
     "https://api.themoviedb.org:443/3/search/movie?api_key=243bd781b4261e4fade9058a64105c28&query=" +
      forId
    );
    //  console.log(oke.data.results)
    result.results[i]["TMDB"] = oke.data.results[0];
   }
   nodeCache.set(query+(tmdb ? 'tmdb' :''), result, 1800);
   return result;
  } else {
   nodeCache.set(query, result, 1800);
   return result;
  }
  
  
  
  
  
  
  
  return data
}

export async function lk21Latest(tmdb=false){
 const config = {
   headers: {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept-Encoding": "application/json",
   },
  };

  function getId(href) {
   var match = href.match(
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
   );
   return match[5].split("/").join("");
  }

  let result = await axios.get(url + "latest", config).then((res) => {
   let html = res.data;
   let $ = cheerio.load(html);

   // console.log($('#pagination > span').html().match(/(\d+)(?!.*\d)/m)[0gi ])

   const item = $("#grid-wrapper > div");
   let index = [];
   item.each(function (i, v) {
    let title = $(this).find("figure > a > img").attr("alt");
    let poster = "https:" + $(this).find("figure > a > img").attr("src");
    let id = $(this).find("figure > a").attr("href");
    let rating = $(this).find(".rating").text();
    let quality = $(this).find(".quality").text();
    index.push({
     title,
     poster,
     id: getId(id),
     rating,
     quality,
    });
   });

   return {
    message: "success",
    length: index.length,
    results: index,
   };
  });

  if (tmdb) {
   for (let i = 0; i < result.length; i++) {
    //console.log(result.results.data[i].id.replaceAll('-', ' ').replace(/[0-9]*$/gm, '').trim())
    const forId = result.results[i].id
     .replaceAll("-", " ")
     .replace(/[0-9]*$/gm, "")
     .trim();

    let oke = await axios.get(
     "https://api.themoviedb.org:443/3/search/movie?api_key=243bd781b4261e4fade9058a64105c28&query=" +
      forId
    );
    //console.log(oke.data.results[0])
    result.results[i]["TMDB"] = oke.data.results[0];
   }
  }

  return result;
}

export async function lk21Popular(tmdb=null){
 const cachePopular = nodeCache.has('popular');
 const cachePopularTmdb = nodeCache.has('popular+tmdb');
 
 if (!tmdb) {
 if (cachePopular) {
  console.log('tanpa')
  return nodeCache.get('popular')
 }
 } else {
 if (cachePopularTmdb) {
  console.log('dengan')
return nodeCache.get('popular+tmdb')
 }
 }
 const config = {
   headers: {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept-Encoding": "application/json",
   },
  };

  function getId(href) {
   var match = href.match(
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
   );
   return match[5].split("/").join("");
  }

  let result = await axios.get(url + "populer", config).then((res) => {
   let html = res.data;
   let $ = cheerio.load(html);

   // console.log($('#pagination > span').html().match(/(\d+)(?!.*\d)/m)[0gi ])

   const item = $("#grid-wrapper > div");
   let index = [];
   item.each(function (i, v) {
    let title = $(this).find("figure > a > img").attr("alt");
    let poster = "https:" + $(this).find("figure > a > img").attr("src");
    let id = $(this).find("figure > a").attr("href");
    let rating = $(this).find(".rating").text();
    let quality = $(this).find(".quality").text();
    index.push({
     title,
     poster,
     id: getId(id),
     rating,
     quality,
    });
   });

   return {
    message: "success",
    length: index.length,
    results: index,
   };
  });

  if (tmdb) {
   for (let i = 0; i < result.length; i++) {
    // console.log(result.results.data[i].id.replaceAll('-', ' ').replace(/[0-9]*$/gm, '').trim())
    const forId = result.results[i].id
     .replaceAll("-", " ")
     .replace(/[0-9]*$/gm, "")
     .trim();

    let oke = await axios.get(
     "https://api.themoviedb.org:443/3/search/movie?api_key=243bd781b4261e4fade9058a64105c28&query=" +
      forId
    );
    //console.log(oke.data.results[0])
    result.results[i]["TMDB"] = oke.data.results[0];
    
   }
   nodeCache.set('popular+tmdb', result, 3600)
  return result;
  }
  nodeCache.set('popular', result, 3600)
  return result;

}
