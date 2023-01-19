const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200', auth: {username: 'elastic',password: 'LrAleWSQsukH=OuIxXel'}});

const SrcmetaphorSearch = async (phrase) => {
  var size = 50;
  
  const searchResult = await client
    .search({
      index: "sinhala-songs",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        size: size,
        query: {
          nested: {
            path: "Metaphors",
            query: {
              match: { "Metaphors.Source": phrase }
            },
            inner_hits: { 
            }
          }
        },
      },
    })


    console.log(searchResult.hits.hits.length)

  return {
    success: 1,
    data:searchResult,
  };
};

const TgtmetaphorSearch = async (phrase) => {
  const hits = [];
  var size = 50;

  const searchResult = await client
    .search({
      index: "sinhala-songs",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        size: size,
        query: {
          nested: {
            path: "Metaphors",
            query: {
              match: { "Metaphors.Target": phrase }
            },
            inner_hits: { 
            }
          }
        },
      },
    })

  return {
    success: 1,
    data:searchResult,
  };
};

const AutoComplete = async (phrase) => {
  const hits = [];
  // only string values are searchable
  const searchResult = await client
    .search({
      index: "sinhala-songs",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        query: {
          nested: {
            path: "Metaphors",
            query: {
              "multi_match": {
                "query": phrase,
                "type": "match_bool_prefix",
                "fields": ["Metaphors.Source", "Metaphores.Target"]
            }
            },
            inner_hits: { 
            }
          }
        },
      },
    })

    if (searchResult.hits.total.value<1){
      out={
        success: 1,
        data:[],
      };
    }
    else{
      out_list=[];
      obj_list=searchResult.hits.hits;

      for (let i = 0; i < obj_list.length; i++) {
        obj=obj_list[i];
        met_obj=obj.inner_hits.Metaphors.hits.hits[0];
        out_list.push(met_obj._source.Source);
      }
      uniqe_list=[... new Set(out_list)]
      out={
        success: 1,
        data:uniqe_list,
      };
    }
  return out;
};


const OtherFieldSearch = async (phrase, field) => {
  var size = 10;
  query_obj = {};
  query_obj[field] = phrase;
  const searchResult = await client.search({
    index: "sinhala-songs",
    _source_includes:
      "Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics,Metaphors",
    body: {
      size: size,
      query: {
        match: query_obj,
      },
    },
  });

}

const searchByMetaphorsMeaningAndMetaphor = async (phrase) => {
  var size = 50;

  const result = await client
    .search({
      index: "sinhalasongsdata",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        size: size,
        query: {
          nested: {
            path: "Metaphors",
            query: {
              multi_match: { 
                "Metaphors.Metaphor": phrase,
                "Metaphors.Meaning": phrase 
              }
            },
            inner_hits: { 
            }
          }
        },
      },
    })
  }


module.exports = {
  SrcmetaphorSearch,
  TgtmetaphorSearch,
  OtherFieldSearch,
  SrcAutoComplete,
  TgtAutoComplete,
  searchByMetaphorsMeaningAndMetaphor
};