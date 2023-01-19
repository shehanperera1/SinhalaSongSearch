import React, { Component } from "react";
import "../styles/metaphors.css";
 
 const SongDetails=(props)=> {
   const data = React.useMemo(
     () => props.data 
   )

  const Title_En=data._source.Title_En;
  const Title_Si=data._source.Title_Si;
  const Artist_En=data._source.Artist_En;
  const Artist_Si=data._source.Artist_Si;
  const Year=data._source.Artist_Si;
  const Lyricist_En=data._source.Artist_Si;
  const Lyricist_Si=data._source.Artist_Si;
  const Lyrics=data._source.Lyrics.split("\n");
  const Metaphor=data.inner_hits.Metaphors.hits.hits[0]._source.Metaphor;
  const Meaning=data.inner_hits.Metaphors.hits.hits[0]._source.Meaning;
  const Source=data.inner_hits.Metaphors.hits.hits[0]._source.Source;
  const Target=data.inner_hits.Metaphors.hits.hits[0]._source.Target;
  console.log((Metaphor.length/2) | 0);
  
   return (
    <div className="flex w-50 mr-2 rounded py-1 px-3 text-blue-900 border-2 border-blue-900 ">
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="song_topic">
          <h3>{Metaphor}</h3>
          </div>
    <div className="song_details">
    <div className="lyricist">
      <b>Song   :</b> {Lyrics[0]}
      </div>
      <div className="singer">
      {(() => {
            let singer_str=Artist_Si[0];
            let divs = []; 
                        for(let i = 1; i < Artist_Si.length; i++) {
                          singer_str=singer_str.concat(", ", Artist_Si[i]);
                          
                        }
                    
                divs.push(<div key={5}
                              ><b>Singer    :</b> {Artist_Si}</div>);
                        return divs;
          })()}
      </div>

      <div className="lyricist">
      <b>Lyricist   :</b> {Lyricist_Si}
      </div>
      
     <div className="year">
     <b>Year    :</b> {Year}
     </div>
      
     <div className="composer">
     <b>Title :</b> {Title_Si}
     </div>

     </div>
      
     <div className="lyrics">
     <div className="lyrics_heading">
          <b>Lyrics    :</b> 
          <br/>
          <br/>
      </div>
      {(() => {
            let divs = []; 
            for(let i = 0; i < Lyricist_Si.length; i++) {
              if (Lyricist_Si[i]==""){
                divs.push(<div key={i}><br/></div>);
              }
              else{
                let last =(Metaphor.length/2) | 0;
                if (Lyrics[i].includes(Metaphor)){
                  divs.push(<div key={i}>
                    <b>{Lyrics[i]}</b>
                    </div>);
                }
                else{
                  divs.push(<div key={i}>{Lyrics[i]}</div>);
                }
              }
              
            }
        
            return divs;
          })()}
     </div>


     <div className="meta_details">
     <div className="meta">
     <b>Metaphor    :</b> {Metaphor}
     </div>

     <div className="meaning">
     <b>Meaning     :</b> {Meaning}
     </div>

     <div className="source_domain">
     <b>Source Domain:</b> {Source}
     </div>

     <div className="target_domain">
     <b>Target Domain:</b> {Target}
     </div>   

     </div>
       </div>
   )
}
 
export default SongDetails;